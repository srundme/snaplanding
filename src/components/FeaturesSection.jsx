import { ArrowUpRight } from "lucide-react";
import {
  CampaignGlyph,
  GridGlyph,
  LayerGlyph,
  MeetingGlyph,
  MemoryGlyph,
  RedialGlyph,
  TurnGlyph,
} from "./graphics/SnapGlyphs";
import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import {
  DeepgramMark,
  GoogleMeetMark,
  HubSpotMark,
  MetaMark,
  OpenAIMark,
  PlivoMark,
  TeamsMark,
  TwilioMark,
  VobizMark,
  ZohoMark,
  ZoomMark,
} from "./PlatformLogos";

const LEDGER = [
  {
    Icon: MeetingGlyph,
    label: "Meeting bot",
    outcome: "Joins Meet, Zoom, or Teams — notes back",
    href: "#meeting-bot",
    marks: [
      { Mark: GoogleMeetMark, name: "Google Meet" },
      { Mark: ZoomMark, name: "Zoom" },
      { Mark: TeamsMark, name: "Microsoft Teams" },
    ],
  },
  {
    Icon: MemoryGlyph,
    label: "Caller memory",
    outcome: "Return callers never restart from zero",
    stake: "Budget, language, intent — before greeting",
    href: "#memory-crm",
  },
  {
    Icon: RedialGlyph,
    label: "Auto-redial",
    outcome: "Drop detected → callback with context",
    stake: "Provider callback · same caller profile",
    href: "#smart-reconnect",
  },
  {
    Icon: LayerGlyph,
    label: "One layer",
    outcome: "Speech, model, voice, phone — wired together",
    marks: [
      { Mark: VobizMark, name: "Vobiz" },
      { Mark: TwilioMark, name: "Twilio" },
      { Mark: PlivoMark, name: "Plivo" },
      { Mark: DeepgramMark, name: "Deepgram" },
      { Mark: OpenAIMark, name: "OpenAI" },
    ],
  },
  {
    Icon: TurnGlyph,
    label: "Turn control",
    outcome: "No silent hangs. Clean barge-in",
    stake: "Barge-in · endpointing · warm pools",
  },
  {
    Icon: CampaignGlyph,
    label: "Campaigns + CRM",
    outcome: "Outbound runs; outcomes write back",
    marks: [
      { Mark: MetaMark, name: "Meta" },
      { Mark: HubSpotMark, name: "HubSpot" },
      { Mark: ZohoMark, name: "Zoho" },
    ],
  },
];

const PROOFS = [
  { kind: "text", value: "Live", label: "call console" },
  { kind: "text", value: "Flexible", label: "provider routing" },
  { kind: "text", value: "Your keys", label: "or managed" },
];

const CONTRAST = [
  {
    pain: "Many vendors. More points of failure.",
    gain: "One reliable platform",
  },
  {
    pain: "Slow starts and dead air",
    gain: "Fast responses and smooth turns",
  },
];

function EqualsMark() {
  return (
    <span className="feat-cov-eq" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export default function FeaturesSection() {
  return (
    <section id="differentiator" className="feat-cov relative">
      <div className="feat-cov-glow" aria-hidden="true" />

      <div className="feat-cov-inner relative z-[2]">
        <Reveal>
          <SectionLabel icon={GridGlyph}>Platform</SectionLabel>
          <h2 className="headline-lg mt-4 max-w-3xl">
            From first ring to CRM update.{" "}
            <span className="brand-gradient-text">One connected platform.</span>
          </h2>
        </Reveal>

        <div className="feat-cov-grid">
          <Reveal delay={0.06} y={14}>
            <div className="feat-cov-statement">
              <p className="feat-cov-kicker">Built for production</p>
              <p className="feat-cov-thesis">
                Reliable calls without the patchwork.
              </p>
              <p className="feat-cov-body">
                Speed, interruptions, memory, redial, and CRM updates—built in.
              </p>

              <ul className="feat-diy">
                {CONTRAST.map((row) => (
                  <li key={row.pain}>
                    <span className="feat-diy-pain">{row.pain}</span>
                    <span className="feat-diy-gain">{row.gain}</span>
                  </li>
                ))}
              </ul>

              <div className="feat-cov-proofs" role="list">
                {PROOFS.map((p) => (
                  <div key={p.label} className="feat-cov-proof" role="listitem">
                    <strong>{p.value}</strong>
                    <span>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={14}>
            <div className="feat-cov-ledger">
              <div className="feat-cov-ledger-head">
                <p className="label text-[10px]">Included</p>
                <span>On every dial</span>
              </div>

              <div className="feat-cov-layer">
                {LEDGER.map((item) => {
                  const Row = item.href ? "a" : "div";
                  const Icon = item.Icon;
                  return (
                    <Row
                      key={item.label}
                      {...(item.href ? { href: item.href } : {})}
                      className="feat-cov-row group"
                    >
                      <span className="feat-cov-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <div className="feat-cov-meta">
                        <EqualsMark />
                        <p className="feat-cov-name">
                          {item.label}
                          {item.href ? (
                            <ArrowUpRight
                              className="ml-1.5 inline h-3 w-3 -translate-y-px text-ink-3 opacity-0 transition-opacity group-hover:opacity-100"
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                          ) : null}
                        </p>
                      </div>
                      <div className="feat-cov-copy">
                        <strong>{item.outcome}</strong>
                        {(item.marks?.length || item.stake) && (
                          <span className="feat-cov-stake">
                            {item.marks?.length ? (
                              <span className="feat-cov-marks">
                                {item.marks.map(({ Mark, name }) => (
                                  <Mark key={name} size={13} />
                                ))}
                              </span>
                            ) : null}
                            {item.stake}
                          </span>
                        )}
                      </div>
                    </Row>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
