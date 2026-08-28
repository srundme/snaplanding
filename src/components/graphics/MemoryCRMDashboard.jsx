import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { callerProfile } from "../../lib/sampleCallLog";

/*
  Memory ≠ call UI (that’s Meetings).
  Signature: the professional caller brief — ready before the agent answers.
*/

const EASE = [0.22, 1, 0.36, 1];

const ROWS = [
  { label: "Budget", value: "₹75L" },
  { label: "Preferred area", value: "Tambaram" },
  { label: "Also asked", value: "Red Hills" },
  { label: "Language", value: "Tamil / English" },
  { label: "Callback window", value: "After 6 PM" },
  { label: "Intent", value: "Villa under 75L" },
];

const LAYERS = [
  { name: "Facts", detail: "Budget, area, language" },
  { name: "Episodes", detail: "3 prior conversations" },
  { name: "Verbatim", detail: "Last ask kept intact" },
];

export default function MemoryCRMDashboard() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const enter = (delay, y = 8) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y },
          transition: { delay, duration: 0.5, ease: EASE },
        };

  return (
    <div className="mem-brief" ref={ref}>
      <motion.header className="mem-brief-head" {...enter(0.05)}>
        <div>
          <p className="mem-brief-kicker">Caller brief</p>
          <h3 className="mem-brief-name">{callerProfile.name}</h3>
          <p className="mem-brief-meta">
            Returning · {callerProfile.callCount ?? 52} calls · +91 98••• ··210
          </p>
        </div>
        <div className="mem-brief-ready">
          <span className="mem-brief-ready-dot" aria-hidden="true" />
          Ready for next turn
        </div>
      </motion.header>

      <motion.blockquote className="mem-brief-quote" {...enter(0.14)}>
        <p>“Can you check options near Red Hills?”</p>
        <footer>Last said · Today 09:11</footer>
      </motion.blockquote>

      <motion.div className="mem-brief-grid" {...enter(0.22)}>
        <div className="mem-brief-rows">
          <p className="mem-brief-section">Known about this caller</p>
          <dl>
            {ROWS.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mem-brief-layers">
          <p className="mem-brief-section">Memory layers</p>
          <ul>
            {LAYERS.map((layer, i) => (
              <li key={layer.name}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{layer.name}</strong>
                  <p>{layer.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mem-brief-foot">
            Injected into the agent turn automatically — any language your providers support.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
