import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { KeyGlyph, ShieldGlyph, TrafficGlyph, TrailGlyph } from "./graphics/SnapGlyphs";
import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

const PILLARS = [
  {
    Icon: TrafficGlyph,
    title: "Built for live traffic",
    desc: "Reliable control for outbound and renewal calls.",
  },
  {
    Icon: KeyGlyph,
    title: "Your keys stay yours",
    desc: "Bring your own provider keys or use managed access.",
  },
  {
    Icon: TrailGlyph,
    title: "Full conversation trail",
    desc: "Review profiles, notes, and follow-ups in one place.",
  },
];

const BADGES = [
  "Bring your own provider keys",
  "Reviewable call history",
  "Role-based workspace access",
  "Exportable conversation records",
];

export default function TrustSecuritySection() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden border-b border-line bg-surface-0 px-6 py-16 md:px-14 md:py-20"
    >
      <div className="relative z-[2] mx-auto max-w-5xl">
        <Reveal>
          <SectionLabel icon={ShieldGlyph}>Trust</SectionLabel>
          <h2 className="headline-lg mt-4 max-w-3xl">
            Built for{" "}
            <span className="brand-gradient-text">calls that move money.</span>
          </h2>
          <p className="body-text mt-3 max-w-2xl">
            Keep provider access, caller context, and conversation records visible to your team.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {PILLARS.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i} y={12}>
              <div className="h-full border-t border-line pt-4">
                <span className="story-icon">
                  <item.Icon size={16} />
                </span>
                <h3 className="mt-3.5 text-[15px] font-semibold tracking-[-0.018em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-line pt-5">
            {BADGES.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-2 text-[12.5px] text-ink-2"
              >
                <Check className="accent-teal h-3.5 w-3.5" strokeWidth={2} />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[12.5px] leading-relaxed text-ink-3">
            Review how data is handled in our{" "}
            <Link className="text-ink-2 underline decoration-line underline-offset-4 hover:text-ink" to="/privacy">
              Privacy Policy
            </Link>{" "}
            and the service terms in our{" "}
            <Link className="text-ink-2 underline decoration-line underline-offset-4 hover:text-ink" to="/terms">
              Terms
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
