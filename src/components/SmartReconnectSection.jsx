import { Reveal } from "./motion/Reveal";
import SmartReconnect from "./graphics/SmartReconnect";
import GlowButton from "./GlowButton";

const traits = [
  {
    title: "Detects disconnects",
    desc: "Network drops, signal loss, abrupt hangups — SnapServe knows the difference.",
  },
  {
    title: "Calls back in < 1 second",
    desc: "Outbound callback fires automatically. No queue. No human handoff.",
  },
  {
    title: "Opens with context",
    desc: '"Sorry, we got disconnected due to network" — then continues the exact thread.',
  },
  {
    title: "Never re-asks",
    desc: "Policy numbers, preferences, dispositions — already in memory. Zero repetition.",
  },
];

export default function SmartReconnectSection() {
  return (
    <div id="smart-reconnect" className="bento-border border-b bg-[#050505]">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14 lg:border-r lg:border-[#27272a]">
          <Reveal>
            <p className="label mb-4">
              <span className="rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-2.5 py-0.5 text-[#14B8A6]">
                Flagship
              </span>
            </p>
            <h2 className="headline-lg">
              Network drops.{" "}
              <span className="brand-gradient-text">SnapServe calls back.</span>
            </h2>
            <p className="body-text mt-6 max-w-lg">
              When a call disconnects due to network issues, SnapServe doesn't wait for the
              caller to dial again. Within a second, it initiates an outbound callback —
              apologizes for the disconnect, and resumes exactly where the conversation left off.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-white">
              This isn't a system-prompt trick. It's orchestration with memory and intent —
              the agent <em>knows</em> to call back if they asked, and <em>knows</em> what to
              say without asking the same details again.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {traits.map((t, i) => (
              <Reveal key={t.title} delay={0.05 * i}>
                <div className="bento-cell-hover rounded-xl border border-[#27272a] bg-black/50 p-4">
                  <h3 className="text-sm font-semibold text-white">{t.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#71717a]">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-8">
            <GlowButton>Open dashboard</GlowButton>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <SmartReconnect />
        </Reveal>
      </div>
    </div>
  );
}
