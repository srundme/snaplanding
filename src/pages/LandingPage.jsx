import Sidebar from "../components/Sidebar";
import ScrollProgress from "../components/ScrollProgress";
import CursorGlow from "../components/CursorGlow";
import LiveTicker from "../components/LiveTicker";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import MemoryCRMSection from "../components/MemoryCRMSection";
import SmartReconnectSection from "../components/SmartReconnectSection";
import MemoryArchitecture from "../components/MemoryArchitecture";
import StatsBar from "../components/StatsBar";
import PlatformSection from "../components/PlatformSection";
import IndustriesSection from "../components/IndustriesSection";
import PricingSection from "../components/PricingSection";
import GlowButton from "../components/GlowButton";
import { SIGNUP_URL } from "../lib/links";
import SiteFooter from "../components/SiteFooter";
import SnapServeLogo from "../components/SnapServeLogo";
import { Reveal, DrawBorder } from "../components/motion/Reveal";

function Cell({ children, className = "", border = true, id }) {
  return (
    <div
      id={id}
      className={`p-8 md:p-12 lg:p-14 ${border ? "bento-border border-b" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="dot-bg min-h-screen">
      <CursorGlow />
      <ScrollProgress />
      <Sidebar />

      <header className="flex items-center justify-between border-b border-[#27272a] px-6 py-4 lg:hidden">
        <SnapServeLogo variant="full" size="sm" theme="dark" asLink href="/" />
        <a
          href={SIGNUP_URL}
          className="text-sm font-medium text-[#14B8A6]"
          rel="noopener noreferrer"
        >
          Get started
        </a>
      </header>

      <div className="lg:pl-[200px]">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-10">
          <div className="overflow-hidden rounded-3xl border border-[#27272a] bg-black shadow-[0_0_80px_rgba(20,184,166,0.04)]">
            <Hero />
            <LiveTicker />

            <FeaturesSection />
            <DrawBorder className="mx-8 md:mx-12" />

            <MemoryCRMSection />
            <SmartReconnectSection />

            <MemoryArchitecture />
            <StatsBar />

            <DrawBorder className="mx-8 md:mx-12" />

            <PlatformSection />
            <IndustriesSection />
            <PricingSection />

            <Cell id="cta" className="relative overflow-hidden bg-black text-center" border={false}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,153,51,0.06)_0%,transparent_60%)]" />
              <Reveal>
                <h2 className="headline-xl relative mx-auto max-w-2xl">
                  Start orchestrating{" "}
                  <span className="brand-gradient-text">voice AI.</span>
                </h2>
                <p className="body-text relative mx-auto mt-5 max-w-lg">
                  Memory, campaigns, and scheduling — on the orchestration layer built
                  for Indian business.
                </p>
                <div className="relative mt-8 flex flex-col items-center gap-3">
                  <GlowButton href={SIGNUP_URL} hoverText="Get started →">
                    Get started
                  </GlowButton>
                  <p className="font-mono text-[10px] text-[#52525b]">
                    Provider-agnostic · Every Indian language · $5 free credit
                  </p>
                </div>
              </Reveal>
            </Cell>

            <Cell border={false} className="bg-[#0a0a0a] p-0">
              <div className="p-8 md:p-12 lg:p-14">
                <SiteFooter />
              </div>
            </Cell>
          </div>
        </div>
      </div>
    </div>
  );
}
