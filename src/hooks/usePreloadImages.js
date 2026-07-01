import { useState, useEffect } from "react";

/**
 * Precarga una lista de imágenes y reporta el progreso.
 *
 * Cómo funciona: por cada src creamos un `new Image()`. El navegador lo
 * descarga y lo guarda en su caché. Cuando después el <img> real de la
 * galería pide ese mismo src, sale de caché → aparece instantáneo.
 *
 * Contamos tanto onload como onerror (una imagen rota NO debe colgar el
 * loader para siempre). `cancelled` evita setState tras desmontar.
 *
 * @param {string[]} srcs  rutas a precargar (debe ser un array estable)
 * @returns {{ progress: number, done: boolean, loaded: number, total: number }}
 */
export function usePreloadImages(srcs) {
  const [loaded, setLoaded] = useState(0);
  const [done, setDone] = useState(srcs.length === 0);

  useEffect(() => {
    if (srcs.length === 0) {
      setDone(true);
      return;
    }

    let cancelled = false;
    let count = 0;

    const tick = () => {
      if (cancelled) return;
      count += 1;
      setLoaded(count);
      if (count >= srcs.length) setDone(true);
    };

    const imgs = srcs.map((src) => {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
      return img;
    });

    return () => {
      cancelled = true;
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [srcs]);

  const total = srcs.length;
  const progress = total === 0 ? 100 : Math.round((loaded / total) * 100);

  return { progress, done, loaded, total };
}
