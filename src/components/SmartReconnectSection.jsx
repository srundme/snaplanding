import {
  DropGlyph,
  MemoryGlyph,
  RedialGlyph,
  ResumeGlyph,
} from "./graphics/SnapGlyphs";
import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import SmartReconnect from "./graphics/SmartReconnect";

const traits = [
  {
    Icon: DropGlyph,
    title: "Detects disconnects",
    desc: "Monitors the live call for an unexpected disconnect.",
  },
  {
    Icon: RedialGlyph,
    title: "Starts the callback",
    desc: "Redials through the connected telephony provider.",
  },
  {
    Icon: ResumeGlyph,
    title: "Opens with context",
    desc: "Continues from the exact point of interruption.",
  },
  {
    Icon: MemoryGlyph,
    title: "Never re-asks",
    desc: "Keeps preferences and prior answers on file.",
  },
];

export default function SmartReconnectSection() {
  return (
    <section
      id="smart-reconnect"
      className="relative overflow-hidden border-b border-line bg-surface-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[48vh] bg-[radial-gradient(ellipse_55%_50%_at_22%_20%,rgba(20,184,166,0.045)_0%,transparent_70%)]" />

      <div className="relative z-[2] grid lg:grid-cols-2 lg:items-center">
        {/* Phone box left — zig-zag after Memory’s right card */}
        <Reveal
          delay={0.08}
          className="relative order-2 border-t border-line px-4 py-10 sm:px-6 lg:order-1 lg:border-r lg:border-t-0 lg:px-10 lg:py-12"
        >
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
            Interactive product simulation
          </p>
          <SmartReconnect />
        </Reveal>

        <div className="order-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:order-2 lg:px-14 lg:py-14">
          <Reveal>
            <SectionLabel icon={RedialGlyph}>Auto-redial</SectionLabel>
            <h2 className="headline-lg mt-4 max-w-xl">
              Call drops mid-conversation?{" "}
              <span className="brand-gradient-text">We redial.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="body-text mt-3 max-w-lg">
              Detects the drop, starts a callback, and reloads the caller context.
            </p>
          </Reveal>

          <ul className="mt-7 max-w-md divide-y divide-line border-t border-line">
            {traits.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} as="li" className="flex gap-3.5 py-3.5" delay={0.04 * i}>
                <span className="story-icon">
                  <Icon size={16} />
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold tracking-[-0.016em] text-ink">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
