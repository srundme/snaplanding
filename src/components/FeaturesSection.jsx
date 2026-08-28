import {
  ArrowUpRight,
  Database,
  Layers,
  Megaphone,
  PhoneCall,
  PhoneOutgoing,
  Video,
} from "lucide-react";
import { Reveal } from "./motion/Reveal";
import CountUp from "./ui/text-animations/CountUp";
import {
  DeepgramMark,
  GoogleMeetMark,
  HubSpotMark,
  MetaMark,
  OpenAIMark,
  PlivoMark,
  TeamsMark,
  TwilioMark,
  ZohoMark,
  ZoomMark,
} from "./PlatformLogos";

const LEDGER = [
  {
    Icon: Video,
    label: "Meeting bot",
    outcome: "Joins Meet, Zoom, or Teams and writes notes back",
    href: "#meeting-bot",
    marks: [
      { Mark: GoogleMeetMark, name: "Google Meet" },
      { Mark: ZoomMark, name: "Zoom" },
      { Mark: TeamsMark, name: "Microsoft Teams" },
    ],
  },
  {
    Icon: Database,
    label: "Caller memory",
    outcome: "Return callers never restart from zero",
    stake: "Budget, language, intent loaded before greeting",
    href: "#memory-crm",
  },
  {
    Icon: PhoneCall,
    label: "Auto-redial",
    outcome: "Drop detected → callback with full context",
    stake: "<200ms detect · <1s redial · same thread",
    href: "#smart-reconnect",
  },
  {
    Icon: Layers,
    label: "One layer",
    outcome: "Speech, model, voice, and phone — wired together",
    marks: [
      { Mark: TwilioMark, name: "Twilio" },
      { Mark: PlivoMark, name: "Plivo" },
      { Mark: DeepgramMark, name: "Deepgram" },
      { Mark: OpenAIMark, name: "OpenAI" },
    ],
  },
  {
    Icon: PhoneOutgoing,
    label: "Turn control",
    outcome: "No silent hangs. Interruptions handled cleanly",
    stake: "Barge-in · endpointing · warm pools",
  },
  {
    Icon: Megaphone,
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
  { kind: "count", to: 800, prefix: "<", suffix: "ms", label: "warm response" },
  { kind: "count", to: 1, suffix: "-click", label: "provider swap" },
  { kind: "text", value: "BYOP", label: "or managed" },
];

const CONTRAST = [
  {
    pain: "Four providers. Fragile sockets.",
    gain: "One orchestration layer.",
  },
  {
    pain: "Cold starts and long gaps.",
    gain: "Warm pools and streaming.",
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
    <section id="differentiator" className="feat-cov">
      <div className="feat-cov-glow" aria-hidden="true" />

      <div className="feat-cov-inner">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#14B8A6]/60" />
            <p className="label text-ink-2">Product</p>
          </div>
          <h2 className="headline-lg mt-4 max-w-3xl">
            Stop stitching providers.{" "}
            <span className="brand-gradient-text">Run production calls.</span>
          </h2>
        </Reveal>

        <div className="feat-cov-grid">
          <Reveal delay={0.06} y={14}>
            <div className="feat-cov-statement">
              <p className="feat-cov-kicker">Why teams switch</p>
              <p className="feat-cov-thesis">
                DIY sockets fail when outbound volume hits.
              </p>
              <p className="feat-cov-body">
                SnapServe sits between telephony and your ASR / LLM / TTS —
                latency, barge-in, memory, redial, and CRM write-back handled
                once.
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
                {PROOFS.map((p, i) => (
                  <div key={p.label} className="feat-cov-proof" role="listitem">
                    <strong>
                      {p.kind === "count" ? (
                        <CountUp
                          to={p.to}
                          prefix={p.prefix ?? ""}
                          suffix={p.suffix ?? ""}
                          duration={1.35}
                          delay={0.08 * i}
                        />
                      ) : (
                        p.value
                      )}
                    </strong>
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
                        <Icon strokeWidth={1.6} />
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
