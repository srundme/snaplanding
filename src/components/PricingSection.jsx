import GlowButton from "./GlowButton";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
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
      "IRDAI / DPDP / TRAI alignment",
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
    <section id="pricing" className="bento-border border-b bg-black p-8 md:p-12 lg:p-14">
      <Reveal className="text-center">
        <p className="label">Pricing</p>
        <h2 className="headline-lg mt-3">Pay per minute. No surprises.</h2>
        <p className="body-text mx-auto mt-3 max-w-xl">
          Bring your own provider keys — you only pay SnapServe for orchestration.
        </p>
      </Reveal>

      <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.08}>
        {tiers.map((tier) => (
          <StaggerItem
            key={tier.name}
            className={`flex flex-col rounded-2xl border p-8 ${
              tier.highlight
                ? "border-[#14B8A6]/40 bg-gradient-to-b from-[#14B8A6]/10 to-transparent"
                : "border-[#27272a] bg-[#0a0a0a]"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#52525b]">
              {tier.name}
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">{tier.price}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#71717a]">{tier.desc}</p>
            <ul className="mt-6 flex-1 space-y-2">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                  <span className="mt-0.5 text-[#14B8A6]">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              {tier.href ? (
                <a href={tier.href} className="outline-btn">
                  {tier.cta}
                </a>
              ) : (
                <GlowButton href={SIGNUP_URL} hoverText="Get started →">
                  {tier.cta}
                </GlowButton>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
