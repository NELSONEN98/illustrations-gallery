/**
 * Datos de la galería.
 * ------------------------------------------------------------------
 * 5 tramos, en este orden:
 *   before  -> 1–10             (masonry)
 *   feature -> 11 y 12 + video  (bloque negro)
 *   line    -> 16,18,17         (línea de imágenes, fila)
 *   after   -> 13,14,15,19,21   (masonry)
 *   finale  -> 22               (full-width, fondo negro)
 *
 * width/height reales: reservan el espacio (sin saltos de layout).
 */

const before = [
  { src: "/illustrations/1.webp", title: "Obra 1", year: "2024", width: 3000, height: 3000 },
  { src: "/illustrations/2.webp", title: "Obra 2", year: "2025", width: 2000, height: 2000 },
  { src: "/illustrations/3.webp", title: "Obra 3", year: "2024", width: 4000, height: 4000 },
  { src: "/illustrations/4.webp", title: "Obra 4", year: "2025", width: 2000, height: 2000 },
  { src: "/illustrations/5.webp", title: "Obra 5", year: "2024", width: 4000, height: 4000 },
  { src: "/illustrations/6.webp", title: "Obra 6", year: "2024", width: 3000, height: 3000 },
  { src: "/illustrations/7.webp", title: "Obra 7", year: "2024", width: 2000, height: 2500 },
  { src: "/illustrations/9.webp", title: "Obra 9", year: "2025", width: 4000, height: 4000 },
  { src: "/illustrations/10.webp", title: "Obra 10", year: "2025", width: 1500, height: 1500 },
];

const featureImages = [
  { src: "/illustrations/11.webp", title: "Obra 11", year: "2025", width: 1024, height: 1024 },
  { src: "/illustrations/12.webp", title: "Obra 12", year: "2026", width: 1024, height: 1024 },
];

const line = [
  { src: "/illustrations/16.webp", title: "Obra 16", year: "2024", width: 1122, height: 1200 },
  { src: "/illustrations/18.webp", title: "Obra 18", year: "2024", width: 3000, height: 2800 },
  { src: "/illustrations/17.webp", title: "Obra 17", year: "2024", width: 542, height: 800 },
];

const after = [
  { src: "/illustrations/13.webp", title: "Obra 13", year: "2026", width: 3000, height: 3000 },
  { src: "/illustrations/14.webp", title: "Obra 14", year: "2024", width: 4000, height: 4000 },
  { src: "/illustrations/15.webp", title: "Obra 15", year: "2024", width: 4000, height: 4000 },
  { src: "/illustrations/19.webp", title: "Obra 19", year: "2024", width: 4000, height: 4000 },
  { src: "/illustrations/20.webp", title: "Obra 20", year: "2026", width: 1024, height: 1024 },
  { src: "/illustrations/21.webp", title: "Obra 21", year: "2025", width: 4000, height: 5000 },
];

const finale = { src: "/illustrations/22.webp", title: "Obra 22", year: "2025", width: 3000, height: 3000 };

export const gallery = {
  before,
  feature: {
    images: featureImages,
    video: "/illustrations/catsplaying/catsplaying.mp4",
  },
  line,
  after,
  finale,
};

/** Lista plana de TODAS las imágenes (para el lightbox y el preloader). */
export const allImages = [...before, ...featureImages, ...line, ...after, finale];

/** Datos de marca / hero — editá esto con lo tuyo. */
export const site = {
  name: "palopa",
  heroTitle: "character design",
  tagline: "Ilustraciones en blanco y negro",
  intro:
    "Una colección de trabajo en tinta, línea y forma. Movés el mouse — la portada responde.",
  contact: "nelson.bedoya1107@gmail.com",
};
