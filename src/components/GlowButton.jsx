import { APP_URL } from "../lib/links";

export default function GlowButton({
  children,
  href = APP_URL,
  hoverText = "Go to app →",
  className = "",
}) {
  return (
    <a
      href={href}
      className={`glow-btn-wrap group ${className}`}
      rel="noopener noreferrer"
    >
      <span className="glow-btn">
        <span className="group-hover:hidden">{children}</span>
        <span className="hidden group-hover:inline">{hoverText}</span>
      </span>
    </a>
  );
}
