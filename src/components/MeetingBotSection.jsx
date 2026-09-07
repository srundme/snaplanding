import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  LinkGlyph,
  MeetingGlyph,
  ScheduleGlyph,
  TrailGlyph,
  VoiceGlyph,
} from "./graphics/SnapGlyphs";
import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import { PLATFORM_MARKS } from "./PlatformLogos";
import MeetingBotVisual from "./graphics/MeetingBotVisual";

const traits = [
  {
    Icon: LinkGlyph,
    title: "Joins from a link",
    desc: "Paste a Meet, Zoom, or Teams link.",
  },
  {
    Icon: VoiceGlyph,
    title: "Speaks in the meeting",
    desc: "Answers in your agent's configured voice.",
  },
  {
    Icon: TrailGlyph,
    title: "Saves notes",
    desc: "Saves notes and next steps while the meeting is live.",
  },
  {
    Icon: ScheduleGlyph,
    title: "Books follow-ups",
    desc: "Schedules the follow-up before anyone leaves.",
  },
];

const platforms = ["Google Meet", "Zoom", "Microsoft Teams"];

export default function MeetingBotSection() {
  const sectionRef = useRef(null);
  // Start when the meeting section is actually on screen (not early peek)
  const sectionInView = useInView(sectionRef, {
    amount: 0.35,
    margin: "0px 0px -12% 0px",
  });

  return (
    <section
      ref={sectionRef}
      id="meeting-bot"
      className="relative overflow-hidden border-b border-line bg-surface-0"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[48vh] bg-[radial-gradient(ellipse_55%_50%_at_22%_20%,rgba(20,184,166,0.045)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-[2] grid lg:grid-cols-2 lg:items-center">
        <div className="relative order-2 overflow-visible border-t border-line px-4 py-10 sm:px-6 lg:order-1 lg:border-r lg:border-t-0 lg:px-10 lg:py-12">
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
            Interactive product simulation
          </p>
          <MeetingBotVisual sectionInView={sectionInView} />
        </div>

        <div className="order-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:order-2 lg:px-14 lg:py-14">
          <Reveal>
            <SectionLabel icon={MeetingGlyph}>Meeting bot</SectionLabel>
            <h2 className="headline-lg mt-4 max-w-xl">
              Joins the meeting.
              <br />
              <span className="brand-gradient-text">Leaves with notes.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="body-text mt-3 max-w-lg">
              Paste a link. SnapServe joins, speaks when needed, and records the outcome.
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

          <Reveal delay={0.16} className="mt-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
              <span className="label text-ink-3">Works with</span>
              {platforms.map((p) => {
                const Mark = PLATFORM_MARKS[p];
                return (
                  <span
                    key={p}
                    className="inline-flex items-center gap-2 text-[13px] text-ink-2"
                  >
                    {Mark && <Mark size={14} className="shrink-0 opacity-90" />}
                    {p}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
