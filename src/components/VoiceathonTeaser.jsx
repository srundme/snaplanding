import { Link } from "react-router-dom";
import { Trophy, Sparkles, ArrowRight, Award, ShieldCheck, Users } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";

const JUDGE_AVATARS = [
  { name: "Bharanidharan N.", role: "CIO, ProConnect", image: "/images/voiceathon/bharanidharan.png" },
  { name: "Dharun Jayakrishnan", role: "CTO, ZenXai", image: "/images/voiceathon/dharun.png" },
  { name: "Haarishkumar Bhaskar", role: "Founder, FounderEdge", image: "/images/voiceathon/haarishkumar.png" },
  { name: "Kannan Ganesan", role: "CTO, Smartail (Ex-VP JPMorgan)", image: "/images/voiceathon/kannan.png" },
  { name: "Prasath Sekar", role: "PM, TeleCMI", image: "/images/voiceathon/prasath.png" },
];

export default function VoiceathonTeaser() {
  return (
    <section
      id="voiceathon"
      className="relative overflow-hidden border-b border-line bg-surface-1 px-6 py-14 md:px-14 md:py-20"
    >
      <div
        className="pointer-events-none absolute -top-32 right-1/4 h-64 w-96 rounded-full bg-[#14B8A6]/[0.07] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionLabel icon={Trophy}>Event Spotlight</SectionLabel>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-3 py-1 text-xs font-semibold text-[#14B8A6]">
              <Sparkles className="h-3.5 w-3.5" />
              Voice-A-Thon 2026
            </span>
          </div>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <h2 className="headline-lg text-balance">
                Judged by the pioneers of{" "}
                <span className="brand-gradient-text">Enterprise IT & Voice AI.</span>
              </h2>
              <p className="body-text mt-3 text-ink-2">
                Voice-A-Thon 2026 brought together elite builders crafting multilingual, low-latency, and context-aware voice agents evaluated by veteran CIOs and AI CTOs.
              </p>

              {/* Highlights pills */}
              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-0 px-2.5 py-1 text-ink-2">
                  <Award className="h-3.5 w-3.5 text-[#14B8A6]" />
                  Innovative CIO 2024 Jury
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-0 px-2.5 py-1 text-ink-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#14B8A6]" />
                  Enterprise Microservices & Cloud
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-0 px-2.5 py-1 text-ink-2">
                  <Users className="h-3.5 w-3.5 text-[#14B8A6]" />
                  Agentic Voice Pipelines
                </span>
              </div>

              {/* CTA Link */}
              <div className="mt-7">
                <Link
                  to="/voice-a-thon"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-5 py-2.5 text-sm font-semibold text-[#14B8A6] transition-all hover:border-[#14B8A6] hover:bg-[#14B8A6]/20 hover:shadow-lg hover:shadow-[#14B8A6]/10"
                >
                  <span>Meet the 5 Judges & View Event Showcase</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Judge Avatars Grid Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-0 p-5 shadow-xl transition-all hover:border-[#14B8A6]/40">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-3">
                    Distinguished Jury Panel
                  </span>
                  <span className="rounded-full bg-[#14B8A6]/10 px-2 py-0.5 text-[11px] font-medium text-[#14B8A6]">
                    5 Industry Leaders
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {JUDGE_AVATARS.map((j) => (
                    <div
                      key={j.name}
                      className="flex items-center gap-3 rounded-xl border border-line/60 bg-surface-1/60 p-2.5 transition-colors hover:border-[#14B8A6]/30 hover:bg-surface-1"
                    >
                      <img
                        src={j.image}
                        alt={j.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-full border border-line object-cover object-top"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-ink">{j.name}</p>
                        <p className="truncate text-[11.5px] text-ink-3">{j.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to="/voice-a-thon"
                    className="text-xs font-medium text-[#14B8A6] hover:underline"
                  >
                    View full profiles & benchmarks →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
