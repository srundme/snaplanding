export default function GlowButton({ children, href = "#cta", className = "" }) {
  return (
    <a href={href} className={`glow-btn-wrap group ${className}`}>
      <span className="glow-btn">
        <span className="group-hover:hidden">{children}</span>
        <span className="hidden group-hover:inline">15-minute live walkthrough</span>
      </span>
    </a>
  );
}
