import { Check, KeyRound, ScrollText, Shield } from "lucide-react";
import { Reveal } from "./motion/Reveal";

const PILLARS = [
  {
    Icon: Shield,
    title: "Revenue calls, not demos",
    desc: "Designed for outbound and renewal traffic where a missed context costs a deal.",
  },
  {
    Icon: KeyRound,
    title: "Your keys stay yours",
    desc: "Bring ASR, LLM, and TTS keys. SnapServe orchestrates memory and actions — it doesn’t own the model layer.",
  },
  {
    Icon: ScrollText,
    title: "Full conversation trail",
    desc: "Caller profiles, notes, and follow-ups stay attributable for ops and compliance review.",
  },
];

const BADGES = [
  "DPDP-ready posture",
  "Provider-agnostic",
  "Role-based access",
  "Exportable call history",
];

export default function TrustSecuritySection() {
  return (
    <section
      id="trust"
      className="border-b border-line bg-surface-0 px-6 py-12 md:px-14 md:py-14"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#14B8A6]/60" />
            <p className="label text-ink-2">Trust</p>
          </div>
          <h2 className="headline-lg mt-4 max-w-3xl">
            Built for{" "}
            <span className="brand-gradient-text">calls that move money.</span>
          </h2>
          <p className="body-text mt-3 max-w-2xl">
            When voice agents sit on renewals and collections, control and
            auditability are product requirements — not a footer line.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {PILLARS.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i} y={12}>
              <div className="h-full border-t border-line pt-4">
                <item.Icon
                  className="accent-teal h-4 w-4"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
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
        </Reveal>
      </div>
    </section>
  );
}
