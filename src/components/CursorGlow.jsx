import { useEffect, useRef } from "react";

const GLOW =
  "radial-gradient(circle, rgba(20,184,166,0.08) 0%, rgba(255,153,51,0.03) 40%, transparent 70%)";

export default function CursorGlow() {
  const glowRef = useRef(null);
  const hostRef = useRef(null);
  const pos = useRef({ x: 90, y: 260 });
  const frame = useRef(0);

  useEffect(() => {
    const host = hostRef.current?.parentElement;
    const glow = glowRef.current;
    if (!host || !glow) return;

    const paint = () => {
      glow.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    };

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      if (x < 0 || x > r.width || y < 0 || y > r.height) {
        glow.style.opacity = "0";
        return;
      }

      glow.style.opacity = "1";
      pos.current = { x, y };
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        paint();
      });
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    paint();
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);

    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div ref={hostRef} className="side-rail-glow-layer" aria-hidden="true">
      <div ref={glowRef} className="side-rail-glow" style={{ background: GLOW }} />
    </div>
  );
}
