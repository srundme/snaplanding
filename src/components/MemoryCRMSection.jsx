import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import MemoryCRMDashboard from "./graphics/MemoryCRMDashboard";
import CallLogViewer from "./graphics/CallLogViewer";
import GlowButton from "./GlowButton";

const layers = [
  {
    tab: "Facts",
    title: "Extracted facts",
    desc: "Budget, locations, property type — structured from every call, including regional language.",
    example: "75 lakhs · Tambaram · வீடு",
  },
  {
    tab: "Episodes",
    title: "Episode summaries",
    desc: "What happened on each call, in plain language. The story, not just the transcript.",
    example: "Property search · Chennai · villas & plots",
  },
  {
    tab: "Call History",
    title: "Full call logs",
    desc: "Every event logged as JSON — Memory load, prompt injection, call end. Full observability.",
    example: "callId 206 · 4 events · browser",
  },
];

export default function MemoryCRMSection() {
  return (
    <div id="memory-crm" className="bento-border border-b">
      <div className="border-b border-[#27272a] px-8 py-12 md:px-14 md:py-16">
        <Reveal>
          <p className="label mb-3">Memory / CRM</p>
          <h2 className="headline-lg max-w-2xl">
            Every caller gets a profile.{" "}
            <span className="text-[#71717a]">Your agent reads it automatically.</span>
          </h2>
          <p className="body-text mt-5 max-w-xl">
            Facts, episodes, and call history — saved after every conversation and
            injected into the next one. No database to build. No context to re-enter.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="bg-[#080b10] px-4 py-8 md:px-8 md:py-10">
        <MemoryCRMDashboard />
      </Reveal>

      <Reveal delay={0.15} className="border-t border-[#27272a] bg-[#080b10] px-4 py-8 md:px-8 md:py-10">
        <div className="mb-6">
          <p className="label mb-2">Observability</p>
          <h3 className="font-display text-xl font-semibold text-white">
            See the call log as JSON
          </h3>
          <p className="mt-2 max-w-xl text-sm text-[#71717a]">
            Every Memory fetch, VariableResolver injection, and call lifecycle event —
            structured and searchable. Toggle Trace or raw JSON.
          </p>
        </div>
        <CallLogViewer />
      </Reveal>

      <Stagger className="grid md:grid-cols-3 border-t border-[#27272a]" stagger={0.08}>
        {layers.map((layer) => (
          <StaggerItem
            key={layer.tab}
            className="bento-cell-hover border-b border-[#27272a] p-8 md:border-b-0 md:border-r md:p-10 last:border-r-0"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#14B8A6]">
              {layer.tab}
            </span>
            <h3 className="mt-3 text-base font-semibold text-white">{layer.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#71717a]">{layer.desc}</p>
            <p className="mt-4 font-mono text-[11px] text-[#52525b]">{layer.example}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="border-t border-[#27272a] px-8 py-8 text-center md:px-14">
        <GlowButton>Open dashboard</GlowButton>
      </div>
    </div>
  );
}
