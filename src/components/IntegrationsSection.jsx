import { Globe, Upload, Webhook } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import { PlugGlyph } from "./graphics/SnapGlyphs";
import IntegrationsStackBand from "./motion/IntegrationsStackBand";
import { PLATFORM_MARKS } from "./PlatformLogos";
import SnapServeLogo from "./SnapServeLogo";

const HERO_STACK = [
  "Vobiz",
  "OpenAI",
  "HubSpot",
  "Sarvam",
  "Google",
  "ElevenLabs",
  "Zoho",
  "Meta",
];

const ROWS = [
  {
    label: "Telephony",
    status: "Provider connection",
    items: [
      { name: "Vobiz", mark: "Vobiz" },
      { name: "Twilio", mark: "Twilio" },
      { name: "Plivo", mark: "Plivo" },
    ],
  },
  {
    label: "Speech & models",
    status: "Provider connection",
    items: [
      { name: "Sarvam", mark: "Sarvam" },
      { name: "OpenAI", mark: "OpenAI" },
      { name: "Google", mark: "Google" },
      { name: "ElevenLabs", mark: "ElevenLabs" },
    ],
  },
  {
    label: "CRM & data",
    status: "Connector or webhook",
    items: [
      { name: "HubSpot", mark: "HubSpot" },
      { name: "Zoho", mark: "Zoho" },
      { name: "Sheets", mark: "Google Sheets" },
      { name: "Webhooks", Icon: Webhook },
    ],
  },
  {
    label: "Leads",
    status: "Import or lead source",
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
      className="relative overflow-hidden border-b border-line bg-surface-1"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[42vh] bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(20,184,166,0.05)_0%,transparent_72%)]"
        aria-hidden="true"
      />

      <div className="relative z-[2] mx-auto max-w-5xl px-6 py-16 md:px-14 md:py-20">
        <Reveal>
          <SectionLabel icon={PlugGlyph}>Integrations</SectionLabel>
          <h2 className="headline-lg mt-5 max-w-2xl">
            Use the best providers today.{" "}
            <span className="brand-gradient-text">Switch anytime.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="body-text mt-4 max-w-xl">
            Connect phone, speech, AI, lead, and CRM tools without rebuilding your workflow.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 md:mt-14">
            <IntegrationsStackBand marks={HERO_STACK} />
          </div>
        </Reveal>

        <div className="mt-12 border-t border-line md:mt-14">
          {ROWS.map((row, i) => (
            <Reveal key={row.label} delay={0.04 * i}>
              <div className="grid gap-3 border-b border-line py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center sm:gap-8 md:py-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3">
                    {row.label}
                  </p>
                  <p className="mt-1 text-[10px] text-ink-3">{row.status}</p>
                </div>
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
          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <SnapServeLogo variant="full" size="sm" />
            <span className="hidden h-3.5 w-px bg-line sm:block" />
            <p className="text-[13px] text-ink-3">
              Availability depends on your provider accounts and selected connectors.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
