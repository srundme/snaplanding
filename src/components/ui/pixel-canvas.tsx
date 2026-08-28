import { useCallback, useEffect, useRef } from "react";

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number,
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x,
    y,
    color,
    ctx,
    speed: rand(0.08, 0.4) * baseSpeed,
    size: 0,
    sizeStep: rand(0.12, 0.28),
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) {
        p.isShimmer = true;
        p.isIdle = true;
        p.draw();
        return;
      }
      p.size += p.sizeStep;
      p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
  };

  return p;
}

type PixelCanvasProps = {
  colors: string[];
  gap?: number;
  speed?: number;
  /** Keep a light shimmer after appear. Default false for scroll performance. */
  keepShimmer?: boolean;
};

export function PixelCanvas({
  colors,
  gap = 8,
  speed = 30,
  keepShimmer = false,
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);
  const inViewRef = useRef(true);
  const settledRef = useRef(false);

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = 0;
  }, []);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || colors.length === 0) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    // Cap pixel density for perf — draw at most ~1.25x CSS size
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const w = Math.max(1, Math.floor(width * dpr));
    const h = Math.max(1, Math.floor(height * dpr));
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${Math.floor(width)}px`;
    canvas.style.height = `${Math.floor(height)}px`;

    const effectiveGap = Math.max(gap, 6) * dpr;
    const effectiveSpeed = reducedMotionRef.current
      ? 0
      : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += effectiveGap) {
      for (let y = 0; y < h; y += effectiveGap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current
          ? 0
          : Math.sqrt(dx * dx + dy * dy) * 0.45;
        pixels.push(
          createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay),
        );
      }
    }

    pixelsRef.current = pixels;
    settledRef.current = false;
  }, [colors, gap, speed]);

  const paintStatic = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const pixel of pixelsRef.current) {
      if (pixel.size > 0) pixel.draw();
    }
  }, []);

  const animate = useCallback(
    (mode: "appear") => {
      stopLoop();
      if (reducedMotionRef.current) {
        for (const pixel of pixelsRef.current) {
          pixel.size = pixel.maxSize;
          pixel.isIdle = true;
        }
        paintStatic();
        settledRef.current = true;
        return;
      }

      const frameInterval = 1000 / 30; // 30fps is enough for this effect

      const loop = () => {
        if (!inViewRef.current) {
          animationRef.current = 0;
          return;
        }

        animationRef.current = requestAnimationFrame(loop);

        const now = performance.now();
        const elapsed = now - lastFrameRef.current;
        if (elapsed < frameInterval) return;
        lastFrameRef.current = now - (elapsed % frameInterval);

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const pixels = pixelsRef.current;
        for (const pixel of pixels) {
          if (mode === "appear" && !pixel.isShimmer) pixel.appear();
          else if (keepShimmer && pixel.isShimmer) {
            pixel.shimmer();
            pixel.draw();
          } else {
            pixel.draw();
          }
        }

        if (!keepShimmer && pixels.every((p) => p.isIdle || p.isShimmer)) {
          settledRef.current = true;
          stopLoop();
          paintStatic();
        }
      };

      animationRef.current = requestAnimationFrame(loop);
    },
    [keepShimmer, paintStatic, stopLoop],
  );

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    init();
    animate("appear");

    const wrap = wrapRef.current;
    const resizeObserver = new ResizeObserver(() => {
      stopLoop();
      init();
      if (inViewRef.current) animate("appear");
      else paintStatic();
    });
    if (wrap) resizeObserver.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          stopLoop();
          return;
        }
        if (!settledRef.current || keepShimmer) {
          animate("appear");
        }
      },
      { rootMargin: "80px", threshold: 0 },
    );
    if (wrap) io.observe(wrap);

    return () => {
      resizeObserver.disconnect();
      io.disconnect();
      stopLoop();
    };
  }, [init, animate, keepShimmer, paintStatic, stopLoop]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden contain-strict">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
