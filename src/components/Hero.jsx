import { useEffect, useRef } from "react";
import { site } from "../data/illustrations";
import "./Hero.css";

/**
 * Hero interactivo.
 * El movimiento del mouse alimenta dos CSS vars (--mx, --my) en el rango
 * [-1, 1]. El CSS las usa para: desplazar la grilla de fondo, inclinar el
 * título y mover el contraluz. Usamos rAF para no disparar layout en cada
 * evento de mousemove (que se dispara decenas de veces por segundo).
 */
export default function Hero() {
  const ref = useRef(null);
  const frame = useRef(0);
  const scrollFrame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        // normalizado a [-1, 1] respecto del centro del hero
        const mx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const my = ((e.clientY - r.top) / r.height) * 2 - 1;
        el.style.setProperty("--mx", mx.toFixed(3));
        el.style.setProperty("--my", my.toFixed(3));
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame.current);
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame.current);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Progreso de scroll 0→1 en el primer viewport → alimenta --scroll.
  // El hero es fixed: mientras la galería no lo tapa, el título "reacciona".
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = requestAnimationFrame(() => {
        const p = Math.min(window.scrollY / window.innerHeight, 1);
        el.style.setProperty("--scroll", p.toFixed(3));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(scrollFrame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToGallery = () => {
    document
      .getElementById("gallery")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      ref={ref}
      className="hero"
      style={{ "--mx": 0, "--my": 0, "--scroll": 0 }}
    >
      <div className="hero__center container">
        <h1 className="hero__title">
          {/* cada palabra en su propia línea (2 párrafos); una <span> por letra
              para animar color + salto. `i` es índice GLOBAL: el arcoíris no se
              reinicia entre palabras. */}
          {(() => {
            let i = 0;
            return site.heroTitle.split(" ").map((word, w) => (
              <span key={w} className="hero__line">
                {word.split("").map((ch) => {
                  const idx = i++;
                  return (
                    <span
                      key={idx}
                      className="hero__char"
                      style={{ "--i": idx }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ));
          })()}
        </h1>
      </div>

      {/* Firma: hija DIRECTA de .hero (no de .hero__center) para poder
          anclarla al viewport en desktop y escapar del stacking context. */}
      <div className="hero__by">
        <span className="hero__by-label">by:</span>
        <img
          className="hero__by-sign"
          src="/illustrations/palopa-firma/firma.gif"
          alt="firma de palopa"
        />
      </div>

      <button
        type="button"
        className="hero__cat"
        onClick={scrollToGallery}
        aria-label="Ir a la galería"
      >
        <img
          className="hero__cat-img"
          src="/illustrations/cat.gif"
          alt=""
          aria-hidden="true"
        />
      </button>
    </header>
  );
}
