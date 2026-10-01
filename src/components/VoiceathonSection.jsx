import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Award,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Quote,
  ChevronLeft,
  ChevronRight,
  Radio,
  Calendar,
  MapPin,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

const JUDGES = [
  {
    id: "haarishkumar",
    name: "Haarishkumar Bhaskar",
    title: "Founder",
    company: "FounderEdge",
    image: "/images/voiceathon/haarishkumar.png",
    badge: "FounderEdge",
    alum: "AI Product Dev · RAIDO",
    focus: "GenAI Product Innovation",
    quote:
      "The rapid experimentation on display was incredible. Builders took raw speech models and turned them into commercially viable, empathetic voice products ready for real customers.",
    credentials:
      "Founder at FounderEdge and AI Product Developer at RAIDO specializing in Generative AI, autonomous agent products, and rapidly transforming early-stage prototypes into scalable market solutions.",
    tags: ["Generative AI", "AI Agents", "Product Innovation", "Startup Growth"],
    linkedin: "https://www.linkedin.com/in/haarishkumar-kathavarayan-bhaskar-11b9b2249",
  },
  {
    id: "dharun",
    name: "Dharun Jayakrishnan",
    title: "Co-Founder & CTO",
    company: "ZenXai & ZenVoice",
    image: "/images/voiceathon/dharun.png",
    badge: "Agentic AI Pioneer",
    alum: "Sri Shakthi Institute Alum",
    focus: "Agentic Workflows & Tool Execution",
    quote:
      "The next era of voice isn't simple scripted chatbots. It is autonomous multi-step execution — querying live databases, managing CRM updates, and handling mid-call interruptions seamlessly.",
    credentials:
      "Pioneering autonomous AI agent pipelines, multi-modal voice automation, n8n cloud infrastructure, and low-latency API orchestration.",
    tags: ["Agentic AI", "Voice Pipelines", "n8n Cloud Automation", "API Orchestration"],
    linkedin: "https://www.linkedin.com/in/dharun-jayakrishnan",
  },
  {
    id: "bharanidharan",
    name: "Bharanidharan N., PMP",
    title: "Chief Information Officer",
    company: "ProConnect Supply Chain Solutions Ltd",
    image: "/images/voiceathon/bharanidharan.png",
    badge: "Innovative CIO 2024",
    alum: "BITS Pilani Alum",
    focus: "Enterprise Scale & Reliability",
    quote:
      "In enterprise logistics and mission-critical workflows, latency and accuracy are non-negotiable. Voice-A-Thon set an uncompromising standard for sub-second agent responses and stateful caller recovery.",
    credentials:
      "20+ years enterprise IT leadership. Formerly VP of Enterprise Applications at Redington India, Account Delivery Manager at DXC Germany, and Head of Development Factory at HPE.",
    tags: ["Enterprise IT", "PMP & ITIL", "Supply Chain Systems", "Delivery Management"],
    linkedin: "https://www.linkedin.com/in/bharanidharan-n-pmp-59393414",
  },
  {
    id: "kannan",
    name: "Kannan Ganesan",
    title: "Co-Founder & CTO",
    company: "Smartail",
    image: "/images/voiceathon/kannan.png",
    badge: "Ex-VP JPMorgan Chase",
    alum: "19+ Yrs IT Leadership",
    focus: "Distributed Cloud & Microservices",
    quote:
      "Evaluating these live pipelines showed how close we are to truly frictionless vernacular voice. The architectural resilience and streaming response speeds were world-class.",
    credentials:
      "~19 years engineering leadership. Former Vice President at JPMorgan Chase's India entity and Senior Software Engineer at JPMorgan Chase & Co. Specializes in AI/ML EdTech and microservices.",
    tags: ["Cloud Microservices", "Ex-JPMorgan Chase", "AI/ML Systems", "Distributed Tech"],
    linkedin: null,
  },
  {
    id: "prasath",
    name: "Prasath Sekar",
    title: "Product Manager",
    company: "TeleCMI",
    image: "/images/voiceathon/prasath.png",
    badge: "11+ Yrs Telephony Veteran",
    alum: "DevOps & Product Lead",
    focus: "Telephony SDKs & Call Telemetry",
    quote:
      "As someone in core telephony infrastructure every day, seeing voice agents gracefully manage SIP handoffs, CRM webhook dispatches, and diverse Indian accents in real-time was remarkable.",
    credentials:
      "Senior telephony product leader with 11+ years across cloud communications, CRM telephony SDK adoption, and conversational voice agent production systems.",
    tags: ["CRM Telephony", "Voice Agents", "SalesOS & SDKs", "Telephony Infrastructure"],
    linkedin: "https://www.linkedin.com/in/prasath-sekar",
  },
];

const METRICS = [
  { label: "Competition Scale", value: "50+ Teams", sub: "Engineers & Researchers" },
  { label: "Grand Prize Pool", value: "₹1,00,000", sub: "Cash Grants & Cloud Credits" },
  { label: "Live Acoustic Benchmark", value: "< 350 ms", sub: "Turn-taking latency threshold" },
  { label: "Evaluation Jury", value: "5 Leaders", sub: "Enterprise CIOs & AI CTOs" },
];

export default function VoiceathonSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeJudge = JUDGES[activeIdx];

  const nextJudge = () => setActiveIdx((prev) => (prev + 1) % JUDGES.length);
  const prevJudge = () => setActiveIdx((prev) => (prev - 1 + JUDGES.length) % JUDGES.length);

  return (
    <section
      id="voiceathon"
      className="relative overflow-hidden border-b border-line bg-[#09090b] px-6 py-20 scroll-mt-12 md:px-14 md:py-28 md:scroll-mt-16"
      aria-label="Event Spotlight: Voice-A-Thon 2026"
    >
      {/* Concentric Acoustic Glow Rings (Bolna & Silicon Valley Keynote Style) */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.16)_0%,rgba(14,165,233,0.06)_45%,transparent_75%)] blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#14B8A6]/[0.05] blur-[130px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        {/* Header Bar */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SectionLabel icon={Trophy}>Event Spotlight</SectionLabel>
              <span className="hidden h-4 w-[1px] bg-line sm:inline-block" />
              <div className="inline-flex items-center gap-2 text-xs text-ink-3">
                <Calendar className="h-3.5 w-3.5 text-[#14B8A6]" />
                <span>Held September 5</span>
                <span>·</span>
                <MapPin className="h-3.5 w-3.5 text-[#14B8A6]" />
                <span>Chennai & Bengaluru</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#14B8A6] shadow-[0_0_20px_rgba(20,184,166,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#14B8A6] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14B8A6]" />
              </span>
              Voice-A-Thon 2026 · Grand Finale Showcase
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 className="text-[32px] font-extrabold tracking-[-0.03em] text-white sm:text-[44px] lg:text-[48px] lg:leading-[1.12]">
                Where India&apos;s elite builders architected the{" "}
                <span className="brand-gradient-text">future of Conversational Voice AI.</span>
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#a1a1aa] md:text-[17px]">
                Voice-A-Thon 2026 convened top software engineers, AI researchers, and startup founders to push the boundaries of sub-350ms latency, multi-dialect Indian telephony, and autonomous voice workflows. Scored live by enterprise CIOs and engineering pioneers.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Link
                to="/voice-a-thon"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-[#14B8A6] bg-[#14B8A6] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-[#14B8A6]/90 hover:shadow-[0_0_30px_rgba(20,184,166,0.35)] sm:text-sm"
              >
                <span>Explore Full Event & Jury</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Key Metrics Banner */}
        <Reveal delay={0.03} className="mt-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {METRICS.map((stat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-line bg-surface-1/70 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#14B8A6]/50 hover:bg-surface-1"
              >
                <div className="text-[11px] font-medium tracking-wider uppercase text-ink-3">
                  {stat.label}
                </div>
                <div className="mt-2 text-[24px] font-bold tracking-[-0.025em] text-white sm:text-[26px]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[12px] font-medium text-[#14B8A6]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Main Interactive Stage Spotlight */}
        <Reveal delay={0.06} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-gradient-to-b from-[#121215] via-[#0d0d10] to-[#09090b] p-6 shadow-2xl backdrop-blur-xl md:p-10">
            {/* Ambient Spotlight Beam */}
            <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.18)_0%,transparent_70%)] blur-[90px]" />

            {/* Top Stage Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#14B8A6]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-3">
                  Grand Jury Spotlight
                </span>
                <span className="text-ink-3">·</span>
                <span className="text-xs font-semibold text-[#14B8A6]">
                  {activeJudge.focus}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-ink-3">
                <span className="font-mono">
                  {String(activeIdx + 1).padStart(2, "0")} / {String(JUDGES.length).padStart(2, "0")} Leaders
                </span>
                <div className="flex gap-1.5 ml-1">
                  {JUDGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeIdx ? "w-6 bg-[#14B8A6]" : "w-1.5 bg-line-strong hover:bg-ink-3"
                      }`}
                      aria-label={`Go to judge ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Stage Core: Split View */}
            <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Content Column */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-[#14B8A6]/40 bg-[#14B8A6]/15 px-2.5 py-1 text-xs font-semibold text-[#14B8A6]">
                      <Award className="h-3.5 w-3.5" />
                      {activeJudge.badge}
                    </span>
                    <span className="rounded-md border border-line bg-surface-0 px-2.5 py-1 text-xs font-medium text-ink-3">
                      {activeJudge.alum}
                    </span>
                  </div>

                  {/* Name & Title */}
                  <div className="mt-4">
                    <h3 className="text-[26px] font-extrabold tracking-tight text-white sm:text-[32px]">
                      {activeJudge.name}
                    </h3>
                    <p className="mt-1 text-[15px] font-medium text-ink-2">
                      {activeJudge.title} ·{" "}
                      <span className="font-semibold text-[#14B8A6]">{activeJudge.company}</span>
                    </p>
                  </div>

                  {/* Quote Banner */}
                  <div className="relative mt-6 rounded-2xl border border-line bg-surface-0/80 p-5 backdrop-blur-sm">
                    <Quote className="h-5 w-5 text-[#14B8A6]/40" />
                    <p className="mt-2 text-[14.5px] italic leading-relaxed text-ink-2">
                      &ldquo;{activeJudge.quote}&rdquo;
                    </p>
                  </div>

                  {/* Credentials snippet */}
                  <div className="mt-5 space-y-2">
                    <div className="flex items-start gap-2.5 text-xs text-ink-2">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-[#14B8A6] mt-0.5" />
                      <span className="leading-relaxed">{activeJudge.credentials}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {activeJudge.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-line bg-surface-1 px-2.5 py-1 font-mono text-[11px] text-ink-3"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social & Next Link */}
                <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line/60 pt-6">
                  {activeJudge.linkedin && (
                    <a
                      href={activeJudge.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-0 px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-[#14B8A6] hover:text-[#14B8A6]"
                      aria-label={`${activeJudge.name} LinkedIn Profile`}
                    >
                      <FaLinkedin className="h-3.5 w-3.5" />
                      <span>Verified Profile</span>
                    </a>
                  )}

                  <Link
                    to="/voice-a-thon"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14B8A6] hover:underline"
                  >
                    <span>Full summit archive & prizes</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Visual Spotlight Card */}
              <div className="relative flex justify-center lg:col-span-5">
                <div className="relative h-[360px] w-full max-w-[340px] overflow-hidden rounded-3xl border border-[#27272a] bg-gradient-to-b from-[#18181b] to-[#09090b] shadow-2xl transition-all duration-500 group-hover:border-[#14B8A6]/60 sm:h-[400px]">
                  {/* Subtle Aura Halo */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.18)_0%,transparent_75%)]" />

                  {/* High Quality Cutout Image */}
                  <div className="relative h-full w-full p-4 flex items-end justify-center">
                    <img
                      key={activeJudge.id}
                      src={activeJudge.image}
                      alt={activeJudge.name}
                      width={340}
                      height={400}
                      className="h-full w-full object-contain object-bottom transition-all duration-700 animate-fadeIn"
                    />
                  </div>

                  {/* Card Bottom Tag */}
                  <div className="pointer-events-none absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-10">
                    <div>
                      <div className="font-bold text-white">{activeJudge.name}</div>
                      <div className="text-[11px] text-[#14B8A6] font-medium">{activeJudge.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick-switch Judge Thumbnails Tray */}
            <div className="mt-8 border-t border-line/60 pt-6">
              <div className="flex items-center justify-between mb-3 text-xs text-ink-3">
                <span className="font-medium">The 5 Grand Jury Leaders:</span>
                <span className="text-[11px]">Click to view bio</span>
              </div>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {JUDGES.map((judge, idx) => (
                  <button
                    key={judge.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`group relative flex flex-col items-center gap-1.5 rounded-xl border p-2 text-left transition-all duration-300 ${
                      idx === activeIdx
                        ? "border-[#14B8A6] bg-[#14B8A6]/10 shadow-[0_0_15px_rgba(20,184,166,0.2)]"
                        : "border-line bg-surface-0/60 hover:border-line-strong hover:bg-surface-1"
                    }`}
                  >
                    <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-line bg-black/40 sm:h-12 sm:w-12">
                      <img
                        src={judge.image}
                        alt={judge.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <span className="truncate text-center text-[10px] sm:text-[11px] font-semibold text-white max-w-full">
                      {judge.name.split(" ")[0]}
                    </span>
                    <span className="hidden sm:block truncate text-center text-[9px] text-ink-3 max-w-full">
                      {judge.company.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Banner: Direct Link to Dedicated URL */}
        <Reveal delay={0.08} className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-surface-1/40 p-5 sm:flex-row sm:p-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#14B8A6]/10 text-[#14B8A6]">
                <Radio className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Want to explore the complete Voice-A-Thon 2026 Archive?
                </h4>
                <p className="text-xs text-ink-3">
                  Read challenge tracks, prize breakdowns, live telemetry benchmarks, and keynote summaries on the dedicated page.
                </p>
              </div>
            </div>

            <Link
              to="/voice-a-thon"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#14B8A6]/50 bg-[#14B8A6]/10 px-4 py-2 text-xs font-semibold text-[#14B8A6] transition-all hover:border-[#14B8A6] hover:bg-[#14B8A6]/20"
            >
              <span>Open Dedicated Page (/voice-a-thon)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
