import { useState } from "react";
import { gallery, allImages } from "../data/illustrations";
import Card from "./Card";
import Finale from "./Finale";
import Lightbox from "./Lightbox";
import "./Gallery.css";

/**
 * Galería en 4 tramos:
 *   before (masonry) → feature (11/12 + video) → line (fila 16/18/17) → after (masonry)
 * Cada Card recibe su índice GLOBAL dentro de allImages, así el lightbox
 * navega por todas las imágenes sin importar el tramo.
 */
export default function Gallery() {
  const [active, setActive] = useState(null);
  const { before, feature, line, after, finale } = gallery;

  // offsets para el índice global de cada tramo
  const featureOffset = before.length;
  const lineOffset = featureOffset + feature.images.length;
  const afterOffset = lineOffset + line.length;
  const finaleOffset = afterOffset + after.length;

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <header className="gallery__head">
          <h2 className="gallery__title">Illustration Archive</h2>
        </header>

        {/* Tramo 1: imágenes 1–10 */}
        <div className="gallery__grid">
          {before.map((art, i) => (
            <Card key={art.src} art={art} index={i} onOpen={setActive} />
          ))}
        </div>

        {/* Bloque especial: 11 y 12 apiladas (izq) + video (der) */}
        <div className="feature">
          <div className="feature__imgs">
            {feature.images.map((art, j) => (
              <Card
                key={art.src}
                art={art}
                index={featureOffset + j}
                onOpen={setActive}
              />
            ))}
          </div>
          <div className="feature__video">
            <video
              src={feature.video}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </div>

        {/* Línea de imágenes: 16, 18, 17 (fila, justo bajo el bloque negro) */}
        <div className="line">
          {line.map((art, l) => (
            <Card
              key={art.src}
              art={art}
              index={lineOffset + l}
              onOpen={setActive}
            />
          ))}
        </div>

        {/* Tramo 2: 13, 14, 15, 19, 21 */}
        <div className="gallery__grid">
          {after.map((art, k) => (
            <Card
              key={art.src}
              art={art}
              index={afterOffset + k}
              onOpen={setActive}
            />
          ))}
        </div>

        {/* Final: obra 22 a todo el ancho con parallax */}
        <Finale art={finale} index={finaleOffset} onOpen={setActive} />
      </div>

      <Lightbox
        items={allImages}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  );
}
