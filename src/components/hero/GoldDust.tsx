"use client";

import { useEffect, useRef } from "react";

/** Lightweight 2D-canvas gold dust drifting in the shop light. No WebGL needed. */
export function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; r: number; s: number; a: number; d: number };
    let dust: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.floor((w * h) / 14000));
      dust = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        s: Math.random() * 0.3 + 0.05, // rise speed
        a: Math.random() * 0.5 + 0.2, // alpha
        d: Math.random() * Math.PI * 2, // drift phase
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      for (const p of dust) {
        p.y -= p.s;
        p.x += Math.sin(t + p.d) * 0.25;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
        const twinkle = p.a * (0.6 + 0.4 * Math.sin(t * 2 + p.d));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${twinkle})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(231,211,166,0.8)";
        ctx.fill();
      }
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
