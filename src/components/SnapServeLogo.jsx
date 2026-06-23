import { Link } from "react-router-dom";
import { logos } from "../lib/logos";

const sizes = {
  sm: { icon: 22, word: "text-sm", gap: "gap-2" },
  md: { icon: 28, word: "text-base", gap: "gap-2.5" },
  lg: { icon: 36, word: "text-lg", gap: "gap-3" },
};

function LogoBars({ size = 28, className = "" }) {
  const h = size * 0.22;
  const w = size * 1.05;
  const gap = size * 0.14;
  const step = size * 0.16;
  const r = h / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden
      className={className}
    >
      <rect x={0} y={0} width={w} height={h} rx={r} fill="#3f3f46" />
      <rect x={step} y={h + gap} width={w} height={h} rx={r} fill="#71717a" />
      <rect x={step * 2} y={(h + gap) * 2} width={w} height={h} rx={r} fill="#d4d4d8" />
    </svg>
  );
}

function LogoWordmark({ size = "md", theme = "dark" }) {
  const snap = theme === "dark" ? "text-white" : "text-black";
  const serve = theme === "dark" ? "text-[#a1a1aa]" : "text-[#a1a1aa]";
  const wordClass = sizes[size].word;

  return (
    <span className={`font-display font-semibold tracking-tight ${wordClass}`}>
      <span className={snap}>Snap</span>
      <span className={`font-normal ${serve}`}>Serve</span>
    </span>
  );
}

export default function SnapServeLogo({
  variant = "full",
  size = "md",
  theme = "dark",
  className = "",
  asLink = false,
  href = "/",
}) {
  const { icon, gap } = sizes[size];
  const useRasterIcon = variant === "icon-raster";

  const content = (
    <span className={`inline-flex items-center ${gap} ${className}`}>
      {(variant === "icon" || variant === "icon-raster" || variant === "full") && (
        variant === "icon-raster" ? (
          <img
            src={theme === "light" ? logos.iconLight : logos.iconDark}
            alt=""
            width={icon}
            height={icon}
            className="shrink-0 rounded-sm object-contain"
            style={{ width: icon, height: icon }}
          />
        ) : (
          <LogoBars size={icon} />
        )
      )}

      {(variant === "full" || variant === "wordmark") && (
        <LogoWordmark size={size} theme={theme} />
      )}

      {variant === "full-raster" && (
        <img
          src={logos.fullLight}
          alt="SnapServe"
          className="h-8 w-auto object-contain md:h-9"
        />
      )}
    </span>
  );

  if (asLink) {
    return (
      <Link to={href} className="group inline-flex transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}

export { LogoBars, LogoWordmark };
