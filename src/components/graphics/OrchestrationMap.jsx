import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ARCH_NODE_ICONS } from "./archNodeIconMap";
import { gsap } from "../../lib/gsap";
import SnapServeLogo, { LogoWordmark } from "../SnapServeLogo";

const GRAPH_PATHS = [
  { id: "trunk", d: "M 72 210 L 360 210 L 600 210 L 888 210" },
  { id: "feed-orch", d: "M 208 98 C 208 148, 290 188, 360 205" },
  { id: "feed-biz", d: "M 752 98 C 752 148, 670 188, 600 205" },
  { id: "feed-mem", d: "M 208 322 C 208 272, 290 232, 360 215" },
  { id: "feed-lang", d: "M 752 322 C 752 272, 670 232, 600 215" },
];

const NODES = [
  {
    id: "telephony",
    title: "Telephony",
    x: 7.5,
    y: 50,
    icon: "telephony",
    ring: "sm",
  },
  {
    id: "orch",
    title: "Orchestration",
    sub: "Routing · fallbacks",
    x: 21.7,
    y: 23.8,
    icon: "orch",
    ring: "sm",
  },
  {
    id: "business",
    title: "Business",
    sub: "CRM · campaigns",
    x: 78.3,
    y: 23.8,
    icon: "business",
    ring: "sm",
  },
  {
    id: "hub",
    title: "SnapServe",
    sub: "Orchestration layer",
    x: 37.5,
    y: 50,
    isHub: true,
  },
  {
    id: "memory",
    title: "Memory",
    sub: "Context · identity",
    x: 21.7,
    y: 76.7,
    icon: "memory",
    ring: "sm",
  },
  {
    id: "languages",
    title: "Languages",
    sub: "11+ scripts",
    x: 78.3,
    y: 76.7,
    icon: "languages",
    ring: "sm",
  },
  {
    id: "conversation",
    title: "Conversation",
    sub: "Live thread",
    x: 62.5,
    y: 50,
    icon: "conversation",
    ring: "md",
  },
  {
    id: "outcome",
    title: "Outcome",
    sub: "CRM write-back",
    x: 92.5,
    y: 50,
    icon: "outcome",
    ring: "md",
    accent: true,
  },
];

function runSignal(path, dot, duration = 3.2) {
  const length = path.getTotalLength();
  const state = { t: 0 };
  return gsap.to(state, {
    t: 1,
    duration,
    repeat: -1,
    ease: "none",
    onUpdate: () => {
      const point = path.getPointAtLength(state.t * length);
      dot.setAttribute("cx", String(point.x));
      dot.setAttribute("cy", String(point.y));
    },
  });
}

export default function OrchestrationMap() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const paths = gsap.utils.toArray("[data-orch-path]", root);
      const nodes = gsap.utils.toArray("[data-orch-node]", root);
      const signal = root.querySelector("[data-orch-signal]");

      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });

      if (reduce) {
        gsap.set(paths, { strokeDashoffset: 0 });
        gsap.set(nodes, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(nodes, { opacity: 0, scale: 0.88 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power2.inOut",
      })
        .to(
          nodes,
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.35)" },
          "-=0.75",
        );

      const trunk = root.querySelector("#trunk");
      let signalTween = null;
      if (trunk && signal) {
        signalTween = runSignal(trunk, signal);
      }

      return () => signalTween?.kill();
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="orch-graph"
      aria-label="SnapServe orchestrates telephony, memory, business systems, and languages into conversation outcomes"
    >
      <div className="orch-graph__mesh" aria-hidden="true" />

      <svg
        className="orch-graph__svg"
        viewBox="0 0 960 420"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orch-graph-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(94,234,212,0.08)" />
            <stop offset="45%" stopColor="rgba(94,234,212,0.42)" />
            <stop offset="100%" stopColor="rgba(94,234,212,0.1)" />
          </linearGradient>
          <radialGradient id="orch-graph-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(20,184,166,0.16)" />
            <stop offset="100%" stopColor="rgba(20,184,166,0)" />
          </radialGradient>
        </defs>

        <circle cx="480" cy="210" r="118" fill="url(#orch-graph-glow)" />

        {GRAPH_PATHS.map((spec) => (
          <path
            key={spec.id}
            id={spec.id}
            data-orch-path
            d={spec.d}
            fill="none"
            stroke="url(#orch-graph-grad)"
            strokeWidth={spec.id === "trunk" ? 1.75 : 1.25}
            strokeLinecap="round"
          />
        ))}

        <circle
          data-orch-signal
          r="4.5"
          fill="#5eead4"
          className="orch-graph__signal"
        />
      </svg>

      <div className="orch-graph__stage">
        {NODES.map(
          ({ id, title, sub, x, y, icon, isHub, ring, accent }) => {
            const NodeIcon = icon ? ARCH_NODE_ICONS[icon] : null;

            return (
            <article
              key={id}
              className={[
                "orch-graph__node",
                `orch-graph__node--${id}`,
                isHub && "orch-graph__node--hub",
                accent && "orch-graph__node--accent",
              ]
                .filter(Boolean)
                .join(" ")}
              data-orch-node
              style={{ "--nx": `${x}%`, "--ny": `${y}%` }}
            >
              {isHub ? (
                <div className="orch-graph__hub-mark">
                  <span className="orch-graph__ring orch-graph__ring--hub">
                    <SnapServeLogo variant="icon" size="sm" theme="dark" />
                  </span>
                  <span className="orch-graph__wordmark">
                    <LogoWordmark size="sm" theme="dark" />
                  </span>
                  <span className="orch-graph__sub">{sub}</span>
                </div>
              ) : (
                <>
                  <span className={`orch-graph__ring orch-graph__ring--${ring}`}>
                    {NodeIcon ? <NodeIcon /> : null}
                  </span>
                  <span className="orch-graph__label">{title}</span>
                  {sub ? <span className="orch-graph__sub">{sub}</span> : null}
                </>
              )}
            </article>
            );
          },
        )}
      </div>
    </div>
  );
}
