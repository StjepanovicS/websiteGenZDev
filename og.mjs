// Vorschaubild für LinkedIn, WhatsApp & Co. (1200 × 630 px).
// Der Build rendert daraus je Sprache eine PNG-Datei nach dist/assets/.

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// logoSvg: Inhalt von assets/logo-mark.svg (viewBox 255 268 742 474)
export const ogSvg = ({ logoSvg, lines, subtitle, url }) => {
  const logoInner = logoSvg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title>[\s\S]*?<\/title>/, "");
  const font = "Schibsted Grotesk, Segoe UI, Helvetica Neue, Arial, sans-serif";
  const title = lines
    .map((l, i) => `<text x="80" y="${330 + i * 76}" font-family="${font}" font-size="64" font-weight="700" letter-spacing="-1.5" fill="#f1f5f4">${esc(l)}</text>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glowA" cx="0.88" cy="0.25" r="0.55"><stop offset="0" stop-color="#05d1e7" stop-opacity="0.22"/><stop offset="1" stop-color="#05d1e7" stop-opacity="0"/></radialGradient>
    <radialGradient id="glowB" cx="0.95" cy="0.95" r="0.45"><stop offset="0" stop-color="#5df589" stop-opacity="0.16"/><stop offset="1" stop-color="#5df589" stop-opacity="0"/></radialGradient>
    <linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="#05d1e7"/><stop offset="1" stop-color="#5df589"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0e1218"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <svg x="80" y="78" width="188" height="120" viewBox="255 268 742 474">${logoInner}</svg>
  <text x="292" y="156" font-family="${font}" font-size="44" font-weight="700" letter-spacing="-0.5" fill="#f1f5f4">GenZ Dev</text>
  ${title}
  <text x="80" y="${330 + lines.length * 76 + 18}" font-family="${font}" font-size="28" fill="#bcc5cc">${esc(subtitle)}</text>
  <rect x="80" y="548" width="120" height="6" rx="3" fill="url(#bar)"/>
  <text x="1120" y="558" text-anchor="end" font-family="${font}" font-size="26" font-weight="600" fill="#5df589">${esc(url)}</text>
</svg>`;
};
