import { site } from "../data/illustrations";
import "./Preloader.css";

/**
 * Pantalla de carga inicial.
 * Muestra el progreso real (0–100) mientras se precargan las imágenes.
 * Cuando `done` es true recibe la clase `is-done` → se desvanece.
 * El desmontaje lo controla App (tras la transición).
 */
export default function Preloader({ progress, done }) {
  return (
    <div className={`preloader${done ? " is-done" : ""}`} aria-hidden={done}>
      <div className="preloader__inner">
        <span className="preloader__brand">{site.name}</span>

        <div
          className="preloader__count"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Cargando ilustraciones"
        >
          {String(progress).padStart(3, "0")}
          <span className="preloader__pct">%</span>
        </div>

        <div className="preloader__track">
          <div
            className="preloader__bar"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        <span className="preloader__label">Cargando obra</span>
      </div>
    </div>
  );
}
