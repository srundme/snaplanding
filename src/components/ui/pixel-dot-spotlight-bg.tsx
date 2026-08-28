import { useEffect, useRef } from "react";

/**
 * Pixel-tuned hero: dense dot grid + mouse spotlight (teal illuminate).
 */
export function PixelDotSpotlightBg({
  gap = 24,
  radius = 1.1,
  spotlight = 280,
  base = "#050505",
  dim = "rgba(255,255,255,0.10)",
  lit = "rgba(255,255,255,0.55)",
  teal = "rgba(45,212,191,0.95)",
  glow = "rgba(20,184,166,0.16)",
}: {
  gap?: number;
  radius?: number;
  spotlight?: number;
  base?: string;
  dim?: string;
  lit?: string;
  teal?: string;
  glow?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const host = wrap.parentElement ?? wrap;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (mouse.current.x < 0) {
        mouse.current.x = mouse.current.tx = w * 0.52;
        mouse.current.y = mouse.current.ty = h * 0.42;
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.current.tx = e.clientX - r.left;
      mouse.current.ty = e.clientY - r.top;
    };

    const onLeave = () => {
      mouse.current.tx = w * 0.52;
      mouse.current.ty = h * 0.42;
    };

    const sparkle = (ix: number, iy: number) => {
      const n = ((ix * 73856093) ^ (iy * 19349663)) >>> 0;
      return n % 47 === 0;
    };

    const draw = () => {
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.18;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.18;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      const g = ctx.createRadialGradient(mx, my, 0, mx, my, spotlight);
      g.addColorStop(0, glow);
      g.addColorStop(0.45, "rgba(20,184,166,0.05)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w % gap) / 2;
      const oy = (h % gap) / 2;

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const x = ox + ix * gap;
          const y = oy + iy * gap;
          const dx = x - mx;
          const dy = y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - d / spotlight);
          const fall = t * t * (3 - 2 * t);

          const isSparkle = sparkle(ix, iy);
          if (fall < 0.02 && !isSparkle) {
            ctx.fillStyle = dim;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          if (isSparkle || fall > 0.35) {
            ctx.fillStyle = teal;
            ctx.globalAlpha = isSparkle ? 0.55 + fall * 0.45 : 0.35 + fall * 0.65;
          } else {
            ctx.fillStyle = lit;
            ctx.globalAlpha = 0.12 + fall * 0.75;
          }
          ctx.beginPath();
          ctx.arc(x, y, radius + fall * 0.35, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      const vig = ctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        w * 0.15,
        w * 0.5,
        h * 0.45,
        w * 0.72,
      );
      vig.addColorStop(0, "rgba(5,5,5,0)");
      vig.addColorStop(1, "rgba(5,5,5,0.92)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [gap, radius, spotlight, base, dim, lit, teal, glow]);

  return (
    <div
      ref={wrapRef}
      className="hero-pixel-bg"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
