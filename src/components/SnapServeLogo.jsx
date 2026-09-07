import { Link } from "react-router-dom";
import { logos } from "../lib/logos";
import { useTheme } from "./ThemeProvider";

const sizes = {
  sm: { icon: 22, word: "text-sm", gap: "gap-2" },
  md: { icon: 28, word: "text-base", gap: "gap-2.5" },
  lg: { icon: 36, word: "text-lg", gap: "gap-3" },
  xl: { icon: 48, word: "text-2xl md:text-3xl", gap: "gap-3.5" },
  hero: {
    icon: 58,
    word: "text-[1.9rem] leading-none md:text-[2.55rem]",
    gap: "gap-4",
  },
};

function LogoBars({ size = 28, className = "", theme = "light" }) {
  const onDark = theme === "dark";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect x="60" y="40" width="421" height="121" rx="60.5" fill={onDark ? "#f4f4f5" : "#080808"} />
      <rect x="120" y="200" width="421" height="121" rx="60.5" fill={onDark ? "#a1a1aa" : "#6F6F6F"} />
      <rect x="180" y="360" width="421" height="122" rx="61" fill={onDark ? "#71717a" : "#ACAEB2"} />
    </svg>
  );
}

function LogoWordmark({ size = "md", theme = "dark" }) {
  const snap = theme === "dark" ? "text-white" : "text-black";
  const serve = theme === "dark" ? "text-[#a1a1aa]" : "text-[#a1a1aa]";
  const wordClass = sizes[size].word;
  const tracking = size === "hero" ? "tracking-[-0.04em]" : "tracking-tight";

  return (
    <span className={`font-display font-semibold ${tracking} ${wordClass}`}>
      <span className={snap}>Snap</span>
      <span className={`font-normal ${serve}`}>Serve</span>
    </span>
  );
}

export default function SnapServeLogo({
  variant = "full",
  size = "md",
  theme: themeProp,
  className = "",
  asLink = false,
  href = "/",
}) {
  const { theme: ctxTheme } = useTheme();
  const theme = themeProp ?? ctxTheme ?? "light";
  const { icon, gap } = sizes[size];

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
          <LogoBars size={icon} theme={theme} />
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
