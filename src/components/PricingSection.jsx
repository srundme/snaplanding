import { Check } from "lucide-react";
import GlowButton from "./GlowButton";
import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import { PriceGlyph } from "./graphics/SnapGlyphs";
import { SIGNUP_URL, SALES_URL } from "../lib/links";

const tiers = [
  {
    name: "Developer",
    price: "Usage based",
    desc: "For testing workflows with your own provider keys.",
    features: [
      "Caller memory & auto-redial",
      "Lead imports and campaigns",
      "Google Calendar scheduling",
      "Live call console",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Production",
    price: "Volume review",
    desc: "For teams moving proven call workflows into production.",
    features: [
      "Expanded campaign capacity",
      "Lead-source connectors",
      "CSV import and suppression controls",
      "Priority support",
    ],
    cta: "Start free",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom scope",
    desc: "For deployment, security, and integration requirements.",
    features: [
      "Deployment architecture review",
      "Security requirements review",
      "Custom connector assessment",
      "Dedicated account support",
    ],
    cta: "Talk to sales",
    highlight: false,
    href: SALES_URL,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-visible border-b border-line bg-surface-0 px-6 py-16 md:px-14 md:py-20"
    >
      <Reveal className="relative z-[2] overflow-visible text-center">
        <SectionLabel icon={PriceGlyph} center>
          Pricing
        </SectionLabel>
        <h2 className="headline-lg mx-auto mt-4 max-w-2xl overflow-visible pb-1">
          Usage-based orchestration.{" "}
          <span className="brand-gradient-text">Provider costs stay separate.</span>
        </h2>
        <p className="body-text mx-auto mt-3 max-w-xl">
          Bring your provider keys or discuss a managed setup. Contact sales for current rates.
        </p>
      </Reveal>

      <div className="relative mt-8 grid gap-0 border-t border-line md:grid-cols-3 md:divide-x md:divide-line">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col border-b border-line px-0 py-7 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0 ${
              tier.highlight ? "pricing-tier--featured relative" : ""
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
                <GlowButton href={SIGNUP_URL} hoverText="Start free →">
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
