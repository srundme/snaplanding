import { Reveal } from "./motion/Reveal";
import SmartReconnect from "./graphics/SmartReconnect";
import GlowButton from "./GlowButton";
import { SIGNUP_URL } from "../lib/links";

const traits = [
  { title: "Detects disconnects", desc: "Network drops, signal loss, abrupt hangups." },
  { title: "Calls back in < 1s", desc: "Outbound callback fires automatically." },
  { title: "Opens with context", desc: "Apologizes, then continues the exact thread." },
  { title: "Never re-asks", desc: "Preferences already in memory. Zero repetition." },
];

export default function SmartReconnectSection() {
  return (
    <div id="smart-reconnect" className="bento-border border-b bg-[#050505]">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14 lg:border-r lg:border-[#27272a]">
          <Reveal>
            <p className="label mb-4">
              <span className="rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-2.5 py-0.5 text-[#FF9933]">
                Auto-Redial
              </span>
            </p>
            <h2 className="headline-lg">
              Call drops mid-conversation?{" "}
              <span className="brand-gradient-text">We redial.</span>
            </h2>
            <p className="body-text mt-6 max-w-lg">
              SnapServe detects the disconnect in under 200ms and calls back automatically.
              The caller resumes exactly where they left off — no re-intro, no repeated questions.
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
            <GlowButton href={SIGNUP_URL} hoverText="Get started →">
              Start building free
            </GlowButton>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative min-h-[420px]">
          <SmartReconnect />
        </Reveal>
      </div>
    </div>
  );
}
