// Baut die Webseite für den Upload nach dist/.
// - CSS und JS minifiziert (esbuild)
// - CSS der Startseite inline: kein render-blockierender Request
// - Dateinamen mit Hash, damit der Server sie ein Jahr cachen darf
// - Schrift wird vorgeladen, sobald fonts/SchibstedGrotesk-Variable.woff2 existiert
// - Englische Startseite unter dist/en/ aus i18n/en.mjs, mit Prüfung auf
//   veraltete Übersetzungen und übrig gebliebene deutsche Texte
//
// Aufruf: npm run build

import { transform } from "esbuild";
import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile, access } from "node:fs/promises";
import { pairs as enPairs, same as enSame } from "./i18n/en.mjs";

const OUT = "dist";
const FONT = "fonts/SchibstedGrotesk-Variable.woff2";

const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 8);
const exists = (p) => access(p).then(() => true, () => false);

// Kommentare und Einrückung raus; <pre> gibt es nicht, Textarea-Inhalte sind leer
const minifyHtml = (html) =>
  html
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, "")
    .replace(/^\s+/gm, "")
    .replace(/\n{2,}/g, "\n");

// Sichtbare Texte und übersetzbare Attribute einer Seite
const texts = (html) => {
  const s = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, "");
  const out = new Set();
  for (const [, v] of s.matchAll(/>([^<]+)</g)) {
    const text = v.trim();
    if (/\p{L}{2,}/u.test(text)) out.add(text);
  }
  for (const [, v] of s.matchAll(/\s(?:alt|aria-label|placeholder|content|title)="([^"]*)"/g)) {
    if (/\p{L}{3,}/u.test(v)) out.add(v.trim());
  }
  return out;
};

// Übersetzt die deutsche Seite und legt sie eine Ebene tiefer (en/) ab
const translate = (html, pairs, same, lang) => {
  const missing = pairs.filter(([de]) => !html.includes(de)).map(([de]) => de);
  if (missing.length) {
    throw new Error(`Übersetzung ${lang}: diese deutschen Texte gibt es in index.html nicht mehr:\n  - ${missing.join("\n  - ")}`);
  }
  let out = html;
  for (const [de, tr] of [...pairs].sort((a, b) => b[0].length - a[0].length)) out = out.split(de).join(tr);

  const deTexts = texts(html);
  const leftover = [...texts(out)].filter((v) => deTexts.has(v) && !same.includes(v));
  if (leftover.length) {
    throw new Error(`Übersetzung ${lang}: noch nicht übersetzt:\n  - ${leftover.join("\n  - ")}`);
  }

  // relative Pfade eine Ebene hoch, externe Links, Anker und ./ bleiben
  return out
    .replace(/\s(src|href)="(?!https?:|mailto:|#|\.\.?\/|data:)([^"]+)"/g, ' $1="../$2"')
    .replace(/url\("fonts\//g, 'url("../fonts/');
};

await rm(OUT, { recursive: true, force: true });
await mkdir(`${OUT}/en`, { recursive: true });

const hasFont = await exists(FONT);

// Ohne Schriftdatei die @font-face-Regel weglassen, sonst lädt der Browser ins Leere (404)
let cssSource = await readFile("styles.css", "utf8");
if (!hasFont) cssSource = cssSource.replace(/@font-face\s*\{[^}]*\}/, "");
const css = (await transform(cssSource, { loader: "css", minify: true, target: ["chrome100", "safari15", "firefox100"] })).code;
const js = (await transform(await readFile("main.js", "utf8"), { loader: "js", minify: true, target: ["es2020"] })).code;

const cssFile = `styles.${hash(css)}.css`;
const jsFile = `main.${hash(js)}.js`;
await writeFile(`${OUT}/${cssFile}`, css);
await writeFile(`${OUT}/${jsFile}`, js);

const preload = hasFont ? `<link rel="preload" href="${FONT}" as="font" type="font/woff2" crossorigin>` : "";

const index = (await readFile("index.html", "utf8"))
  .replace('<link rel="stylesheet" href="styles.css">', `${preload}<style>${css}</style>`)
  .replace('src="main.js"', `src="${jsFile}"`);
await writeFile(`${OUT}/index.html`, minifyHtml(index));
await writeFile(`${OUT}/en/index.html`, minifyHtml(translate(index, enPairs, enSame, "en")));

for (const page of ["impressum.html", "datenschutz.html"]) {
  const html = (await readFile(page, "utf8")).replace('href="styles.css"', `href="${cssFile}"`);
  await writeFile(`${OUT}/${page}`, minifyHtml(preload ? html.replace("<link rel=\"stylesheet\"", `${preload}<link rel="stylesheet"`) : html));
}

await cp("assets", `${OUT}/assets`, { recursive: true });
await cp("favicon.svg", `${OUT}/favicon.svg`);
await cp(".htaccess", `${OUT}/.htaccess`);
if (hasFont) await cp("fonts", `${OUT}/fonts`, { recursive: true });

console.log(`dist/ fertig · DE + EN · ${cssFile} · ${jsFile}${hasFont ? " · Schrift vorgeladen" : " · ohne Schriftdatei (Systemschrift)"}`);
