import {
  BookOpen,
  CornerDownRight,
  Database,
} from "lucide-react";
import { Reveal } from "./motion/Reveal";

/*
  Caller Memory — premium CRM contact panel.
  Hardcoded returning-lead record. No fake live chrome.
*/

const STORIES = [
  {
    Icon: Database,
    title: "Facts stay on file",
    desc: "Budget ₹75L, Tambaram / Red Hills, Tamil, villa with parking.",
  },
  {
    Icon: BookOpen,
    title: "Loaded before greeting",
    desc: "Profile injects before the agent speaks the first line.",
  },
  {
    Icon: CornerDownRight,
    title: "Picks up the thread",
    desc: "Next dial continues from the last decision — not day one.",
  },
];

const PROPERTIES = [
  ["Budget", "Up to ₹75L"],
  ["Areas", "Tambaram, Red Hills"],
  ["Language", "Tamil"],
  ["Looking for", "Villa with parking"],
];

const NOTES = [
  "Prefers evening callbacks after 7pm",
  "Asked again about Red Hills options",
  "Compared SBI and HDFC home-loan rates",
];

function MemoryPanel() {
  return (
    <article className="ss-panel ss-panel--phone" aria-label="Caller memory for Karthik Anand">
      <header className="ss-panel-head">
        <div className="ss-panel-avatar" aria-hidden="true">
          KA
        </div>
        <div className="min-w-0">
          <div className="ss-panel-title-row">
            <h3>Karthik Anand</h3>
            <span className="ss-panel-tag">Returning</span>
          </div>
          <p className="ss-panel-sub">+91 98840 55242</p>
          <p className="ss-panel-meta">4 calls · Last 11 Mar, 7:42 pm</p>
        </div>
      </header>

      <section className="ss-panel-section">
        <p className="ss-panel-label">On file</p>
        <dl className="ss-panel-props">
          {PROPERTIES.map(([k, v]) => (
            <div key={k} className="ss-panel-prop">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="ss-panel-section">
        <p className="ss-panel-label">Last call · 4m 12s</p>
        <p className="ss-panel-quote">
          Check Red Hills options at the same budget — call me in the evening.
        </p>
      </section>

      <section className="ss-panel-section ss-panel-section--last">
        <p className="ss-panel-label">Notes</p>
        <ul className="ss-panel-notes">
          {NOTES.slice(0, 2).map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function MemoryPhone() {
  return (
    <div className="mem-device">
      <div className="mem-device-frame">
        <div className="mem-device-island" aria-hidden="true" />
        <div className="mem-device-screen">
          <div className="mem-device-status" aria-hidden="true">
            <span>7:42</span>
            <span className="mem-device-battery" />
          </div>
          <MemoryPanel />
        </div>
        <div className="mem-device-home" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function MemoryCRMSection() {
  return (
    <section
      id="memory-crm"
      className="relative isolate overflow-hidden border-b border-line bg-surface-0 px-6 py-12 md:px-14 md:py-14"
    >
      <div className="mem-aura" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="mem-story">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-7 bg-[#14B8A6]/55" />
                <p className="label text-ink-2">Caller memory</p>
              </div>

              <h2 className="headline-lg mt-4">
                They never{" "}
                <span className="brand-gradient-text">start from zero.</span>
              </h2>

              <p className="body-text mt-3 max-w-md">
                Budget ₹75L, Tambaram preference, Tamil — still on file when
                Karthik calls back. The agent continues; it doesn’t restart.
              </p>
            </Reveal>

            <div className="mem-story-list">
              {STORIES.map((item, i) => (
                <Reveal key={item.title} delay={0.06 * (i + 1)}>
                  <div className="mem-story-item flex items-start gap-3.5">
                    <span className="mem-story-icon story-icon">
                      <item.Icon
                        className="h-3.5 w-3.5"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="mt-0">{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} y={16}>
            <MemoryPhone />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
