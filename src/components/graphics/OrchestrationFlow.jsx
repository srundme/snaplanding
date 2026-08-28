import {
  PhoneIncoming,
  Database,
  PhoneCall,
  CalendarClock,
  Video,
  Cpu,
} from "lucide-react";

const CAPABILITIES = [
  { Icon: Database, label: "Memory" },
  { Icon: PhoneCall, label: "Auto-redial" },
  { Icon: CalendarClock, label: "Scheduling" },
  { Icon: Video, label: "Meetings" },
];

function FlowLink() {
  return (
    <div className="orch-link" aria-hidden="true">
      <span className="orch-link-line" />
      <span className="orch-link-dot" />
    </div>
  );
}

export default function OrchestrationFlow() {
  return (
    <div
      className="orch-rack"
      aria-label="SnapServe orchestration: telephony into SnapServe into your voice providers"
    >
      <div className="orch-stack">
        <article className="orch-node">
          <span className="orch-node-icon">
            <PhoneIncoming strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div>
            <h3>Inbound & outbound calls</h3>
            <p>Any telephony · any language</p>
          </div>
        </article>

        <FlowLink />

        <article className="orch-core-panel">
          <header className="orch-core-bar">
            <h3>SnapServe layer</h3>
            <span className="orch-live">Live path</span>
          </header>
          <ul className="orch-caps-grid">
            {CAPABILITIES.map(({ Icon, label }) => (
              <li key={label}>
                <Icon strokeWidth={1.65} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </article>

        <FlowLink />

        <article className="orch-node">
          <span className="orch-node-icon">
            <Cpu strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div>
            <h3>Your voice provider</h3>
            <p>ASR · LLM · TTS — unchanged</p>
          </div>
        </article>
      </div>
    </div>
  );
}
