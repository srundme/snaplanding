import { useEffect, useRef } from "react";

const PALETTE = ["#FF9933", "#14B8A6", "#6366f1", "#0ea5e9", "#f59e0b", "#2dd4bf"];

function noise(x, y, t) {
  return (
    Math.sin(x * 0.04 + t) * 0.5 +
    Math.sin(y * 0.05 - t * 0.8) * 0.3 +
    Math.sin((x + y) * 0.03 + t * 1.2) * 0.2
  );
}

export default function MemoryCloud({ className = "" }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const frame = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      const cell = 5;
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      const cx = w * (0.55 + (mouse.current.x - 0.5) * 0.08);
      const cy = h * (0.45 + (mouse.current.y - 0.5) * 0.08);

      t += 0.012;
      frame.current = t;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = col * cell;
          const py = row * cell;
          const dx = px - cx;
          const dy = py - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const blob =
            1 -
            dist /
              (Math.min(w, h) *
                (0.38 +
                  noise(angle * 3, dist * 0.02, t) * 0.12 +
                  noise(col, row, t * 2) * 0.06));

          if (blob > 0) {
            const n = noise(col * 0.5, row * 0.5, t * 1.5);
            const ci = Math.floor(((n + 1) / 2) * PALETTE.length) % PALETTE.length;
            const alpha = Math.min(1, blob * 1.4);
            const barH = cell * (0.6 + blob * 0.8);
            ctx.globalAlpha = alpha * 0.85;
            ctx.fillStyle = PALETTE[ci];
            ctx.fillRect(px, py + cell - barH, cell - 1, barH);
          }
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
