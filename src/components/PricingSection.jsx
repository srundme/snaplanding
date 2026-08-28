import { Check } from "lucide-react";
import GlowButton from "./GlowButton";
import { Reveal } from "./motion/Reveal";
import { SIGNUP_URL } from "../lib/links";

const tiers = [
  {
    name: "Developer",
    price: "Pay per minute",
    desc: "Start building with $5 free credit. Bring your own provider keys.",
    features: [
      "Caller memory & auto-redial",
      "Campaign batches up to 1K leads",
      "Google Calendar scheduling",
      "Live command center",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Production",
    price: "Volume pricing",
    desc: "For teams running outbound at scale with full campaign tooling.",
    features: [
      "Unlimited memory profiles",
      "Meta & website form auto-dial",
      "Bulk CSV + DNC filtering",
      "Priority support",
    ],
    cta: "Start free",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Dedicated infra, compliance review, and custom SLAs.",
    features: [
      "Dedicated deployment",
      "Compliance review & custom SLAs",
      "Custom integrations",
      "Account manager",
    ],
    cta: "Contact sales",
    highlight: false,
    href: "mailto:support@snapserve.ai",
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="border-b border-line bg-surface-0 px-6 py-12 md:px-14 md:py-14"
    >
      <Reveal className="overflow-visible text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-7 bg-[#14B8A6]/60" />
          <p className="label text-ink-2">Pricing</p>
          <span className="h-px w-7 bg-[#14B8A6]/60" />
        </div>
        <h2 className="headline-lg mx-auto mt-4 max-w-2xl overflow-visible pb-1">
          Pay per minute.{" "}
          <span className="brand-gradient-text">BYOP included.</span>
        </h2>
        <p className="body-text mx-auto mt-3 max-w-xl">
          You pay ASR, LLM, and TTS directly. SnapServe bills only the
          orchestration layer — memory, redial, campaigns, write-back.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-0 border-t border-line md:grid-cols-3 md:divide-x md:divide-line">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col border-b border-line px-0 py-7 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0 ${
              tier.highlight ? "relative" : ""
            }`}
          >
            {tier.highlight ? (
              <span className="accent-teal mb-3 text-[10.5px] font-semibold uppercase tracking-[0.08em]">
                Recommended
              </span>
            ) : (
              <span className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-transparent select-none" aria-hidden="true">
                ·
              </span>
            )}
            <p className="label text-ink-3">{tier.name}</p>
            <p className="mt-3 text-[24px] font-semibold tracking-[-0.035em] text-ink">
              {tier.price}
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{tier.desc}</p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-ink-2">
                  <Check
                    className="accent-teal mt-[3px] h-3.5 w-3.5 shrink-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              {tier.highlight ? (
                <GlowButton href={SIGNUP_URL} hoverText="Get started →">
                  {tier.cta}
                </GlowButton>
              ) : (
                <a
                  href={tier.href ?? SIGNUP_URL}
                  className="outline-btn"
                  {...(tier.href ? {} : { rel: "noopener noreferrer" })}
                >
                  {tier.cta}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
