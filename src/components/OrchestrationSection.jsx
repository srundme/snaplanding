import { Reveal } from "./motion/Reveal";
import OrchestrationMap from "./graphics/OrchestrationMap";

export default function OrchestrationSection() {
  return (
    <section
      id="orchestration"
      className="relative overflow-hidden border-b border-line bg-surface-0"
    >
      <div className="relative z-[2] mx-auto max-w-5xl px-6 py-16 md:px-14 md:py-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#14B8A6]/60" />
            <p className="label text-ink-2">Orchestration</p>
          </div>
          <h2 className="headline-lg mt-5 max-w-2xl">
            Your stack.{" "}
            <span className="brand-gradient-text">Working as one.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.04}>
          <p className="body-text mt-4 max-w-xl">
            SnapServe routes every call between providers, memory, and business systems.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-12">
          <OrchestrationMap />
        </div>
      </div>
    </section>
  );
}
