import "./Finale.css";

/**
 * Imagen de cierre a todo el ancho. Sin parallax: se muestra completa.
 */
export default function Finale({ art, index, onOpen }) {
  return (
    <button
      type="button"
      className="finale"
      onClick={() => onOpen(index)}
      aria-label={`Ver ${art.title} en grande`}
    >
      <img
        className="finale__img"
        src={art.src}
        alt={art.title}
        loading="lazy"
      />
    </button>
  );
}
