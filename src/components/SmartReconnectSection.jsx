import {
  PhoneCall,
  Radar,
  Reply,
  UserRound,
} from "lucide-react";
import { Reveal } from "./motion/Reveal";
import SmartReconnect from "./graphics/SmartReconnect";

const traits = [
  {
    Icon: Radar,
    title: "Detects disconnects",
    desc: "Network drops, signal loss, abrupt hangups — under 200ms.",
  },
  {
    Icon: PhoneCall,
    title: "Calls back in < 1s",
    desc: "Outbound callback fires with the same caller profile.",
  },
  {
    Icon: Reply,
    title: "Opens with context",
    desc: "Apologizes, then continues the exact pre-drop thread.",
  },
  {
    Icon: UserRound,
    title: "Never re-asks",
    desc: "Preferences already on file. Zero repeated questions.",
  },
];

export default function SmartReconnectSection() {
  return (
    <section
      id="smart-reconnect"
      className="relative border-b border-line bg-surface-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[48vh] bg-[radial-gradient(ellipse_55%_50%_at_22%_20%,rgba(20,184,166,0.045)_0%,transparent_70%)]" />

      <div className="relative grid lg:grid-cols-2 lg:items-center">
        {/* Phone box left — zig-zag after Memory’s right card */}
        <Reveal
          delay={0.08}
          className="relative order-2 border-t border-line lg:order-1 lg:border-t-0 lg:border-r"
        >
          <SmartReconnect />
        </Reveal>

        <div className="order-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:order-2 lg:px-14 lg:py-14">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#14B8A6]/60" />
              <p className="label text-ink-2">Auto-redial</p>
            </div>
            <h2 className="headline-lg mt-4 max-w-xl">
              Call drops mid-conversation?{" "}
              <span className="brand-gradient-text">We redial.</span>
            </h2>
            <p className="body-text mt-3 max-w-lg">
              SnapServe detects the disconnect in under 200ms and calls back
              automatically. The caller resumes exactly where they left off —
              no re-intro, no repeated questions.
            </p>
          </Reveal>

          <ul className="mt-7 max-w-md divide-y divide-line border-t border-line">
            {traits.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={0.04 * i}>
                <li className="flex gap-3.5 py-3.5">
                  <span className="story-icon">
                    <Icon size={14} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[14px] font-semibold tracking-[-0.016em] text-ink">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
                      {desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
