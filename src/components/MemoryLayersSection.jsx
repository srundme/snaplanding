import { Reveal } from "./motion/Reveal";

const layers = [
  {
    name: "Facts",
    desc: "Budget, intent, product interest — structured per call",
  },
  {
    name: "Episodes",
    desc: "AI summary of each conversation — the story, not the transcript",
  },
  {
    name: "Sentences",
    desc: "Verbatim quotes preserved word-for-word",
  },
];

const stats = [
  "3-layer Memory Architecture",
  "<200ms Drop Detection",
  "20+ Providers Supported",
  "99.9% Uptime",
];

export default function MemoryLayersSection() {
  return (
    <section className="bento-border border-b">
      <div className="grid md:grid-cols-3">
        {layers.map((layer, i) => (
          <Reveal
            key={layer.name}
            delay={i * 0.06}
            className={`bento-cell-hover p-8 md:p-10 ${i < 2 ? "bento-border border-b md:border-b-0 md:border-r" : ""}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#14B8A6]">
              {layer.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">{layer.desc}</p>
          </Reveal>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-px bg-[#27272a] md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal
            key={stat}
            delay={i * 0.05}
            className="bg-black px-6 py-5 text-center"
          >
            <p className="font-mono text-[11px] leading-snug text-[#a1a1aa]">{stat}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
