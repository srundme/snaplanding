import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { PLATFORM_MARKS } from "../PlatformLogos";

const CALLER = "Priya Nayar";
const CALLER_INITIALS = "PN";
const CALLER_PHONE = "+91 98401 22841";
const CALLER_TAG = "Returning caller · 4 prior conversations";
const RUN_ID = "run_7f2a91c4";
const UTTERANCE = "Can you move my appointment to next Tuesday morning?";
const CLOCK_START = 41;

const ENTITIES = [
  { label: "intent", value: "reschedule_appointment" },
  { label: "date", value: "2026-03-17" },
  { label: "window", value: "morning" },
];

const STEPS = [
  {
    id: "lookup",
    mark: "HubSpot",
    system: "HubSpot",
    action: "Loaded contact",
    ref: "Priya Nayar · policy IL-28491",
    ms: 142,
  },
  {
    id: "slots",
    mark: "Google Calendar",
    system: "Google Calendar",
    action: "Checked availability",
    ref: "3 slots open · Tue 17 Mar",
    ms: 318,
  },
  {
    id: "move",
    mark: "Google Calendar",
    system: "Google Calendar",
    action: "Moved booking",
    ref: "Thu 12 Mar, 3:00 PM → Tue 17 Mar, 11:00 AM",
    ms: 406,
  },
  {
    id: "write",
    mark: "HubSpot",
    system: "HubSpot",
    action: "Updated property",
    ref: "next_appointment = 2026-03-17T11:00",
    mono: true,
    ms: 129,
  },
  {
    id: "notify",
    mark: "Meta",
    system: "WhatsApp",
    action: "Sent confirmation",
    ref: `Delivered to ${CALLER_PHONE}`,
    ms: 233,
    accent: true,
  },
];

const TOTAL_MS = STEPS.reduce((sum, step) => sum + step.ms, 0);

const SENT_MESSAGE =
  "Hi Priya, your appointment is moved to Tue 17 Mar, 11:00 AM. Reply RESCHEDULE if you need another time.";
const SENT_AT = "12:45 PM";

const TYPE_MS = 32;
const LEAD_IN_MS = 520;
const STEP_MS = 1150;
const REPLAY_MS = 3600;

function formatClock(total) {
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 6.3 4.8 8.6 9.5 3.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TicksIcon() {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden="true">
      <path
        d="M1 5.4 3.3 7.7 7.7 2.4M6.4 5.7 8.2 7.7 12.6 2.4"
        stroke="#53bdeb"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Waveform({ on }) {
  return (
    <span className="wf-run__wave" data-on={on || undefined} aria-hidden="true">
      <span /><span /><span /><span /><span />
    </span>
  );
}

export default function WorkflowRail() {
  const rootRef = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(rootRef, { amount: 0.25 });

  const [typed, setTyped] = useState(0);
  const [cursor, setCursor] = useState(-1);
  const [elapsed, setElapsed] = useState(CLOCK_START);

  const settled = reduce || !inView;
  const position = settled ? STEPS.length : Math.max(cursor, 0);
  const shownText = settled ? UTTERANCE : UTTERANCE.slice(0, typed);
  const listening = !settled && typed < UTTERANCE.length;
  const complete = settled || cursor >= STEPS.length;

  useEffect(() => {
    if (settled || typed >= UTTERANCE.length) return undefined;
    const id = setTimeout(() => setTyped((t) => t + 1), TYPE_MS);
    return () => clearTimeout(id);
  }, [typed, settled]);

  useEffect(() => {
    if (settled || typed < UTTERANCE.length) return undefined;

    if (cursor < 0) {
      const id = setTimeout(() => setCursor(0), LEAD_IN_MS);
      return () => clearTimeout(id);
    }

    if (cursor >= STEPS.length) {
      const id = setTimeout(() => {
        setTyped(0);
        setCursor(-1);
        setElapsed(CLOCK_START);
      }, REPLAY_MS);
      return () => clearTimeout(id);
    }

    const id = setTimeout(() => setCursor((c) => c + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [cursor, typed, settled]);

  useEffect(() => {
    if (settled) return undefined;
    const id = setInterval(() => setElapsed((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, [settled]);

  return (
    <figure ref={rootRef} className="wf-run">
      <header className="wf-run__bar">
        <span className="wf-run__live">
          <span className="wf-run__live-dot" data-on={!settled || undefined} />
          On call
        </span>
        <span className="wf-run__runid num">{RUN_ID}</span>
        <span className="wf-run__clock num">{formatClock(elapsed)}</span>
      </header>

      <div className="wf-run__grid">
        <div className="wf-run__ask">
          <div className="wf-run__who">
            <span
              className="wf-run__avatar"
              data-on={!settled || undefined}
              aria-hidden="true"
            >
              {CALLER_INITIALS}
            </span>
            <span className="wf-run__who-text">
              <strong>{CALLER}</strong>
              <em className="num">{CALLER_PHONE}</em>
            </span>
          </div>

          <p className="wf-run__tag">{CALLER_TAG}</p>

          <div className="wf-run__ask-head">
            <Waveform on={listening} />
            <span className="wf-run__ask-label">
              {listening ? "Caller speaking" : "Caller said"}
            </span>
          </div>

          <blockquote className="wf-run__quote">
            <p>
              {shownText}
              {listening ? (
                <span className="wf-run__caret" aria-hidden="true" />
              ) : null}
            </p>
          </blockquote>

          <div className="wf-run__extract" data-shown={!listening || undefined}>
            <span className="wf-run__ask-label">Extracted</span>
            <dl className="wf-run__entities">
              {ENTITIES.map((entity) => (
                <div key={entity.label}>
                  <dt>{entity.label}</dt>
                  <dd>{entity.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="wf-run__panel">
          <div className="wf-run__panel-head">
            <span className="wf-run__ask-label">Run log</span>
            <span className="wf-run__count num">
              {position}/{STEPS.length}
            </span>
          </div>

          <ol className="wf-run__steps">
            {STEPS.map((step, i) => {
              const state =
                i < position ? "done" : i === position ? "active" : "pending";
              const Mark = PLATFORM_MARKS[step.mark];

              return (
                <li
                  key={step.id}
                  className="wf-run__step"
                  data-state={state}
                  data-accent={step.accent || undefined}
                >
                  <span className="wf-run__mark" aria-hidden="true">
                    {Mark ? <Mark size={15} /> : null}
                  </span>

                  <span className="wf-run__body">
                    <span className="wf-run__system">
                      {step.system}
                      <em>{step.action}</em>
                    </span>
                    <span
                      className="wf-run__ref"
                      data-mono={step.mono || undefined}
                    >
                      {step.ref}
                    </span>
                  </span>

                  <span className="wf-run__meta">
                    <span className="wf-run__state">
                      {state === "done"
                        ? "OK"
                        : state === "active"
                          ? "Running"
                          : "Queued"}
                    </span>
                    <span className="wf-run__time num">
                      {state === "pending" ? "" : `${step.ms} ms`}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="wf-run__sent" data-shown={complete || undefined}>
            <span className="wf-run__sent-head">
              WhatsApp to <em className="num">{CALLER_PHONE}</em>
            </span>
            <p className="wf-run__bubble">
              {SENT_MESSAGE}
              <span className="wf-run__bubble-meta num" aria-hidden="true">
                {SENT_AT}
                <TicksIcon />
              </span>
            </p>
          </div>
        </div>
      </div>

      <figcaption className="wf-run__foot">
        <span className="wf-run__foot-stat" data-done={complete || undefined}>
          <CheckIcon />
          {STEPS.length} systems updated in{" "}
          <em className="num">{(TOTAL_MS / 1000).toFixed(2)} s</em>
        </span>
      </figcaption>
    </figure>
  );
}
