import "./Card.css";

/**
 * Tarjeta de obra reutilizable (masonry y swipe).
 * `index` = posición global dentro de `allImages` → la usa el lightbox.
 */
export default function Card({ art, index, onOpen }) {
  return (
    <figure className="card" style={{ "--ratio": `${art.width} / ${art.height}` }}>
      <button
        type="button"
        className="card__btn"
        onClick={() => onOpen(index)}
        aria-label={`Ver ${art.title} en grande`}
      >
        <img
          className="card__img"
          src={art.src}
          alt={art.title}
          width={art.width}
          height={art.height}
          loading="lazy"
        />
        <figcaption className="card__caption">
          {art.year && <span className="card__year">{art.year}</span>}
        </figcaption>
      </button>
    </figure>
  );
}
