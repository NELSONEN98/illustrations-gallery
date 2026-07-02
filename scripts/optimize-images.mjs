/**
 * Optimiza las ilustraciones de la galería para web.
 * - Redimensiona a máx 2000px (lado más largo), preservando proporción.
 * - Convierte a WebP calidad 80.
 * - Mueve el original a /originals (backup, fuera del build).
 *
 * Uso: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir, rename, stat, access } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "public/illustrations";
const ORIG_DIR = "originals";
const MAX = 2000;
const QUALITY = 80;

// Solo las imágenes referenciadas en src/data/illustrations.js
const files = [
  "1.jpg", "2.png", "3.jpg", "4.png", "5.jpg", "6.jpg", "7.jpg", "9.png", "10.png",
  "11.png", "12.png",
  "16.jpg", "18.jpg", "17.jpg",
  "13.png", "14.jpg", "15.jpg", "19.jpg", "20.png", "21.jpg",
  "22.png",
];

const exists = (p) => access(p).then(() => true).catch(() => false);

await mkdir(ORIG_DIR, { recursive: true });

let before = 0;
let after = 0;

for (const f of files) {
  const src = path.join(SRC_DIR, f);
  if (!(await exists(src))) {
    console.log(`⚠  ${f} no existe (¿ya optimizada?), salteo`);
    continue;
  }
  const base = f.replace(/\.(png|jpe?g)$/i, "");
  const out = path.join(SRC_DIR, `${base}.webp`);

  const s0 = (await stat(src)).size;
  await sharp(src)
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  const s1 = (await stat(out)).size;

  before += s0;
  after += s1;
  console.log(
    `${f.padEnd(8)} ${(s0 / 1e6).toFixed(1).padStart(5)}MB → ${base}.webp ${(s1 / 1e3).toFixed(0).padStart(4)}KB`
  );

  // backup del original fuera del build
  await rename(src, path.join(ORIG_DIR, f));
}

console.log("─".repeat(40));
console.log(
  `TOTAL  ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(2)}MB  (${(100 - (after / before) * 100).toFixed(1)}% menos)`
);
