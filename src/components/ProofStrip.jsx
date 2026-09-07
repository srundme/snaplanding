import GsapFadeStagger from "./motion/GsapFadeStagger";

const STATS = [
  { value: "BYOP", label: "Use your provider keys" },
  { value: "Memory", label: "Context across calls" },
  { value: "Redial", label: "Resume interrupted calls" },
  { value: "Local", label: "Provider-based Indian speech" },
];

export default function ProofStrip() {
  return (
    <section className="proof-strip relative" aria-label="Platform proof points">
      <GsapFadeStagger className="proof-strip-inner relative z-[2]" childSelector="[data-stagger-item]">
        {STATS.map((stat) => (
          <div key={stat.label} className="proof-strip-item" data-stagger-item>
            <p className="proof-strip-value">{stat.value}</p>
            <p className="proof-strip-label">{stat.label}</p>
          </div>
        ))}
      </GsapFadeStagger>
    </section>
  );
}
