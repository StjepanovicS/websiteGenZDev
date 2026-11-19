// Erzeugt die kleinen Web-Versionen des StayInContact-Werbevideos (DE/EN).
// Nur nötig, wenn sich die Originalvideos ändern; das Ergebnis liegt in media/
// und wird von build.mjs nach dist/assets/ kopiert.
//
// Aufruf: npm run video
//
// - ohne Ton (läuft stumm und automatisch, das erlauben Browser nur ohne Ton)
// - 360 × 640 px, H.264, für schnelles Starten optimiert (faststart)
// - endet vor der Einblendung „Jetzt verfügbar“ mit Store-Badges,
//   solange die App noch nicht veröffentlicht ist

import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import ffmpeg from "@ffmpeg-installer/ffmpeg";
import sharp from "sharp";

// END: Schnitt vor „Jetzt verfügbar“, POSTER_AT: Sekunde mit gut sichtbarem App-Bildschirm
const VIDEOS = [
  { lang: "de", input: "C:/Users/sasas/Desktop/videoGenZ.mp4", END: "24.7", POSTER_AT: "8" },
  { lang: "en", input: "C:/Users/sasas/Desktop/App_Development/StayInContact-Werbevideo-English.mp4", END: "27.8", POSTER_AT: "9" },
];

mkdirSync("media", { recursive: true });

for (const { lang, input, END, POSTER_AT } of VIDEOS) {
  execFileSync(ffmpeg.path, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", input, "-t", END, "-an",
    "-vf", "scale=360:640:flags=lanczos,fps=30",
    "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-crf", "28", "-preset", "slow", "-movflags", "+faststart",
    `media/stayincontact-${lang}.mp4`,
  ]);
  // WebM (VP9) als Ausweich-Format für Browser ohne H.264
  execFileSync(ffmpeg.path, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", input, "-t", END, "-an",
    "-vf", "scale=360:640:flags=lanczos,fps=30",
    "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "40", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
    `media/stayincontact-${lang}.webm`,
  ]);
  // Vorschaubild, solange das Video lädt oder wenn es nicht abspielt
  const png = execFileSync(ffmpeg.path, [
    "-hide_banner", "-loglevel", "error",
    "-ss", POSTER_AT, "-i", input, "-frames:v", "1",
    "-vf", "scale=360:640:flags=lanczos", "-f", "image2pipe", "-vcodec", "png", "-",
  ]);
  await sharp(png).webp({ quality: 78 }).toFile(`media/stayincontact-${lang}-poster.webp`);
  console.log(`media/stayincontact-${lang}.mp4 fertig`);
}
