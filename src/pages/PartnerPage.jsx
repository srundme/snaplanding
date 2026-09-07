import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  Globe,
  Handshake,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Seo from "../components/Seo";
import PartnerForm from "../components/PartnerForm";
import SiteFooter from "../components/SiteFooter";
import SnapServeLogo from "../components/SnapServeLogo";
import SectionLabel from "../components/SectionLabel";
import { LinkGlyph } from "../components/graphics/SnapGlyphs";
import TempleSkyline from "../components/graphics/TempleSkyline";
import { Reveal } from "../components/motion/Reveal";
import { SIGNUP_URL } from "../lib/links";
import { buildPartnerGraph } from "../lib/seo";

const BENEFITS = [
  {
    Icon: Layers,
    title: "Orchestration to resell",
    desc: "Voice, memory, redial, campaigns — one layer your clients plug into.",
  },
  {
    Icon: Globe,
    title: "Indian-language workflows",
    desc: "Choose speech providers that support the languages your clients need.",
  },
  {
    Icon: ShieldCheck,
    title: "Reviewable operations",
    desc: "Bring provider keys and keep call records visible to your team.",
  },
];

const STEPS = [
  "Submit your details",
  "Tell us about the client workflow",
  "Review fit and onboarding with our team",
];

const PROOF = [
  { value: "BYOP", label: "Provider choice" },
  { value: "Memory", label: "Caller context" },
  { value: "History", label: "Reviewable calls" },
];

const AUDIENCE = ["Agencies", "Resellers", "Platform switchers"];

export default function PartnerPage() {
  const [params] = useSearchParams();
  const source = params.get("source") || "partner";
  const competitor = params.get("from") || "";

  const headline = competitor
    ? `Switching from ${competitor}?`
    : "Build on SnapServe.";
  const subline = competitor
    ? `Tell us you're coming from ${competitor} — we'll help you migrate and get live fast.`
    : "For agencies, resellers, and teams shipping voice AI in production.";

  return (
    <>
      <Seo
        title="Partner with SnapServe | Agencies & Resellers"
        description="Discuss agency, reseller, and migration workflows with the SnapServe team."
        pathname="/partner"
        keywords={[
          "snapserve partner",
          "voice ai reseller",
          "vapi alternative partner",
          "bolna alternative partner",
        ]}
        jsonLd={[buildPartnerGraph()]}
      />

      <div className="partner-page dot-bg relative min-h-screen">
        <div className="grain-layer" aria-hidden="true" />

        <header className="partner-page__header">
          <div className="partner-page__header-inner">
            <SnapServeLogo variant="full" size="sm" asLink href="/" />
            <div className="flex items-center gap-4">
              <Link to="/" className="partner-page__back hidden sm:inline">
                ← Home
              </Link>
              <a
                href={SIGNUP_URL}
                className="partner-page__cta-pill"
                rel="noopener noreferrer"
              >
                Start free
              </a>
            </div>
          </div>
        </header>

        <section className="partner-page__hero">
          <div className="partner-page__hero-glow" aria-hidden="true" />
          <div className="partner-page__hero-skyline" aria-hidden="true">
            <TempleSkyline />
          </div>

          <div className="partner-page__hero-inner">
            <Reveal>
              <SectionLabel icon={LinkGlyph}>Partner program</SectionLabel>
              <h1 className="headline-xl partner-page__title mt-5 max-w-3xl text-balance">
                {competitor ? (
                  <>
                    Switching from {competitor}?{" "}
                    <span className="brand-gradient-text">We’ll help you move.</span>
                  </>
                ) : (
                  <>
                    Build on SnapServe.{" "}
                    <span className="brand-gradient-text">Bring your clients.</span>
                  </>
                )}
              </h1>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="body-text partner-page__subline mt-4 max-w-xl">
                {subline}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="partner-page__audience mt-6">
                {AUDIENCE.map((tag) => (
                  <span key={tag} className="partner-page__audience-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="partner-page__proof mt-8" aria-label="Platform proof">
                {PROOF.map((item) => (
                  <li key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <main className="partner-page__main">
          <div className="partner-page__grid">
            <div className="partner-page__story">
              <Reveal>
                <div className="partner-page__story-head">
                  <Handshake
                    className="h-4 w-4 text-[#5eead4]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <p className="label text-ink-2">Why partner</p>
                </div>
              </Reveal>

              <ul className="partner-page__benefits">
                {BENEFITS.map(({ Icon, title, desc }, i) => (
                  <Reveal key={title} delay={0.04 * i}>
                    <li className="partner-page__benefit">
                      <span className="story-icon">
                        <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="partner-page__benefit-title">{title}</h2>
                        <p className="partner-page__benefit-desc">{desc}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={0.14}>
                <div className="partner-page__steps">
                  <p className="label text-ink-3">How it works</p>
                  <ol>
                    {STEPS.map((step, i) => (
                      <li key={step}>
                        <span className="partner-page__step-num">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <a
                  href={SIGNUP_URL}
                  className="partner-page__explore"
                  rel="noopener noreferrer"
                >
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={1.7} />
                  Explore the live console first
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.06} y={24} className="partner-page__form-col">
              <PartnerForm
                embedded
                source={source}
                competitor={competitor}
                title={headline}
                subtitle="One business day to review. Console opens right after submit."
              />
            </Reveal>
          </div>
        </main>

        <div className="partner-page__footer">
          <SiteFooter compact />
        </div>
      </div>
    </>
  );
}
