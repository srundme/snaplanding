import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import WorkflowRail from "./graphics/WorkflowRail";
import { RouteGlyph } from "./graphics/SnapGlyphs";

export default function MemoryArchitecture() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-b border-line bg-surface-0"
    >
      <div className="relative z-[2] mx-auto max-w-5xl px-6 py-16 md:px-14 md:py-20">
        <Reveal>
          <SectionLabel icon={RouteGlyph}>How it works</SectionLabel>
          <h2 className="headline-lg mt-5 max-w-2xl">
            One request on the call.{" "}
            <span className="brand-gradient-text">Every system updated.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="body-text mt-3 max-w-xl">
            A reschedule on the live call fans out to CRM, calendar, and confirmation — without a handoff.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-12">
          <WorkflowRail />
        </div>
      </div>
    </section>
  );
}
