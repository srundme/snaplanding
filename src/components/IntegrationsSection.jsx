import { Globe, Upload, Webhook } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import { PLATFORM_MARKS } from "./PlatformLogos";
import SnapServeLogo from "./SnapServeLogo";

const ROWS = [
  {
    label: "Telephony",
    items: [
      { name: "Twilio", mark: "Twilio" },
      { name: "Plivo", mark: "Plivo" },
      { name: "Vobiz", mark: "Vobiz" },
    ],
  },
  {
    label: "Speech & models",
    items: [
      { name: "Sarvam", mark: "Sarvam" },
      { name: "OpenAI", mark: "OpenAI" },
      { name: "Google", mark: "Google" },
      { name: "ElevenLabs", mark: "ElevenLabs" },
    ],
  },
  {
    label: "CRM & data",
    items: [
      { name: "HubSpot", mark: "HubSpot" },
      { name: "Zoho", mark: "Zoho" },
      { name: "Sheets", mark: "Google Sheets" },
      { name: "Webhooks", Icon: Webhook },
    ],
  },
  {
    label: "Leads",
    items: [
      { name: "Meta", mark: "Meta" },
      { name: "Website", Icon: Globe },
      { name: "CSV", Icon: Upload },
    ],
  },
];

function MarkItem({ name, mark, Icon }) {
  const Mark = mark ? PLATFORM_MARKS[mark] : null;
  return (
    <span className="inline-flex items-center gap-2.5 text-[13.5px] tracking-[-0.014em] text-ink">
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        {Mark ? (
          <Mark size={16} />
        ) : Icon ? (
          <span className="story-icon story-icon--sm">
            <Icon className="h-3 w-3" strokeWidth={1.7} aria-hidden="true" />
          </span>
        ) : null}
      </span>
      {name}
    </span>
  );
}

export default function IntegrationsSection() {
  return (
    <section
      id="integrations-stack"
      className="border-b border-line bg-surface-1 px-6 py-12 md:px-14 md:py-14"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#14B8A6]/60" />
            <p className="label text-ink-2">Integrations</p>
          </div>
          <h2 className="headline-lg mt-4 max-w-2xl">
            Bring your providers.{" "}
            <span className="brand-gradient-text">Keep your CRM.</span>
          </h2>
          <p className="body-text mt-3 max-w-xl">
            Mix ASR, LLM, TTS, and telephony. Push outcomes back to HubSpot,
            Zoho, Sheets, or any webhook — two-way.
          </p>
        </Reveal>

        <div className="mt-8 border-t border-line">
          {ROWS.map((row, i) => (
            <Reveal key={row.label} delay={0.04 * i}>
              <div className="grid gap-3 border-b border-line py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center sm:gap-8 md:py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                  {row.label}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-3">
                  {row.items.map((item) => (
                    <MarkItem key={item.name} {...item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <SnapServeLogo variant="full" size="sm" />
            <span className="hidden h-3.5 w-px bg-line sm:block" />
            <p className="text-[13px] text-ink-3">
              Your keys or ours — same memory, redial, and write-back layer.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
