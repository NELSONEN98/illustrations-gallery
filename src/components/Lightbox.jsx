import { useEffect, useCallback } from "react";
import "./Lightbox.css";

/**
 * Lightbox accesible.
 * - index === null  => cerrado (no renderiza nada)
 * - flechas ← →     => navega
 * - Esc             => cierra
 * - bloquea el scroll del body mientras está abierto
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const isOpen = index !== null;

  const go = useCallback(
    (dir) => {
      if (!isOpen) return;
      const next = (index + dir + items.length) % items.length;
      onNavigate(next);
    },
    [isOpen, index, items.length, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, go, onClose]);

  if (!isOpen) return null;
  const art = items[index];

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={art.title}
      onClick={onClose}
    >
      <button className="lb__close" type="button" aria-label="Cerrar" onClick={onClose}>
        ✕
      </button>

      <button
        className="lb__nav lb__nav--prev"
        type="button"
        aria-label="Anterior"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
      >
        ‹
      </button>

      {/* stopPropagation: clic en la imagen no cierra */}
      <figure className="lb__stage" onClick={(e) => e.stopPropagation()}>
        <img className="lb__img" src={art.src} alt={art.title} />
        <figcaption className="lb__caption">
          <span className="lb__meta">
            {art.year && <span>{art.year}</span>}
            <span className="lb__index">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
          </span>
        </figcaption>
      </figure>

      <button
        className="lb__nav lb__nav--next"
        type="button"
        aria-label="Siguiente"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
      >
        ›
      </button>
    </div>
  );
}
