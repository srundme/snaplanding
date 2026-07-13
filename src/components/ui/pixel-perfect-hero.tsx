import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/* -----------------------------------------------------------------------------
 * TRUST LOGOS — provider ecosystem SnapServe orchestrates
 * -------------------------------------------------------------------------- */

const BRAND_LOGOS = [
  () => (
    <span className="font-mono text-sm font-semibold tracking-tight text-foreground/75 opacity-60 transition-opacity duration-300 hover:opacity-100 md:text-base">
      Twilio
    </span>
  ),
  () => (
    <span className="font-mono text-sm font-semibold tracking-tight text-foreground/75 opacity-60 transition-opacity duration-300 hover:opacity-100 md:text-base">
      OpenAI
    </span>
  ),
  () => (
    <span className="font-mono text-sm font-semibold tracking-tight text-foreground/75 opacity-60 transition-opacity duration-300 hover:opacity-100 md:text-base">
      Meta
    </span>
  ),
  () => (
    <span className="font-mono text-sm font-semibold tracking-tight text-foreground/75 opacity-60 transition-opacity duration-300 hover:opacity-100 md:text-base">
      Plivo
    </span>
  ),
];

/* -----------------------------------------------------------------------------
 * CANVAS STAGGERED PHYSICS ENGINE
 * -------------------------------------------------------------------------- */

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
  disappear: () => void;
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
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false;
      p.counter = 0;
      if (p.size <= 0) {
        p.isIdle = true;
        return;
      }
      p.size -= 0.1;
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
};

function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || colors.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy) * 0.65;
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }

    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
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
      for (const pixel of pixels) pixel[mode]();

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    animate("appear");

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * HERO COMPONENT
 * -------------------------------------------------------------------------- */

export interface PixelHeroProps {
  className?: string;
  word1?: string;
  word2?: string;
  description?: string;
  primaryCta?: string;
  primaryCtaMobile?: string;
  secondaryCta?: string;
  secondaryCtaMobile?: string;
  secondaryHref?: string;
  trustLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function PixelHero({
  className,
  word1 = "Silent",
  word2 = "Precision.",
  description = "Minimalist interfaces driven by refined motion. Every calculated detail delivers an elevated digital experience.",
  primaryCta = "Explore Design",
  primaryCtaMobile = "Explore",
  secondaryCta = "View Demo",
  secondaryCtaMobile = "Demo",
  secondaryHref = "#how",
  trustLabel = "Works with your stack",
  onPrimaryClick,
  onSecondaryClick,
}: PixelHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState<string[]>([]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const div = document.createElement("div");
    document.body.appendChild(div);
    div.className = "text-muted-foreground";
    const muted = getComputedStyle(div).color;
    div.className = "text-primary";
    const primary = getComputedStyle(div).color;
    document.body.removeChild(div);

    setThemeColors([muted, muted, muted, muted, primary]);

    const loadTimer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div
      className={cn(
        "relative isolate flex min-h-[100dvh] w-full select-none flex-col overflow-hidden bg-background px-2 py-8 sm:px-6 md:py-10",
        className,
      )}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .tahoe-glass-text {
            color: transparent;
            background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 25%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.9) 55%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 1) 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.3);
            filter: drop-shadow(0 15px 35px rgba(0,0,0,0.4)) drop-shadow(0 5px 10px rgba(0,0,0,0.2));
            animation: shimmer 8s linear infinite;
        }
        @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: 0% center; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0">
        {themeColors.length > 0 && <PixelCanvas colors={themeColors} gap={6} speed={30} />}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background)_100%)] opacity-80" />
      </div>

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center px-1 text-center">
        <div className="mt-20 sm:mt-0">
          <h1 className="tahoe-glass-text flex w-full flex-row flex-wrap items-center justify-center gap-1.5 px-1 text-[2.8rem] leading-none sm:gap-4 sm:text-6xl md:text-8xl lg:gap-6 lg:text-9xl">
            <span className="font-serif font-medium italic">{word1}</span>
            <span className="font-sans font-extrabold tracking-tighter">{word2}</span>
          </h1>
        </div>

        <p className="mt-6 max-w-[95%] px-1 text-sm leading-relaxed font-light text-foreground/85 sm:max-w-md sm:text-lg md:mt-8 md:max-w-xl md:text-xl">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "relative z-10 mt-auto flex w-full flex-col items-center gap-8 px-1 pb-2 md:gap-10 md:pb-4",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          "transition-all duration-1000",
        )}
        style={{ transitionDelay: "450ms" }}
      >
        <div className="pointer-events-auto flex flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="relative inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-4 text-xs font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] md:h-12 md:gap-2 md:px-8 md:text-sm"
          >
            <span className="inline md:hidden">{primaryCtaMobile}</span>
            <span className="hidden md:inline">{primaryCta}</span>
            <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>
          <a
            href={secondaryHref}
            onClick={onSecondaryClick}
            className="relative inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-card/80 to-card px-4 text-xs font-semibold text-card-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] ring-1 ring-border/50 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] md:h-12 md:gap-2 md:px-8 md:text-sm"
          >
            <Play className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="inline md:hidden">{secondaryCtaMobile}</span>
            <span className="hidden md:inline">{secondaryCta}</span>
          </a>
        </div>

        <div
          className="pointer-events-auto flex w-full flex-col items-center gap-4"
          style={{ transitionDelay: "600ms" }}
        >
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground/80 uppercase select-none md:text-xs">
            {trustLabel}
          </span>
          <div className="relative w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <div className="animate-marquee flex w-max gap-12 py-1 md:gap-16 md:py-2">
              <div className="flex items-center gap-12 md:gap-16">
                {BRAND_LOGOS.map((Logo, i) => (
                  <Logo key={i} />
                ))}
              </div>
              <div className="flex items-center gap-12 md:gap-16" aria-hidden="true">
                {BRAND_LOGOS.map((Logo, i) => (
                  <Logo key={`c-${i}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
