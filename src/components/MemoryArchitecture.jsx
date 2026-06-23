import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import MemoryCloud from "./graphics/MemoryCloud";
import GlowButton from "./GlowButton";
import { SIGNUP_URL } from "../lib/links";

const layers = [
  {
    label: "Layer 1",
    title: "Facts",
    desc: "Budget, intent, product interest — structured per call.",
  },
  {
    label: "Layer 2",
    title: "Episodes",
    desc: "AI summary of each conversation — the story, not the transcript.",
  },
  {
    label: "Layer 3",
    title: "Sentences",
    desc: "Verbatim quotes preserved word-for-word.",
  },
];

export default function MemoryArchitecture() {
  return (
    <div className="bento-border border-b">
      <div className="grid md:grid-cols-2">
        <Reveal className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
          <p className="label mb-4">Memory Architecture</p>
          <h2 className="headline-lg">
            Three layers of intelligence.{" "}
            <span className="brand-gradient-text">One caller identity.</span>
          </h2>
          <p className="body-text mt-6 max-w-lg">
            SnapServe doesn't just store calls — it builds a living profile of every caller
            that compounds with each conversation. Transparent injection, zero re-architecture.
          </p>
          <div className="mt-8">
            <GlowButton href={SIGNUP_URL} hoverText="Get started →">
              Start building free
            </GlowButton>
          </div>
        </Reveal>
        <div className="relative min-h-[280px] md:min-h-[360px] md:border-l md:border-[#27272a]">
          <MemoryCloud />
        </div>
      </div>

      <Stagger className="grid md:grid-cols-3 bento-border border-t">
        {layers.map((layer) => (
          <StaggerItem
            key={layer.title}
            className="group bento-cell-hover bento-border border-b p-8 md:border-b-0 md:border-r last:border-r-0 md:p-10"
          >
            <p className="label">{layer.label}</p>
            <h3 className="mt-3 text-xl font-semibold text-white transition-colors group-hover:text-[#14B8A6]">
              {layer.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#71717a]">{layer.desc}</p>
            <div className="mt-6 h-px w-0 bg-gradient-to-r from-[#FF9933] to-[#14B8A6] transition-all duration-500 group-hover:w-full" />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
