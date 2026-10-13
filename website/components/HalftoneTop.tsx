'use client';

import { useEffect, useRef } from 'react';

const WIDTH = 260;
const HEIGHT = 300;
const SPACING = 5;
const STAR_SIZE = 310;
const TILT = (15 * Math.PI) / 180;
const FRAME_MS = 1000 / 30;

// Halftone of the webring's star top: each dot samples the logo's alpha for
// the silhouette and its brightness for the dot size.
export default function HalftoneTop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    let frame = 0;
    let cancelled = false;
    const img = new Image();
    img.src = '/faviconhq.png';

    img.onload = () => {
      if (cancelled) return;

      const sampler = document.createElement('canvas');
      sampler.width = WIDTH;
      sampler.height = HEIGHT;
      const sctx = sampler.getContext('2d', { willReadFrequently: true });
      if (!sctx) return;
      sctx.translate(WIDTH / 2, HEIGHT / 2);
      sctx.rotate(TILT);
      sctx.drawImage(img, -STAR_SIZE / 2, -STAR_SIZE / 2, STAR_SIZE, STAR_SIZE);
      const { data } = sctx.getImageData(0, 0, WIDTH, HEIGHT);

      const cx = WIDTH / 2;
      const cy = HEIGHT / 2;

      const draw = (t: number) => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (let py = SPACING / 2; py < HEIGHT; py += SPACING) {
          for (let px = SPACING / 2; px < WIDTH; px += SPACING) {
            const i = (Math.floor(py) * WIDTH + Math.floor(px)) * 4;
            const a = data[i + 3];

            let size: number;
            let alpha: number;

            if (a > 128) {
              const lum = (data[i] + data[i + 1] + data[i + 2]) / (3 * 255);
              size = 0.3 + 0.65 * lum;
              alpha = 0.55;
            } else if (a > 0) {
              continue;
            } else {
              const dist = Math.hypot(px - cx, py - cy);
              const ripple = 0.5 + 0.5 * Math.sin(dist * 0.06 - t * 0.6);
              const falloff = Math.max(0, 1 - dist / (WIDTH / 2));
              size = 0.1 + 0.3 * ripple * falloff;
              alpha = 0.14 * falloff;
            }

            if (alpha < 0.01) continue;
            ctx.fillStyle = `rgba(232,232,232,${alpha})`;
            ctx.beginPath();
            ctx.arc(px, py, (size * SPACING) / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      };

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        draw(0);
        return;
      }

      let last = 0;
      const loop = (now: number) => {
        frame = requestAnimationFrame(loop);
        if (now - last < FRAME_MS) return;
        last = now;
        draw(now / 1000);
      };
      frame = requestAnimationFrame(loop);
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: WIDTH, height: HEIGHT }}
      className="hidden sm:block shrink-0"
    />
  );
}
