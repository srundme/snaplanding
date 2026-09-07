import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Sampled left-to-right off the Dynamic Island reference photos and corrected
 * for the warm room light. Hue tracks horizontal position (r = -0.49), not
 * amplitude, running 86deg lime -> 68deg yellow -> 48deg amber -> 32deg orange.
 */
const GRADIENT_STOPS = ["#A5EB4A", "#D8EF4E", "#F0CF45", "#F0A248"];

/** Target spacing between bar centres, in px — matches the phone's density. */
const BAR_PITCH = 9;

function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

const RGB_STOPS = GRADIENT_STOPS.map(hexToRgb);

function colorAt(t) {
  const scaled = t * (RGB_STOPS.length - 1);
  const index = Math.min(RGB_STOPS.length - 2, Math.floor(scaled));
  const local = scaled - index;
  const from = RGB_STOPS[index];
  const to = RGB_STOPS[index + 1];
  const channels = from.map((c, i) => Math.round(c + (to[i] - c) * local));
  return `rgb(${channels.join(" ")})`;
}

/** Deterministic jitter so the wave looks organic but never reshuffles. */
function noise(i) {
  const value = Math.sin(i * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

/**
 * Apple Dynamic Island Siri waveform — a black pill with symmetrical gradient
 * bars that pulse as if audio is being processed.
 *
 * @param playing   Bars animate when true, collapse to dots when false.
 * @param progress  Optional 0–1 value; bars ahead of it dim to show position.
 * @param barCount  Fixed bar count; omit to fill the width at the phone's pitch.
 */
export default function DynamicIslandWave({
  playing = true,
  progress = null,
  barCount = null,
  className = "",
}) {
  const reduceMotion = useReducedMotion();
  const waveRef = useRef(null);
  const [autoCount, setAutoCount] = useState(36);
  const count = barCount ?? autoCount;

  // The pill spans the card, so the bar count follows its measured width.
  useEffect(() => {
    const el = waveRef.current;
    if (barCount || !el || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (width > 0) {
        setAutoCount(Math.max(16, Math.min(160, Math.round(width / BAR_PITCH))));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [barCount]);

  const bars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const t = count === 1 ? 0.5 : i / (count - 1);
        // Taller through the middle, tapering at both ends.
        const envelope = 0.45 + 0.55 * Math.sin(Math.PI * t);
        const peak = (0.4 + noise(i) * 0.6) * envelope;
        const max = Math.max(20, Math.min(94, peak * 100));
        return {
          color: colorAt(t),
          max,
          min: Math.max(9, max * 0.24),
          duration: 0.8 + noise(i + 91) * 0.7,
          delay: -(i * 0.045 + noise(i + 17) * 0.15),
        };
      }),
    [count],
  );

  const animate = !reduceMotion;
  // Idle keeps a slow, shallow breath so the pill never reads as broken.
  const scale = playing ? 1 : 0.24;
  const pace = playing ? 1 : 2.4;

  return (
    <div
      className={`dyn-island ${className}`}
      role="img"
      aria-label="Audio waveform"
    >
      <div className="dyn-island__wave" ref={waveRef}>
        {bars.map((bar, i) => {
          const ahead =
            playing && progress !== null && i / (count - 1) > progress;

          return (
            <span
              key={i}
              className="dyn-island__bar"
              data-animate={animate || undefined}
              style={{
                "--di-min": `${Math.max(6, bar.min * scale)}%`,
                "--di-max": `${Math.max(9, bar.max * scale)}%`,
                "--di-duration": `${bar.duration * pace}s`,
                "--di-delay": `${bar.delay}s`,
                height: animate ? undefined : `${bar.max * scale}%`,
                // Upcoming audio stays neutral so only played bars read as lit.
                background: ahead ? "rgba(255,255,255,0.22)" : bar.color,
                boxShadow: ahead ? "none" : `0 0 7px ${bar.color}`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
