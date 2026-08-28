import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import BlurText from "@/components/ui/text-animations/BlurText";
import CountUp from "@/components/ui/text-animations/CountUp";

const TEAL_PIXEL_COLORS = [
  "rgba(20, 184, 166, 0.16)",
  "rgba(45, 212, 191, 0.22)",
  "rgba(13, 148, 136, 0.12)",
  "rgba(94, 234, 212, 0.18)",
  "rgba(148, 163, 184, 0.14)",
];

export interface PixelHeroProps {
  className?: string;
  word1?: string;
  word2?: string;
  description?: string;
  primaryCta?: string;
  primaryCtaMobile?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryCtaMobile?: string;
  secondaryHref?: string;
  trustLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  stackContent?: ReactNode;
}

export function PixelHero({
  className,
  word1 = "Voice AI",
  word2 = "Orchestration.",
  description = "The layer between your providers and your agents — caller memory, auto-redial, campaigns, and scheduling on every call. Built for Indian telephony.",
  primaryCta = "Get started free",
  primaryCtaMobile = "Get started",
  primaryHref,
  secondaryCta = "View platform",
  secondaryCtaMobile = "View platform",
  secondaryHref = "#differentiator",
  trustLabel = ":: WORKS WITH YOUR STACK ::",
  onPrimaryClick,
  onSecondaryClick,
  stackContent,
}: PixelHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState<string[]>([]);

  useEffect(() => {
    setThemeColors(TEAL_PIXEL_COLORS);
    const loadTimer = window.setTimeout(() => setIsLoaded(true), 50);
    return () => window.clearTimeout(loadTimer);
  }, []);

  const PrimaryTag = primaryHref ? "a" : "button";

  return (
    <div
      className={cn(
        "pixel-hero relative isolate w-full select-none bg-[#050505] p-3 sm:p-4 md:p-6",
        className,
      )}
    >
      <style>{`
        .pixel-hero-chrome {
          color: transparent;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.45) 25%,
            rgba(255, 255, 255, 0.12) 45%,
            rgba(255, 255, 255, 0.92) 55%,
            rgba(255, 255, 255, 0.25) 75%,
            rgba(255, 255, 255, 1) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-stroke: 1.25px rgba(255, 255, 255, 0.28);
          text-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
        }
      `}</style>

      {/* Rounded frame — border line from reference */}
      <div className="relative flex min-h-[min(100dvh,820px)] w-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-background md:rounded-[36px] lg:min-h-[780px]">
        {/* Background pixel matrix + center glow + vignette */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          {themeColors.length > 0 && (
            <PixelCanvas colors={themeColors} gap={8} speed={24} />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05)_0%,transparent_48%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.92)_100%)] opacity-95" />
        </div>

        {/* Bottom fade into solid background */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-background to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-16 pb-8 text-center sm:px-6 md:pt-20 md:pb-10">
          <h1 className="flex w-full flex-col items-center gap-2 leading-none sm:gap-3 md:gap-4">
            <span className="pixel-hero-chrome block font-['Sora',sans-serif] text-4xl font-medium tracking-[0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
              {word1}
            </span>
            <span className="pixel-hero-chrome block font-sans text-5xl font-bold tracking-[0.02em] sm:text-7xl md:text-8xl lg:text-[108px]">
              {word2}
            </span>
          </h1>

          <BlurText
            text={description}
            animateBy="words"
            direction="bottom"
            delay={55}
            stepDuration={0.26}
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed font-normal text-white/70 sm:mt-10 sm:text-lg md:mt-12 md:max-w-2xl md:text-xl md:leading-[1.65]"
          />

          <div
            className={cn(
              "pointer-events-auto mt-10 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:justify-center md:mt-14",
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              "transition-all duration-1000 ease-out",
            )}
            style={{ transitionDelay: "280ms" }}
          >
            <PrimaryTag
              {...(primaryHref
                ? { href: primaryHref, rel: "noopener noreferrer" }
                : { type: "button" as const })}
              onClick={onPrimaryClick}
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#14b8a6] px-7 text-sm font-semibold text-black shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-colors duration-200 hover:bg-[#2dd4bf] active:scale-[0.98] sm:h-12 sm:px-8 sm:text-[0.9375rem]"
            >
              <span className="sm:hidden">{primaryCtaMobile}</span>
              <span className="hidden sm:inline">{primaryCta}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </PrimaryTag>

            <a
              href={secondaryHref}
              onClick={onSecondaryClick}
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/10 active:scale-[0.98] sm:h-12 sm:px-8 sm:text-[0.9375rem]"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              <span className="sm:hidden">{secondaryCtaMobile}</span>
              <span className="hidden sm:inline">{secondaryCta}</span>
            </a>
          </div>

          <ul
            className={cn(
              "mt-8 flex flex-wrap items-center justify-center gap-y-2 px-2 sm:mt-10",
              isLoaded ? "opacity-100" : "opacity-0",
              "transition-opacity duration-1000",
            )}
            style={{ transitionDelay: "380ms" }}
          >
            {[
              { label: "Caller memory" },
              {
                label: (
                  <>
                    Redial under{" "}
                    <CountUp
                      to={200}
                      duration={1.2}
                      delay={0.15}
                      suffix="ms"
                      className="tabular-nums"
                    />
                  </>
                ),
                key: "redial",
              },
              { label: "Every regional language" },
            ].map((item, i) => (
              <li
                key={item.key ?? (typeof item.label === "string" ? item.label : i)}
                className={cn(
                  "inline-flex items-center text-[13px] font-medium tracking-[0.02em] text-white/55 sm:text-sm",
                  i > 0 &&
                    "before:mx-3 before:block before:h-3 before:w-px before:bg-white/20 before:content-[''] sm:before:mx-4",
                )}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {stackContent ? (
          <div
            className={cn(
              "relative z-10 mt-auto flex w-full flex-col items-center gap-4 px-4 pb-8 sm:px-6 md:pb-10",
              isLoaded ? "opacity-100" : "opacity-0",
              "transition-opacity duration-1000",
            )}
            style={{ transitionDelay: "480ms" }}
          >
            <span className="text-[11px] font-medium tracking-[0.22em] text-white/35 uppercase select-none sm:text-xs">
              {trustLabel}
            </span>
            <div className="pointer-events-auto w-full max-w-5xl">{stackContent}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PixelHero;
