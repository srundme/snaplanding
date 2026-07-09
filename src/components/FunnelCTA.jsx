import GlowButton from "./GlowButton";
import { SIGNUP_URL } from "../lib/links";

export default function FunnelCTA({
  title = "Start orchestrating voice AI.",
  subtitle = "100 free minutes · No credit card · Set up in minutes",
  className = "",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#14B8A6]/30 bg-[#0a0a0a] p-8 text-center md:p-10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08)_0%,transparent_65%)]" />
      <h2 className="headline-lg relative">{title}</h2>
      <p className="body-text relative mx-auto mt-3 max-w-lg">{subtitle}</p>
      <div className="relative mt-6 flex flex-col items-center gap-3">
        <GlowButton href={SIGNUP_URL} hoverText="Get started →">
          Get started free
        </GlowButton>
        <p className="font-mono text-[10px] text-[#52525b]">
          AI voice agent platform · Every Indian language
        </p>
      </div>
    </div>
  );
}
