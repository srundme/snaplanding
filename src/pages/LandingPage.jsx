import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import ScrollProgress from "../components/ScrollProgress";
import CursorGlow from "../components/CursorGlow";
import LiveTicker from "../components/LiveTicker";
import MemoryArchitecture from "../components/MemoryArchitecture";
import SmartReconnectSection from "../components/SmartReconnectSection";
import IntelligenceSection from "../components/IntelligenceSection";
import Spectrogram from "../components/graphics/Spectrogram";
import Hero from "../components/Hero";
import MemoryCRMSection from "../components/MemoryCRMSection";
import PipelineVisual from "../components/graphics/PipelineVisual";
import MemoryStackVisual from "../components/graphics/MemoryStackVisual";
import WaveformGrid from "../components/graphics/WaveformGrid";
import ComparisonChart from "../components/graphics/ComparisonChart";
import PlatformMockup from "../components/graphics/PlatformMockup";
import GlowButton from "../components/GlowButton";
import SiteFooter from "../components/SiteFooter";
import { Reveal, Stagger, StaggerItem, DrawBorder } from "../components/motion/Reveal";

const insurers = [
  "ICICI Lombard",
  "Care Health",
  "Star Health",
  "A leading health insurer",
];

const features = [
  {
    icon: "</>",
    title: "OpenAI-Compatible Proxy",
    desc: "Drop-in memory injection via REST. No re-architecture required.",
  },
  {
    icon: "⬡",
    title: "Provider-Agnostic",
    desc: "Orchestrate across Sarvam, Cartesia, Bolna, Vapi, Retell, and more.",
  },
  {
    icon: "⚒",
    title: "Latency Instrumentation",
    desc: "Six checkpoints per turn — latency you tune, not tolerate.",
  },
  {
    icon: "↻",
    title: "Smart Reconnect",
    desc: "Network drop? Auto-callback in <1s with full context — no repeated questions.",
  },
];

const comparisonRows = [
  ["Cross-call memory", "✗ Every call starts fresh", "✓ Persistent caller memory"],
  ["Network drop recovery", "✗ Caller must dial back", "✓ Auto-callback in <1s with context"],
  ["Regional languages", "~ Translation bolt-ons", "✓ All major Indian languages"],
  ["Dropped-call recovery", "✗ Restart from zero", "✓ Resume mid-conversation"],
  ["Agent intelligence", "✗ System prompt only", "✓ Memory + intent orchestration"],
  ["Provider lock-in", "✗ Tied to one stack", "✓ Provider-agnostic"],
  ["Indian compliance", "~ Generic", "✓ IRDAI / DPDP / TRAI aligned"],
];

function Cell({ children, className = "", border = true }) {
  return (
    <div className={`p-8 md:p-12 lg:p-14 ${border ? "bento-border border-b" : ""} ${className}`}>
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
        <a href="#" className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M4 10c0-4.5 2.8-8 6-8s6 3.5 6 8" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="10" r="2.5" fill="#FF9933" />
          </svg>
          <span className="text-xs font-bold tracking-[0.12em]">SNAPSERVE</span>
        </a>
        <a href="#cta" className="text-sm text-[#a1a1aa]">Book a demo</a>
      </header>

      <div className="lg:pl-[200px]">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-10">
          <div className="overflow-hidden rounded-3xl border border-[#27272a] bg-black shadow-[0_0_80px_rgba(20,184,166,0.04)]">

            {/* ── HERO ── */}
            <Hero />

            {/* ── LIVE TICKER ── */}
            <LiveTicker />

            {/* ── MEMORY CRM — full product UI ── */}
            <MemoryCRMSection />

            {/* ── STATEMENT ── */}
            <Cell className="bg-[#0a0a0a]">
              <div className="grid gap-10 md:grid-cols-2 md:gap-16">
                <Reveal>
                  <p className="headline-xl text-[#71717a]">
                    Every call should feel like a continuation,
                  </p>
                  <p className="headline-xl mt-1 text-white">
                    not a <span className="brand-gradient-text">cold start.</span>
                  </p>
                </Reveal>
                <Stagger className="space-y-5 body-text">
                  <StaggerItem>
                    <p>
                      We're building the orchestration layer for enterprise voice AI in India —
                      where persistent memory, all regional language support, and
                      provider-agnostic infrastructure aren't features, they're the foundation.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p>
                      SnapServe sits between your voice provider and your agent, injecting
                      caller context transparently into every turn — engineered for the
                      realities of Indian telephony from day one.
                    </p>
                  </StaggerItem>
                </Stagger>
              </div>
            </Cell>

            {/* ── TRUST GRID ── */}
            <div className="bento-border border-b">
              <div className="grid grid-cols-2 md:grid-cols-4">
                <Reveal className="relative col-span-2 row-span-2 bento-border border-b border-r p-8 md:col-span-1 md:row-span-2">
                  <p className="relative z-10 text-sm leading-relaxed text-[#a1a1aa]">
                    Trusted in production across insurance and edutech outbound &amp; inbound campaigns.
                  </p>
                  <div className="absolute inset-0 opacity-20">
                    <Spectrogram animate className="h-full" />
                  </div>
                </Reveal>
                {[...insurers, ...insurers.slice(0, 2)].map((name, i) => (
                  <motion.div
                    key={`${name}-${i}`}
                    className="logo-cell flex min-h-[100px] items-center justify-center bento-border border-b border-r p-6 text-sm font-medium text-[#52525b] last:border-r-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {name}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── TESTIMONIAL ── */}
            <Cell className="bg-black text-center">
              <Reveal>
                <blockquote className="headline-lg mx-auto max-w-3xl">
                  "SnapServe was the breakthrough we needed — callers stopped repeating themselves on call two."
                </blockquote>
                <p className="mt-4 text-sm text-[#71717a]">— Head of Growth, Insurance</p>
              </Reveal>
            </Cell>

            <DrawBorder className="mx-8 md:mx-12" />

            {/* ── SMART RECONNECT (flagship) ── */}
            <SmartReconnectSection />

            {/* ── INTELLIGENCE ── */}
            <IntelligenceSection />

            {/* ── PROBLEM 2×2 ── */}
            <div id="problem" className="bento-border border-b">
              <Reveal className="bento-border border-b px-8 pt-8 md:px-12 md:pt-12">
                <p className="label">The Voice AI Problem</p>
              </Reveal>
              <div className="grid md:grid-cols-2">
                <Cell>
                  <Reveal>
                    <h2 className="headline-lg">Most voice AI forgets the moment the call ends.</h2>
                    <div className="mt-6 space-y-4 body-text">
                      <p>
                        Your customer explained their situation last week. They confirmed their
                        policy number. They told your agent they'd call back after lunch.
                      </p>
                      <p>And then they did — to an agent that knew none of it.</p>
                      <p className="text-white">
                        For high-stakes verticals like insurance, that's not just friction —
                        it's lost conversions and broken trust.
                      </p>
                    </div>
                  </Reveal>
                </Cell>
                <Cell className="p-0 md:border-l md:border-[#27272a]" border={false}>
                  <PipelineVisual />
                </Cell>
                <Cell className="p-0 md:border-r md:border-[#27272a]" border={false}>
                  <WaveformGrid />
                </Cell>
                <Cell id="solution">
                  <Reveal delay={0.1}>
                    <p className="label mb-4">The Solution</p>
                    <h2 className="headline-lg">
                      SnapServe gives your voice agents a <span className="brand-gradient-text">memory.</span>
                    </h2>
                    <div className="mt-6 space-y-4 body-text">
                      <p>
                        Three layers of caller memory — raw transcripts, episode summaries, and
                        extracted facts — injected transparently into every conversation.
                      </p>
                      <p>
                        Provider-agnostic by design. Never locked in.
                      </p>
                    </div>
                  </Reveal>
                </Cell>
              </div>
            </div>

            {/* ── MEMORY ARCHITECTURE (unique section) ── */}
            <MemoryArchitecture />

            {/* ── SOLUTION STACK ── */}
            <div className="grid md:grid-cols-2 bento-border border-b">
              <Cell className="p-0" border={false}>
                <MemoryStackVisual />
              </Cell>
              <Cell className="flex flex-col justify-center md:border-l md:border-[#27272a]">
                <Reveal>
                  <p className="label mb-4">The Solution</p>
                  <h2 className="headline-lg">A Unified Stack For Caller Intelligence</h2>
                  <div className="mt-6 space-y-4 body-text">
                    <p>
                      Three memory layers ensure context isn't lost between calls.
                      OpenAI-compatible proxy. Redis-backed horizontal scale.
                    </p>
                  </div>
                </Reveal>
              </Cell>
            </div>

            {/* ── CHART ── */}
            <Cell>
              <Reveal>
                <h2 className="headline-xl">
                  Memory, Language, Scale. Pick <span className="strike-muted">Two</span>{" "}
                  <span className="brand-gradient-text">Three</span>
                </h2>
                <p className="body-text mt-4 max-w-2xl">
                  SnapServe performs as well as stateless platforms when latency is factored — with persistent caller memory included.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-10">
                <ComparisonChart />
              </Reveal>
            </Cell>

            {/* ── PLATFORM ── */}
            <div id="how-it-works" className="bento-border border-b bg-[#0a0a0a]">
              <Cell className="text-center">
                <Reveal>
                  <h2 className="headline-lg">
                    Ready To Build? Say Hello to the SnapServe Orchestration Layer
                  </h2>
                  <p className="body-text mx-auto mt-4 max-w-2xl">
                    Voice agents that remember every caller — in every regional language,
                    natively, and interact in real time.
                  </p>
                  <div className="mt-6">
                    <GlowButton>Book a demo</GlowButton>
                  </div>
                </Reveal>
              </Cell>
              <Reveal delay={0.1}>
                <Cell border={false}>
                  <div className="float-slow">
                    <PlatformMockup />
                  </div>
                </Cell>
              </Reveal>

              <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 bento-border border-t">
                {features.map((f, i) => (
                  <StaggerItem
                    key={f.title}
                    className={`bento-cell-hover p-8 ${i < features.length - 1 ? "bento-border border-b sm:border-b-0 sm:border-r" : ""}`}
                  >
                    <span className="text-xl text-[#71717a]">{f.icon}</span>
                    <h3 className="mt-4 text-base font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#71717a]">{f.desc}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* ── HOW IT WORKS STEPS ── */}
            <Cell>
              <Reveal><p className="label mb-8">How It Works</p></Reveal>
              {[
                { n: "1", title: "Connect your provider.", desc: "Sarvam, Cartesia, Bolna, Vapi, Retell, and more." },
                { n: "2", title: "Memory injects automatically.", desc: "OpenAI-compatible proxy layers caller memory into every turn." },
                { n: "3", title: "Smart Reconnect handles drops.", desc: "Network lost? SnapServe calls back in <1s, apologizes, and resumes — no repeated questions." },
                { n: "4", title: "Your agents get smarter every call.", desc: "Dispositions feed a training flywheel — performance compounds." },
              ].map((step, i) => (
                <Reveal key={step.n} delay={i * 0.08}>
                  <div className={`grid gap-4 py-8 md:grid-cols-[48px_1fr] ${i < 3 ? "bento-border border-b" : ""}`}>
                    <span className="font-mono text-sm text-[#FF9933]">{step.n}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <p className="body-text mt-2 max-w-2xl">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </Cell>

            {/* ── PRODUCTION ── */}
            <Cell className="bg-black">
              <Reveal>
                <p className="label mb-4">Built for Production, Not Demos</p>
                <h2 className="headline-lg">Engineered for Indian telephony.</h2>
              </Reveal>
              <Stagger className="mt-10 grid gap-px bg-[#27272a] sm:grid-cols-2" stagger={0.08}>
                {[
                  ["Per-turn latency instrumentation", "Six checkpoints per conversation."],
                  ["Regional language endpointing", "Speech patterns for every major Indian language."],
                  ["Alphanumeric capture", '"B for Bombay" works for PAN, Aadhaar.'],
                  ["Horizontal scale", "Redis-backed sessions at any volume."],
                ].map(([title, desc]) => (
                  <StaggerItem key={title} className="bento-cell-hover bg-black p-8">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm text-[#71717a]">{desc}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </Cell>

            {/* ── COMPLIANCE ── */}
            <div id="compliance" className="grid md:grid-cols-2 bento-border border-b">
              <Cell>
                <Reveal>
                  <p className="label mb-4">Compliance First</p>
                  <h2 className="headline-lg">Built for the Indian regulatory environment.</h2>
                  <p className="body-text mt-6">
                    IRDAI · DPDP · TRAI — architected from day one.
                  </p>
                </Reveal>
              </Cell>
              <Cell className="flex flex-col justify-center gap-4 md:border-l md:border-[#27272a]">
                <Stagger className="flex flex-col gap-4" stagger={0.1}>
                  {["IRDAI", "DPDP", "TRAI"].map((fw) => (
                    <StaggerItem key={fw}>
                      <motion.div
                        className="bento-cell-hover flex items-center gap-4 border border-[#27272a] bg-[#0a0a0a] p-5"
                        whileHover={{ borderColor: "rgba(20,184,166,0.4)" }}
                      >
                        <span className="font-mono text-lg font-medium text-white">{fw}</span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Cell>
            </div>

            {/* ── USE CASES ── */}
            <Stagger className="grid md:grid-cols-3 bento-border border-b" stagger={0.1}>
              {[
                ["Insurance", "Renewals, claims, inbound support with policyholder history."],
                ["EdTech", "Admissions and follow-ups in your students' languages."],
                ["Enterprise", "High-volume workflows where context matters."],
              ].map(([title, desc], i) => (
                <StaggerItem
                  key={title}
                  className={`bento-cell-hover p-8 md:p-12 ${i < 2 ? "md:border-r md:border-[#27272a]" : ""}`}
                >
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#71717a]">{desc}</p>
                </StaggerItem>
              ))}
            </Stagger>

            {/* ── COMPARISON TABLE ── */}
            <Cell>
              <Reveal>
                <p className="label mb-4">Why SnapServe</p>
                <h2 className="headline-lg mb-10">Stateless platforms vs. SnapServe</h2>
              </Reveal>
              <div className="overflow-hidden rounded-xl border border-[#27272a]">
                <div className="grid grid-cols-3 border-b border-[#27272a] bg-[#111] text-sm">
                  <div className="p-4" />
                  <div className="bento-border border-l p-4 text-center text-[#71717a]">Stateless</div>
                  <div className="bento-border border-l bg-gradient-to-b from-[#14B8A6]/10 to-transparent p-4 text-center font-medium text-white">SnapServe</div>
                </div>
                {comparisonRows.map(([feature, bad, good], i) => (
                  <motion.div
                    key={feature}
                    className={`grid grid-cols-3 text-sm transition-colors hover:bg-white/[0.02] ${i < comparisonRows.length - 1 ? "border-b border-[#27272a]" : ""}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="p-4 font-medium text-white">{feature}</div>
                    <div className="bento-border border-l p-4 text-[#71717a]">{bad}</div>
                    <div className="bento-border border-l bg-[#14B8A6]/[0.03] p-4 text-[#a1a1aa]">{good}</div>
                  </motion.div>
                ))}
              </div>
            </Cell>

            {/* ── FINAL CTA ── */}
            <Cell id="cta" className="relative overflow-hidden bg-black text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,153,51,0.06)_0%,transparent_60%)]" />
              <Reveal>
                <h2 className="headline-xl relative mx-auto max-w-3xl">
                  Your agents should have a memory.{" "}
                  <span className="brand-gradient-text">And a brain.</span>
                </h2>
                <p className="body-text relative mx-auto mt-6 max-w-xl">
                  See SnapServe auto-reconnect after a network drop, handle every regional language,
                  natively, and never ask the same question twice.
                </p>
                <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                  <GlowButton href="mailto:hello@aitel.in?subject=SnapServe%20Demo">Book a demo</GlowButton>
                  <a href="mailto:founder@aitel.in" className="outline-btn">Talk to the founder</a>
                </div>
              </Reveal>
            </Cell>

            {/* ── FOOTER ── */}
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
