import { useEffect, useState } from "react";
import { site } from "../data/illustrations";
import "./Navbar.css";

/**
 * Navbar fijo que NO existe al inicio: aparece deslizándose desde arriba
 * cuando el usuario pasa ~la mitad del primer viewport (el hero ya se
 * está desvaneciendo, así que el handoff es limpio).
 */
export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToGallery = () =>
    document
      .getElementById("gallery")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      className={`navbar${visible ? " navbar--visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="navbar__inner container">
        <button type="button" onClick={scrollToTop}>
          Inicio
        </button>
        <button type="button" onClick={scrollToGallery}>
          Galería
        </button>
        <a href={`mailto:${site.contact}`}>Contacto</a>
      </div>
    </nav>
  );
}
