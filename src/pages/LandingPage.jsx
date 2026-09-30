import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import ScrollProgress from "../components/ScrollProgress";
import ProofStrip from "../components/ProofStrip";
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
import { Link } from "react-router-dom";
import { SIGNUP_URL, PARTNER_URL } from "../lib/links";
import { MOBILE_NAV } from "../lib/nav";
import { homepageFaqs } from "../data/keywords";
import { buildHomeGraph } from "../lib/seo";

/*
  Spine (first-visit story):
  Hero → Proof → Platform → Core capabilities → Integrations →
  Industries → Trust → Workflow → Pricing → Answers → CTA
*/
const mobileNav = MOBILE_NAV;

export default function LandingPage() {
  const [showSidebar, setShowSidebar] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false,
  );

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setShowSidebar(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // FAQ schema must match the visible Answers section.
  const jsonLd = useMemo(() => [buildHomeGraph(homepageFaqs)], []);

  return (
    <div className="dot-bg relative min-h-screen">
      <Seo pathname="/" jsonLd={jsonLd} />
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[200] rounded-md bg-surface-1 px-4 py-2 text-sm text-ink focus:not-sr-only"
      >
        Skip to content
      </a>

      <FreeMinutesPopup />
      <ScrollProgress />
      {showSidebar ? <Sidebar /> : null}

      <header className="sticky top-0 z-40 border-b border-line bg-surface-0/85 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-3.5">
          <SnapServeLogo variant="full" size="sm" asLink href="/" />
          <div className="flex items-center gap-2">
            <Link
              to={PARTNER_URL}
              className="hidden rounded-full border border-line px-3 py-1.5 text-xs text-ink-2 transition-colors hover:text-ink sm:inline-flex"
            >
              Partner with us
            </Link>
            <a
              href={SIGNUP_URL}
              className="rounded-full border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-3.5 py-1.5 text-xs font-medium text-[#14B8A6]"
              rel="noopener noreferrer"
            >
              Start free
            </a>
          </div>
        </div>
        <nav
          aria-label="Page sections"
          className="flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {mobileNav.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.href}
                to={item.href}
                className="inline-flex min-h-11 shrink-0 items-center px-2 text-xs text-ink-2 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 shrink-0 items-center px-2 text-xs text-ink-2 transition-colors hover:text-ink"
                {...(item.external ? { rel: "noopener noreferrer" } : {})}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
      </header>

      <main id="main-content" className="relative z-10 lg:pl-[200px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="overflow-clip bg-surface-0">
            <Hero />
            <ProofStrip />
            <FeaturesSection />
            <MeetingBotSection />
            <MemoryCRMSection />
            <SmartReconnectSection />
            <IntegrationsSection />
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
                  src="/images/section-atmosphere.webp"
                  alt=""
                  width={1280}
                  height={854}
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="cta-veil pointer-events-none absolute inset-0" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(20,184,166,0.12)_0%,transparent_70%)]" />
              <Reveal>
                <p className="label relative text-ink-3">Ready to launch?</p>
                <h2 className="headline-xl relative mx-auto mt-4 max-w-2xl">
                  Put SnapServe on{" "}
                  <span className="brand-gradient-text">every important call.</span>
                </h2>
                <p className="body-text relative mx-auto mt-4 max-w-lg">
                  Connect your providers, configure an agent, and test the workflow in the live console.
                </p>
                <div className="relative mt-8 flex flex-col items-center gap-3">
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <GlowButton href={SIGNUP_URL} hoverText="Start free →">
                      Start free
                    </GlowButton>
                    <Link
                      to={PARTNER_URL}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-line px-6 text-[14px] font-medium tracking-[-0.014em] text-ink-2 transition-colors hover:border-[#14B8A6]/30 hover:text-ink"
                    >
                      Partner with us
                    </Link>
                  </div>
                  <p className="text-[12px] text-ink-3">
                    Usage pricing · Bring your providers · Managed option available
                  </p>
                </div>
              </Reveal>
            </section>

            <div className="border-t border-line bg-surface-0 px-6 py-10 md:px-14 md:py-12">
              <SiteFooter />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
