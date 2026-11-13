// Erzeugt aus flyer/flyer.html und flyer/flyer-b.html je:
// - flyer/out/<name>-a5-druck.pdf  Vorder- und Rückseite, A5 mit 3 mm Beschnitt (für die Druckerei)
// - flyer/out/<name>-vorne.png, <name>-hinten.png  ohne Beschnitt (WhatsApp, LinkedIn, E-Mail)
//
// Aufruf: npm run flyer   (braucht Google Chrome)

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import QRCode from "qrcode";

const dir = fileURLToPath(new URL(".", import.meta.url));
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].find(existsSync);
if (!CHROME) throw new Error("Google Chrome nicht gefunden");

// QR-Code auf die Webseite; Fehlerkorrektur M, damit er auch klein gedruckt sicher scannt
writeFileSync(`${dir}qr.svg`, await QRCode.toString("https://genz-dev.com", { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0e1218", light: "#ffffff" } }));

mkdirSync(`${dir}out`, { recursive: true });
const chrome = (...args) => execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=8000", ...args], { stdio: "ignore" });

// Variante A: flyer.html (Online-Buchung), Variante B: flyer-b.html (Gefunden werden)
for (const name of ["flyer", "flyer-b"]) {
  const page = pathToFileURL(`${dir}${name}.html`).href;
  chrome("--no-pdf-header-footer", `--print-to-pdf=${dir}out/${name}-a5-druck.pdf`, page);
  // 148 × 210 mm bei 96 dpi = 559 × 794 px, dreifach gerendert ≈ 1677 × 2382 px
  for (const [side, suffix] of [["front", "vorne"], ["back", "hinten"]]) {
    chrome("--window-size=559,794", "--force-device-scale-factor=3", `--screenshot=${dir}out/${name}-${suffix}.png`, `${page}?side=${side}`);
  }
}
console.log("flyer/out/ fertig: je Variante a5-druck.pdf, vorne.png, hinten.png");
