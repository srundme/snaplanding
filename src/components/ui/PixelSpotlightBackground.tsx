import { useCallback, useEffect, useRef } from "react";

interface PixelSpotlightProps {
  gap?: number;
  color?: string;
  baseColor?: string;
  spotlightRadius?: number;
}

export function PixelSpotlightBackground({
  gap = 8,
  color = "#14B8A6",
  baseColor = "#1f1f1f",
  spotlightRadius = 260,
}: PixelSpotlightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const animFrameRef = useRef<number>(0);

  const initAndRender = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    cancelAnimationFrame(animFrameRef.current);

    const parent = canvas.parentElement;
    const w = (canvas.width = parent?.clientWidth || window.innerWidth);
    const h = (canvas.height = parent?.clientHeight || window.innerHeight);

    if (!mouseRef.current.active) {
      mouseRef.current.x = w / 2;
      mouseRef.current.y = h / 2;
    }

    const draw = () => {
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const radiusSq = spotlightRadius * spotlightRadius;

      for (let x = 0; x < w; x += gap) {
        for (let y = 0; y < h; y += gap) {
          const dx = x - mx;
          const dy = y - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const intensity = 1 - Math.sqrt(distSq) / spotlightRadius;
            const size = 1.2 + intensity * 1.6;
            const alpha = 0.2 + intensity * 0.85;
            ctx.fillStyle = color;
            ctx.globalAlpha = alpha;
            ctx.fillRect(x - size / 2, y - size / 2, size, size);
          } else {
            ctx.fillStyle = baseColor;
            ctx.globalAlpha = 1;
            ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
          }
        }
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, [gap, color, baseColor, spotlightRadius]);

  useEffect(() => {
    initAndRender();

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      cancelAnimationFrame(animFrameRef.current);
      initAndRender();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initAndRender]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_90%)] opacity-85" />
    </div>
  );
}
