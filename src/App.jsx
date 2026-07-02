import { useState, useEffect, useMemo } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Preloader from "./components/Preloader";
import { usePreloadImages } from "./hooks/usePreloadImages";
import { allImages, site } from "./data/illustrations";
import "./App.css";

export default function App() {
  // array estable de rutas a precargar (no recalcula en cada render)
  const srcs = useMemo(() => allImages.map((art) => art.src), []);
  const { progress, done } = usePreloadImages(srcs);

  // `mounted` controla cuándo quitamos el loader del DOM (tras el fade-out)
  const [mounted, setMounted] = useState(true);

  // Tope duro: revelamos el sitio como MÁXIMO tras MAX_WAIT, aunque las
  // imágenes no hayan terminado. El hero NO necesita la galería (usa gifs) y
  // las cards cargan con lazy-load al scrollear → jamás bloqueamos 30s.
  useEffect(() => {
    const MAX_WAIT = 1800;
    const cap = setTimeout(() => setMounted(false), MAX_WAIT);
    return () => clearTimeout(cap);
  }, []);

  useEffect(() => {
    if (!done) return;
    // si terminó antes del tope, respira un toque y desmonta
    const t = setTimeout(() => setMounted(false), 500);
    return () => clearTimeout(t);
  }, [done]);

  // bloquear scroll del body mientras el loader está visible
  useEffect(() => {
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  return (
    <>
      {mounted && <Preloader progress={progress} done={done} />}

      <Navbar />

      <Hero />

      {/* el contenido scrollea por encima del hero fijo */}
      <div className="content">
        <main>
          <Gallery />
        </main>
        <footer className="footer container">
          <a href={`mailto:${site.contact}`} className="footer__contact">
            {site.contact}
          </a>
          <span className="footer__year">© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </>
  );
}
