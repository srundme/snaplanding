import { useMemo } from "react";
import Sidebar from "../components/Sidebar";
import ScrollProgress from "../components/ScrollProgress";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import MemoryCRMSection from "../components/MemoryCRMSection";
import SmartReconnectSection from "../components/SmartReconnectSection";
import MeetingBotSection from "../components/MeetingBotSection";
import IndustriesSection from "../components/IndustriesSection";
import IntegrationsSection from "../components/IntegrationsSection";
import MemoryArchitecture from "../components/MemoryArchitecture";
import TrustSecuritySection from "../components/TrustSecuritySection";
import AnswersSection from "../components/AnswersSection";
import PricingSection from "../components/PricingSection";
import Seo from "../components/Seo";
import GlowButton from "../components/GlowButton";
import SiteFooter from "../components/SiteFooter";
import FreeMinutesPopup from "../components/FreeMinutesPopup";
import SnapServeLogo from "../components/SnapServeLogo";
import { Reveal } from "../components/motion/Reveal";
import { SIGNUP_URL } from "../lib/links";
import { homepageFaqs } from "../data/keywords";
import { buildHomeGraph } from "../lib/seo";

/*
  Spine:
  Hero → Product → Meetings → Memory → Integrations → Auto-redial →
  Industries → Trust → How it works → Pricing → Answers → CTA
*/
const mobileNav = [
  { label: "Product", href: "#differentiator" },
  { label: "Meetings", href: "#meeting-bot" },
  { label: "Memory", href: "#memory-crm" },
  { label: "Pricing", href: "#pricing" },
];

export default function LandingPage() {
  // FAQ schema must match the visible Answers section (first 6).
  const jsonLd = useMemo(() => [buildHomeGraph(homepageFaqs.slice(0, 6))], []);

  return (
    <div className="dot-bg relative min-h-screen">
      <Seo pathname="/" jsonLd={jsonLd} />

      <FreeMinutesPopup />
      <ScrollProgress />
      <Sidebar />

      <header className="sticky top-0 z-40 border-b border-line bg-surface-0/85 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-5 py-3.5">
          <SnapServeLogo variant="full" size="sm" asLink href="/" />
          <a
            href={SIGNUP_URL}
            className="rounded-full border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-3.5 py-1.5 text-xs font-medium text-[#14B8A6]"
            rel="noopener noreferrer"
          >
            Get started
          </a>
        </div>
        <nav className="flex gap-5 overflow-x-auto px-5 pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobileNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 text-xs text-ink-2 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="relative z-10 lg:pl-[200px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="overflow-clip bg-surface-0">
            <Hero />
            <FeaturesSection />
            <MeetingBotSection />
            <MemoryCRMSection />
            <IntegrationsSection />
            <SmartReconnectSection />
            <IndustriesSection />
            <TrustSecuritySection />
            <MemoryArchitecture />
            <PricingSection />
            <AnswersSection />

            <section
              id="cta"
              className="relative overflow-hidden bg-surface-0 px-6 py-14 text-center md:px-12 md:py-16"
            >
              <div className="cta-photo" aria-hidden="true">
                <img
                  src="/images/section-atmosphere.png"
                  alt=""
                  width={1920}
                  height={1080}
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="cta-veil pointer-events-none absolute inset-0" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(20,184,166,0.12)_0%,transparent_70%)]" />
              <Reveal>
                <p className="label relative text-ink-3">Start with $5 credit</p>
                <h2 className="headline-xl relative mx-auto mt-4 max-w-2xl">
                  Put SnapServe on{" "}
                  <span className="brand-gradient-text">every important call.</span>
                </h2>
                <p className="body-text relative mx-auto mt-4 max-w-lg">
                  $5 free credit. Caller memory, auto-redial, and meeting bots
                  included on every dial.
                </p>
                <div className="relative mt-8 flex flex-col items-center gap-3">
                  <GlowButton href={SIGNUP_URL} hoverText="Get started →">
                    Get started free
                  </GlowButton>
                  <p className="text-[12px] text-ink-3">
                    Pay per minute · BYOP or managed · Open live console
                  </p>
                </div>
              </Reveal>
            </section>

            <div className="border-t border-line bg-surface-0 px-6 py-10 md:px-14 md:py-12">
              <SiteFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
