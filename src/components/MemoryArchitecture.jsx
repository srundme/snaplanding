import { Reveal } from "./motion/Reveal";
import OrchestrationFlow from "./graphics/OrchestrationFlow";

const BEATS = [
  {
    title: "Call connects",
    desc: "Inbound or outbound on Twilio, Plivo, or Vobiz — any language your stack supports.",
  },
  {
    title: "SnapServe runs the turn",
    desc: "Memory injects, redial stays armed, scheduling and meeting bots stay available.",
  },
  {
    title: "Providers stay yours",
    desc: "ASR, LLM, and TTS keys unchanged. Outcomes write back to CRM or webhooks.",
  },
];

export default function MemoryArchitecture() {
  return (
    <section id="how-it-works" className="border-b border-line bg-surface-1">
      <div className="grid md:grid-cols-2 md:items-stretch lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <Reveal className="flex flex-col justify-center px-6 py-12 md:px-12 md:py-14 lg:px-14 lg:py-16">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-7 bg-[#14B8A6]/60" />
            <p className="label text-ink-2">How it works</p>
          </div>
          <h2 className="headline-lg max-w-md">
            Telephony in.{" "}
            <span className="brand-gradient-text">Action out.</span>
          </h2>
          <p className="body-text mt-3 max-w-md">
            SnapServe sits between your phone trunk and your voice providers —
            memory, redial, and CRM write-back without rebuilding the stack.
          </p>

          <ol className="mt-7 max-w-md space-y-0 border-t border-line">
            {BEATS.map((beat) => (
              <li
                key={beat.title}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 border-b border-line py-3.5"
              >
                <span
                  className="flex flex-col justify-start gap-[3.5px] pt-2.5"
                  aria-hidden="true"
                >
                  <span className="block h-[2px] w-8 rounded-full bg-[#5EEAD4]" />
                  <span className="block h-[2px] w-8 rounded-full bg-[#5EEAD4]" />
                </span>
                <span>
                  <span className="block text-[14.5px] font-semibold tracking-[-0.02em] text-ink">
                    {beat.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink-2">
                    {beat.desc}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="relative flex min-h-[480px] border-t border-line bg-surface-0/40 md:min-h-full md:border-t-0">
          <OrchestrationFlow />
        </div>
      </div>
    </section>
  );
}
