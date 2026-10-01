import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  ArrowLeft,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Code2,
  Mic,
  Shield,
  Radio,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import Seo from "../components/Seo";
import SiteFooter from "../components/SiteFooter";
import SnapServeLogo from "../components/SnapServeLogo";
import { SIGNUP_URL, PARTNER_URL } from "../lib/links";

const JUDGES = [
  {
    id: "haarishkumar",
    name: "Haarishkumar Bhaskar",
    title: "Founder",
    company: "FounderEdge",
    image: "/images/voiceathon/haarishkumar.png",
    badge: "FounderEdge",
    alum: "AI Product Dev · RAIDO",
    track: "GenAI Product Innovation & Autonomous Agents",
    quote:
      "The rapid experimentation on display was incredible. Builders took raw speech models and turned them into commercially viable, empathetic voice products ready for real customers. That founder edge is what moves industries forward.",
    bio: "Founder at FounderEdge and AI Product Developer at RAIDO. Building next-generation AI-driven software with deep expertise in Generative AI, autonomous agents, and turning technical prototypes into scalable market solutions.",
    credentials: [
      "Founder at FounderEdge",
      "AI Product Developer at RAIDO",
      "Generative AI & Agentic Product Innovation Lead",
      "Rapid Prototype to Enterprise Scale Specialization",
    ],
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
    track: "Autonomous Agent Workflows & API Orchestration",
    quote:
      "The next era of voice isn't simple scripted chatbots. It is autonomous multi-step execution — querying live databases, managing CRM updates, and handling mid-call interruptions seamlessly without losing conversational momentum.",
    bio: "Leading engineer and founder building autonomous AI agent architectures, real-time voice automation pipelines, n8n cloud automation, and multi-modal telephony integrations for global businesses.",
    credentials: [
      "Agentic AI Architecture Specialist",
      "Real-Time SIP Audio Pipeline Architect",
      "n8n Cloud Automation & Tool Orchestrator",
    ],
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
    track: "Enterprise Architecture & Mission-Critical Reliability",
    quote:
      "In enterprise logistics and mission-critical workflows, latency and accuracy are non-negotiable. Voice-A-Thon set an uncompromising standard for sub-second agent responses, zero dropped state, and bulletproof telephony integration.",
    bio: "20+ years of enterprise IT leadership. Formerly VP of Enterprise Applications at Redington India, Account Delivery Manager at DXC Technology (Germany), and Head of Development Factory at HPE managing multi-million-dollar offshore operations.",
    credentials: [
      "Certified PMP, ISO 9001 & ITIL V2 Lead",
      "Former VP of Enterprise Apps, Redington India",
      "Former Head of Development Factory, HPE",
    ],
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
    track: "Distributed Cloud Microservices & Scalability",
    quote:
      "Evaluating these live pipelines showed how close we are to truly frictionless vernacular voice. The architectural resilience, distributed streaming response speeds, and concurrency handling were world-class.",
    bio: "~19 years in IT engineering leadership. Former Vice President at JPMorgan Chase's India entity, and 6 years as Senior Software Development Engineer at JPMorgan Chase & Co., specializing in distributed systems, microservices, and AI/ML EdTech.",
    credentials: [
      "Former Vice President at JPMorgan Chase (India)",
      "Senior Software Development Engineer (JPMorgan Chase & Co.)",
      "Distributed Cloud Architecture & AI/ML EdTech",
    ],
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
    alum: "GKM College of Engineering",
    track: "CRM Telephony SDKs & Conversational Call Flow",
    quote:
      "As someone in core telephony infrastructure every day, seeing voice agents gracefully manage SIP handoffs, CRM webhook dispatches, and diverse Indian accents in real-time was remarkable.",
    bio: "Senior product leader with 11+ years in telephony infrastructure, cloud communications, and conversational AI. Deeply experienced in CRM telephony SDK adoption, voice agent routing, and SalesOS platforms.",
    credentials: [
      "CRM Telephony SDK Expert with 11+ Yrs Experience",
      "Product & DevOps Leader at TeleCMI",
      "Specialist in Low-Latency Voice Gateways",
    ],
    tags: ["CRM Telephony", "Voice Agents", "SalesOS & SDKs", "Telephony Infrastructure"],
    linkedin: "https://www.linkedin.com/in/prasath-sekar",
  },
];


const AGENDA = [
  { time: "09:00 AM", title: "Keynote & Problem Statements", desc: "Opening address, live call demo architecture, and challenge tracks unveiled." },
  { time: "10:00 AM", title: "Hacking Commences", desc: "Teams integrate Twilio/Vobiz SIP trunks, Sarvam/Deepgram STT, and SnapServe runtime." },
  { time: "01:00 PM", title: "Technical Mentor Rounds", desc: "1-on-1 architecture feedback with industry CTOs and telephony engineers." },
  { time: "03:30 PM", title: "Code Freeze & Pre-Screening", desc: "Live latency benchmarking and automated conversational stress tests." },
  { time: "04:30 PM", title: "Grand Finale Live Stage Demos", desc: "Top finalist teams demonstrate live inbound and outbound calls before the jury." },
  { time: "05:30 PM", title: "Jury Deliberation & Awards Ceremony", desc: "Announcement of winners, ₹1,00,000 prize distribution, and pilot onboarding." },
  { time: "06:00 PM", title: "Summit Adjourns & Enterprise Mixer", desc: "Closing remarks, networking with enterprise CIOs/CTOs, and celebratory reception." },
];

const PRIZES = [
  {
    rank: "Grand Champion",
    title: "1st Place Winner",
    amount: "₹50,000",
    badge: "Champion",
    perks: "Cash Grant + Enterprise Pilot Contract + $5,000 SnapServe API Credits",
    featured: true,
  },
  {
    rank: "First Runner-up",
    title: "2nd Place Winner",
    amount: "₹30,000",
    badge: "Runner Up",
    perks: "Cash Grant + Dedicated Architecture Mentorship + $2,500 SnapServe API Credits",
    featured: false,
  },
  {
    rank: "Special Track Award",
    title: "Best Vernacular Voice Agent",
    amount: "₹20,000",
    badge: "Vernacular Excellence",
    perks: "Special Category Prize for Outstanding Tanglish / Hinglish Conversational Fluidity",
    featured: false,
  },
];

export default function VoiceathonPage() {
  const [selectedJudgeIdx, setSelectedJudgeIdx] = useState(0);
  const selectedJudge = JUDGES[selectedJudgeIdx];

  const nextJudge = () => setSelectedJudgeIdx((prev) => (prev + 1) % JUDGES.length);
  const prevJudge = () => setSelectedJudgeIdx((prev) => (prev - 1 + JUDGES.length) % JUDGES.length);

  // Keyboard navigation for desktop users
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextJudge();
      if (e.key === "ArrowLeft") prevJudge();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState(null);
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (diff > 45) nextJudge();
    else if (diff < -45) prevJudge();
    setTouchStartX(null);
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#fafafa] selection:bg-[#14B8A6] selection:text-black">
      <Seo
        title="Voice-A-Thon 2026 | India's Flagship Voice AI Hackathon | SnapServe"
        description="Explore the Grand Jury, live telephony benchmarks, challenge tracks, and winners of Voice-A-Thon 2026 — India's premier Voice AI summit powered by SnapServe."
        pathname="/voiceathon"
        keywords={[
          "voiceathon 2026",
          "voice ai hackathon",
          "snapserve voiceathon",
          "voice agent summit india",
          "indian speech ai hackathon",
          "bharanidharan proconnect",
          "dharun zenxai",
          "kannan smartail",
          "prasath telecmi",
          "haarishkumar founderedge",
          "haarishkumar raido",
        ]}
      />

      {/* ------------------------------------------------------------------ */}
      {/* 1. CINEMATIC BACKGROUND: CONCENTRIC ACOUSTIC RESONATORS & SPOTLIGHT */}
      {/* ------------------------------------------------------------------ */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {/* Top-down Stage Spotlight Beam */}
        <div className="absolute -top-32 left-1/2 h-[45rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.18)_0%,rgba(56,189,248,0.06)_40%,transparent_75%)] blur-[120px]" />

        {/* Concentric Acoustic Rings (Bolna Symphony Style) */}
        <div className="absolute -top-48 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full border border-[#14B8A6]/10 opacity-60" />
        <div className="absolute -top-36 left-1/2 h-[750px] w-[750px] -translate-x-1/2 rounded-full border border-[#14B8A6]/15 opacity-50" />
        <div className="absolute -top-24 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full border border-[#14B8A6]/20 opacity-40" />

        {/* Ambient Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. TOP CONFERENCE NAVBAR                                           */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-50 border-b border-[#27272a]/80 bg-[#070709]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#121215] px-3.5 py-1.5 text-xs font-medium text-[#a1a1aa] transition-colors hover:border-[#14B8A6]/50 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="h-4 w-[1px] bg-[#27272a]" />
            <SnapServeLogo variant="full" size="sm" asLink href="/" />
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={PARTNER_URL}
              className="hidden rounded-full border border-[#27272a] px-3.5 py-1.5 text-xs text-[#a1a1aa] transition-colors hover:text-white md:inline-flex"
            >
              Partner with us
            </Link>
            <a
              href={SIGNUP_URL}
              className="rounded-full bg-[#14B8A6] px-4 py-1.5 text-xs font-bold text-black transition-all hover:bg-[#14B8A6]/90 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
              rel="noopener noreferrer"
            >
              Start Free
            </a>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* 3. HERO: KEYNOTE SUMMIT & HOLOGRAPHIC VIP PASS                     */}
      {/* ------------------------------------------------------------------ */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-5 pb-20 md:pt-8 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#121215]/80 px-3.5 py-1.5 text-xs font-medium text-[#a1a1aa] backdrop-blur-sm">
                <Calendar className="h-3.5 w-3.5 text-[#14B8A6]" />
                05 September 2026
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#121215]/80 px-3.5 py-1.5 text-xs font-medium text-[#a1a1aa] backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5 text-[#14B8A6]" />
                Chennai
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-3.5 text-xs text-[#a1a1aa]">
              <span className="inline-flex items-center rounded-md bg-[#14B8A6]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#14B8A6]">
                Build The Voice of India
              </span>
              <span className="text-[#3f3f46]">·</span>
              <span className="text-xs text-[#71717a]">
                Powered by <strong className="font-semibold text-white">vobiz</strong>
              </span>
              <span className="text-[#3f3f46]">·</span>
              <span className="text-xs text-[#71717a]">
                Organized by <strong className="font-semibold text-white">SnapServe</strong>
              </span>
            </div>

            <h1 className="mt-6 text-[38px] font-extrabold tracking-[-0.035em] text-white sm:text-[54px] lg:text-[60px] lg:leading-[1.08]">
              Architecting the future of{" "}
              <span className="brand-gradient-text">Conversational Voice AI.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#a1a1aa] md:text-[18px]">
              Held on September 5, 2026 in Chennai, Voice-A-Thon brought together over 50+ teams to build production-grade, low-latency voice agents for the Indian enterprise. Scored live on real telephony pipelines by executive CIOs and engineering pioneers.
            </p>

            {/* Quick Stats Grid */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-[#27272a] bg-[#121215]/80 p-4 backdrop-blur-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Teams</span>
                <div className="mt-1 text-2xl font-bold text-white">50+</div>
                <p className="text-[11px] text-[#14B8A6]">Top Teams</p>
              </div>
              <div className="rounded-2xl border border-[#27272a] bg-[#121215]/80 p-4 backdrop-blur-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Prize Pool</span>
                <div className="mt-1 text-2xl font-bold text-white">₹1,00,000</div>
                <p className="text-[11px] text-[#14B8A6]">Grants & Credits</p>
              </div>
              <div className="rounded-2xl border border-[#27272a] bg-[#121215]/80 p-4 backdrop-blur-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Live Pipeline</span>
                <div className="mt-1 text-2xl font-bold text-white">Live AI</div>
                <p className="text-[11px] text-[#14B8A6]">Vernacular Agents</p>
              </div>
              <div className="rounded-2xl border border-[#27272a] bg-[#121215]/80 p-4 backdrop-blur-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Grand Jury</span>
                <div className="mt-1 text-2xl font-bold text-white">5 Titans</div>
                <p className="text-[11px] text-[#14B8A6]">CIOs & CTOs</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#jury"
                className="inline-flex items-center gap-2 rounded-full bg-[#14B8A6] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#14B8A6]/90 hover:shadow-[0_0_25px_rgba(20,184,166,0.3)]"
              >
                <span>Meet the 5 Grand Jury Leaders</span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#prizes"
                className="inline-flex items-center gap-2 rounded-full border border-[#27272a] bg-[#121215] px-5 py-3 text-xs font-semibold text-[#fafafa] transition-colors hover:border-[#14B8A6]/40 hover:text-white"
              >
                <Trophy className="h-3.5 w-3.5 text-[#14B8A6]" />
                <span>View Prizes & Grants</span>
              </a>
            </div>
          </div>

          {/* Right: Official Summit Poster */}
          <div className="relative flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-[450px] lg:max-w-[470px]">
              {/* Vibrant Ambient Glow */}
              <div className="pointer-events-none absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-[#14B8A6]/30 via-orange-500/25 to-indigo-600/25 opacity-80 blur-2xl" />

              {/* Edge-to-Edge Clean Poster Card */}
              <div className="group relative overflow-hidden rounded-[28px] border border-white/20 bg-[#FAF9F6] shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_rgba(249,115,22,0.25)]">
                <img
                  src="/images/voiceathon/voiceathon-poster.jpg?v=4"
                  alt="Official Voice-A-Thon 2026 Summit Poster"
                  width={2048}
                  height={2560}
                  className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* 4. SECTION 1: THE GRAND JURY EXECUTIVE STAGE                     */}
        {/* ---------------------------------------------------------------- */}
        <section id="jury" className="mt-28 border-t border-[#27272a] pt-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
                <Shield className="h-3.5 w-3.5" />
                The Evaluation Authority
              </span>
              <h2 className="mt-3 text-[32px] font-extrabold tracking-[-0.03em] text-white sm:text-[44px]">
                Meet the 5 Grand Jury Leaders
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#a1a1aa]">
                Every prototype was tested live on real telephony SIP trunks by executive CIOs, distributed cloud pioneers, and AI startup founders.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#27272a] bg-[#121215] px-4 py-2 text-xs text-[#a1a1aa]">
              <CheckCircle2 className="h-4 w-4 text-[#14B8A6]" />
              <span>Independent Industry Deliberation</span>
            </div>
          </div>

          {/* Interactive Grand Jury Stage (Senior UI/UX Spotlight) */}
          <div className="relative mt-12">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative overflow-hidden rounded-3xl border border-[#27272a] bg-gradient-to-b from-[#141419] via-[#0d0d10] to-[#070709] p-6 shadow-2xl md:p-10"
            >
              {/* Split Stage: High Resolution Portrait + Deep Executive Profile */}
              <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Left Portrait Stage Column */}
                <div className="flex justify-center lg:col-span-5">
                  <div className="relative h-[390px] w-full max-w-[340px] overflow-hidden rounded-3xl border border-[#27272a] bg-gradient-to-b from-[#1a1a22] to-[#09090b] shadow-2xl sm:h-[450px] lg:h-[465px]">
                    {/* Halo Aura */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.25)_0%,transparent_75%)]" />

                    {/* High Quality Cutout Image */}
                    <div className="relative h-full w-full p-4 flex items-end justify-center">
                      <img
                        key={selectedJudge.id}
                        src={selectedJudge.image}
                        alt={selectedJudge.name}
                        width={340}
                        height={465}
                        className="h-full w-full object-contain object-bottom transition-all duration-500 animate-fadeIn"
                      />
                    </div>

                    {/* Card Bottom Tag */}
                    <div className="pointer-events-none absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/85 to-transparent p-5 pt-8">
                      <div>
                        <div className="font-bold text-white text-[15px]">{selectedJudge.name}</div>
                        <div className="text-[12px] font-semibold text-[#14B8A6]">{selectedJudge.company}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Profile Details */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <h3 className="text-[30px] font-black tracking-tight text-white sm:text-[36px]">
                      {selectedJudge.name}
                    </h3>
                    <p className="text-[16px] font-medium text-[#a1a1aa]">
                      {selectedJudge.title} ·{" "}
                      <span className="font-semibold text-[#14B8A6]">{selectedJudge.company}</span>
                    </p>

                    <div className="mt-4 rounded-xl border border-[#27272a] bg-[#09090b]/80 px-4 py-2.5 text-xs text-[#a1a1aa]">
                      <span className="text-[#71717a] font-medium">Hackathon Focus:</span>{" "}
                      <span className="text-white font-semibold">{selectedJudge.track}</span>
                    </div>

                    {/* Deliberation Quote */}
                    <div className="relative mt-6 rounded-2xl border border-[#27272a] bg-[#09090b] p-5">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#14B8A6] flex items-center gap-1.5 mb-2">
                        <Mic className="h-3.5 w-3.5" />
                        Evaluation Perspective:
                      </div>
                      <p className="text-[14.5px] italic leading-relaxed text-[#d4d4d8]">
                        &ldquo;{selectedJudge.quote}&rdquo;
                      </p>
                    </div>

                    {/* Verified Credentials */}
                    <div className="mt-5 space-y-2">
                      {selectedJudge.credentials.map((cred, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#a1a1aa]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#14B8A6]" />
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {selectedJudge.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-[#27272a] bg-[#121215] px-2.5 py-1 text-[11px] font-medium text-[#a1a1aa] transition-colors hover:border-[#14B8A6]/40 hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Button */}
                  <div className="mt-6 flex items-center gap-4 pt-1">
                    {selectedJudge.linkedin ? (
                      <a
                        href={selectedJudge.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#14B8A6]/50 bg-[#14B8A6]/10 px-5 py-2.5 text-xs font-semibold text-[#14B8A6] transition-all hover:bg-[#14B8A6]/20"
                      >
                        <FaLinkedin className="h-4 w-4" />
                        <span>Connect on LinkedIn</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-[#71717a]">Executive Profile Verified</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Navigation Strip */}
              <div className="mt-8 flex items-center justify-between border-t border-[#27272a] pt-5">
                <button
                  type="button"
                  onClick={prevJudge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#121215] px-4 py-2 text-xs font-semibold text-[#a1a1aa] transition-colors hover:border-[#14B8A6]/40 hover:text-white cursor-pointer"
                  aria-label="Previous Grand Jury Leader"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Indicator Pills */}
                <div className="flex items-center gap-2">
                  {JUDGES.map((j, i) => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => setSelectedJudgeIdx(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        i === selectedJudgeIdx ? "w-8 bg-[#14B8A6]" : "w-2.5 bg-[#27272a] hover:bg-[#71717a]"
                      }`}
                      aria-label={`Switch to ${j.name}`}
                      title={j.name}
                    />
                  ))}
                </div>

                {/* Next Arrow on the Right Side */}
                <button
                  type="button"
                  onClick={nextJudge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#27272a] bg-[#121215] px-4 py-2 text-xs font-semibold text-[#14B8A6] transition-colors hover:border-[#14B8A6] hover:bg-[#14B8A6]/10 cursor-pointer"
                  aria-label="Next Grand Jury Leader"
                >
                  <span>Next Judge</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>



        {/* ---------------------------------------------------------------- */}
        {/* 7. SECTION 4: PRIZE POOL & PODIUM                                */}
        {/* ---------------------------------------------------------------- */}
        <section id="prizes" className="mt-28 border-t border-[#27272a] pt-20">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
              Awards & Pilot Grants
            </span>
            <h2 className="mt-3 text-[32px] font-extrabold tracking-[-0.03em] text-white sm:text-[44px]">
              ₹1,00,000 Prize Pool & Enterprise Pilots
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#a1a1aa]">
              Winners received cash rewards, dedicated CTO mentorship, and API credits to deploy their voice agents to real paying customers.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {PRIZES.map((prize) => (
              <div
                key={prize.title}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 ${
                  prize.featured
                    ? "border-[#14B8A6] bg-gradient-to-b from-[#14B8A6]/10 via-[#121215] to-[#09090b] shadow-2xl shadow-[#14B8A6]/10"
                    : "border-[#27272a] bg-[#121215] hover:border-[#14B8A6]/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a]">
                      {prize.rank}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        prize.featured
                          ? "bg-[#14B8A6] text-black"
                          : "border border-[#27272a] bg-[#09090b] text-[#a1a1aa]"
                      }`}
                    >
                      {prize.badge}
                    </span>
                  </div>

                  <div className="mt-4 text-3xl font-black tracking-tight text-white">
                    {prize.amount}
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-[#14B8A6]">{prize.title}</h3>

                  <p className="mt-4 text-xs leading-relaxed text-[#a1a1aa]">
                    {prize.perks}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#27272a] pt-4 text-[11px] font-mono text-[#71717a]">
                  Disbursed post-deliberation
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 8. SECTION 5: EVENT AGENDA TIMELINE                              */}
        {/* ---------------------------------------------------------------- */}
        <section id="agenda" className="mt-28 border-t border-[#27272a] pt-20">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#14B8A6]">
              Day Schedule · Held September 5 · 09:00 AM – 06:00 PM
            </span>
            <h2 className="mt-3 text-[32px] font-extrabold tracking-[-0.03em] text-white sm:text-[44px]">
              Full Summit Timeline
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#a1a1aa]">
              An intensive 9:00 AM – 6:00 PM sprint from problem revelation to live stage inbound call testing.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[#27272a] bg-[#121215]">
            {AGENDA.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-3 border-b border-[#27272a] p-5 last:border-none sm:flex-row sm:items-center sm:px-8"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-[#14B8A6]">{item.time}</span>
                  <div className="h-3 w-[1px] bg-[#27272a]" />
                  <span className="text-sm font-bold text-white">{item.title}</span>
                </div>
                <p className="text-xs text-[#a1a1aa] sm:text-right">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 9. SECTION 6: ON-GROUND SHOWCASE & TESTING ARENA                 */}
        {/* ---------------------------------------------------------------- */}
        <section id="showcase" className="mt-28 border-t border-[#27272a] pt-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-400">
                <Radio className="h-3.5 w-3.5" />
                <span>Chapter 01: Chennai · Tamil Nadu Edition</span>
              </div>
              <h2 className="mt-3 text-[32px] font-extrabold tracking-[-0.03em] text-white sm:text-[44px]">
                Official Edition & On-Ground Showcase
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#a1a1aa]">
                Official edition specification and verified on-ground field capture from Chennai on 05 September 2026.
              </p>
            </div>
          </div>

          {/* Main Showcase Grid: Left Spotlight (HD Photo) + Right Technical Summit Console */}
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
            {/* Left: HD Photo Spotlight with Ambient Backdrop Glow */}
            <div className="relative flex flex-col items-center lg:col-span-5">
              {/* Dual-color ambient lighting aura */}
              <div className="pointer-events-none absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-orange-500/15 via-[#14B8A6]/10 to-blue-500/10 blur-2xl opacity-75" />

              <div className="relative w-full overflow-hidden rounded-3xl border border-[#27272a] bg-[#121215] p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:border-[#14B8A6]/40">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/images/voiceathon/voiceathon-chennai-venue-hd.jpg?v=2"
                    alt="Voice-A-Thon 2026 On-Site Easel Standee outside Chennai venue"
                    width={1544}
                    height={2048}
                    className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Rich Interactive Summit Experience & Highlights Console */}
            <div className="flex flex-col gap-5 lg:col-span-7">
              {/* Summit Overview Banner Card */}
              <div className="rounded-3xl border border-[#27272a] bg-[#121215] p-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272a] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Event Telemetry & Specifications</span>
                  </div>
                  <span className="rounded-md border border-[#27272a] bg-[#09090b] px-2.5 py-1 text-[11px] font-bold text-orange-400">
                    CHAPTER 01 · CHENNAI
                  </span>
                </div>

                {/* 4 Interactive Telemetry Metrics */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[#27272a] bg-[#09090b] p-4 transition-all hover:border-[#14B8A6]/40">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Competition Cohort</span>
                      <Users className="h-4 w-4 text-[#14B8A6]" />
                    </div>
                    <div className="mt-2 text-2xl font-black text-white">50+ Teams</div>
                    <p className="mt-1 text-xs text-[#a1a1aa]">150+ Top AI Engineers & Researchers</p>
                  </div>

                  <div className="rounded-2xl border border-[#27272a] bg-[#09090b] p-4 transition-all hover:border-orange-500/40">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Build Sprint</span>
                      <Calendar className="h-4 w-4 text-orange-400" />
                    </div>
                    <div className="mt-2 text-2xl font-black text-white">12 Hours</div>
                    <p className="mt-1 text-xs text-[#a1a1aa]">From Zero to Live Production Caller</p>
                  </div>

                  <div className="rounded-2xl border border-[#27272a] bg-[#09090b] p-4 transition-all hover:border-emerald-500/40">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Prize Pool</span>
                      <Trophy className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="mt-2 text-2xl font-black text-white">₹ 1,00,000</div>
                    <p className="mt-1 text-xs text-[#a1a1aa]">Grants, APIs & Enterprise Credits</p>
                  </div>

                  <div className="rounded-2xl border border-[#27272a] bg-[#09090b] p-4 transition-all hover:border-sky-500/40">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Latency Target</span>
                      <Radio className="h-4 w-4 text-sky-400" />
                    </div>
                    <div className="mt-2 text-2xl font-black text-white">P95 &lt; 350ms</div>
                    <p className="mt-1 text-xs text-[#a1a1aa]">Zero-Drop Audio over Real PSTN</p>
                  </div>
                </div>

                {/* Live Jury Evaluation Strip */}
                <div className="mt-5 rounded-2xl border border-[#27272a] bg-[#09090b] p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Grand Jury Panel</span>
                        <span className="rounded-full border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-2 py-0.5 text-[10px] font-semibold text-[#14B8A6]">
                          5 Leaders
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[#a1a1aa]">
                        Scored live by CIOs, Heads of AI & VP Engineering leaders.
                      </p>
                    </div>

                    <div className="flex -space-x-2 overflow-hidden">
                      {JUDGES.map((j) => (
                        <img
                          key={j.id}
                          src={j.image}
                          alt={j.name}
                          width={36}
                          height={36}
                          className="inline-block h-9 w-9 rounded-full border-2 border-[#121217] object-cover object-top"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Multilingual Voice Pipeline Badges */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#27272a] pt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#71717a] font-medium">Evaluation Dialects:</span>
                    <span className="rounded-md border border-[#27272a] bg-[#09090b] px-2 py-0.5 text-[11px] font-medium text-white">Tamil</span>
                    <span className="rounded-md border border-[#27272a] bg-[#09090b] px-2 py-0.5 text-[11px] font-medium text-white">Tanglish</span>
                    <span className="rounded-md border border-[#27272a] bg-[#09090b] px-2 py-0.5 text-[11px] font-medium text-white">Hindi</span>
                    <span className="rounded-md border border-[#27272a] bg-[#09090b] px-2 py-0.5 text-[11px] font-medium text-white">English</span>
                  </div>

                  <a
                    href="#judges"
                    className="inline-flex items-center gap-1 font-semibold text-[#14B8A6] hover:underline"
                  >
                    <span>Meet the Jury</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Technical Floor Highlights */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="group relative overflow-hidden rounded-3xl border border-[#27272a] bg-[#121215] p-6 transition-all hover:border-orange-500/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <Radio className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-base font-bold text-white">vobiz SIP Live Call Testing</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#a1a1aa]">
                Live SIP trunk benchmarks under real Indian 4G/5G mobile latencies with zero audio stutter.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-[#27272a] bg-[#121215] p-6 transition-all hover:border-[#14B8A6]/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14B8A6]/10 text-[#14B8A6]">
                <Mic className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-base font-bold text-white">Multilingual Dialers in Action</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#a1a1aa]">
                Acoustic speech verification across Tamil, Tanglish, and Hindi code-mixed conversational models.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-[#27272a] bg-[#121215] p-6 transition-all hover:border-blue-500/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Code2 className="h-5 w-5" />
              </div>
              <h4 className="mt-4 text-base font-bold text-white">SnapServe Runtime Engine</h4>
              <p className="mt-2 text-xs leading-relaxed text-[#a1a1aa]">
                Zero-drop caller memory engine and dynamic tool execution powering the finalist prototypes.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 10. FINAL CALL TO ACTION                                         */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-28 overflow-hidden rounded-3xl border border-[#14B8A6]/40 bg-gradient-to-br from-[#14B8A6]/15 via-[#121215] to-[#070709] p-8 text-center sm:p-14">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-[32px] font-extrabold tracking-tight text-white sm:text-[44px]">
              Ready to deploy production-grade Voice AI in under 10 minutes?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#a1a1aa]">
              Join over 50+ enterprise teams and top engineers building sub-350ms, stateful voice agents across Indian languages.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={SIGNUP_URL}
                className="rounded-full bg-[#14B8A6] px-7 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#14B8A6]/90 hover:shadow-[0_0_25px_rgba(20,184,166,0.35)]"
                rel="noopener noreferrer"
              >
                Start Building Free
              </a>
              <Link
                to={PARTNER_URL}
                className="rounded-full border border-[#27272a] bg-[#121215] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#14B8A6]/50"
              >
                Partner or Host a Voice-A-Thon
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10 border-t border-[#27272a] bg-[#070709]">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
