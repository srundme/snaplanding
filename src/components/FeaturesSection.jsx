import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import { displayFacts } from "../lib/sampleCallLog";

const features = [
  {
    n: "01",
    tag: "Memory",
    title: "Your agent never forgets a caller.",
    desc: "Every call builds a structured profile — facts, episode summaries, verbatim quotes. The next call starts with full context.",
    accent: "#14B8A6",
    span: "lg:col-span-2 lg:row-span-2",
    visual: "memory",
  },
  {
    n: "02",
    tag: "Resilience",
    title: "Call drops? We redial.",
    desc: "Disconnect detected in under 200ms. Auto-callback resumes exactly where you left off.",
    accent: "#FF9933",
    span: "",
    visual: "reconnect",
  },
  {
    n: "03",
    tag: "Identity",
    title: "AI knows who it's speaking with.",
    desc: "Real-time caller gender detection shapes tone and vocabulary on every call.",
    accent: "#6366f1",
    span: "",
    visual: "identity",
  },
  {
    n: "04",
    tag: "Campaigns",
    title: "Leads come in. Calls go out.",
    desc: "Meta ad forms, website forms, and bulk CSV — auto-dialed with DNC filtering and live queue monitoring.",
    accent: "#22c55e",
    span: "lg:col-span-2",
    visual: "campaigns",
  },
  {
    n: "05",
    tag: "Scheduling",
    title: "Agent books the meeting mid-call.",
    desc: "Google Calendar sync, availability windows, double-booking prevention — no Cal.com, no Zapier.",
    accent: "#a855f7",
    span: "lg:col-span-2",
    visual: "schedule",
  },
];

function FeatureVisual({ type, accent }) {
  if (type === "memory") {
    return (
      <div className="mt-6 grid grid-cols-2 gap-2">
        {displayFacts.slice(0, 4).map((f, i) => (
          <motion.div
            key={f.label}
            className="rounded-lg border border-[#27272a] bg-black/60 p-2.5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            <p className="font-mono text-[8px] uppercase text-[#52525b]">{f.label}</p>
            <p className="mt-0.5 truncate text-xs text-white">{f.value}</p>
          </motion.div>
        ))}
        <div className="col-span-2 flex items-center gap-2 rounded-lg border border-[#14B8A6]/20 bg-[#14B8A6]/5 px-3 py-2 font-mono text-[10px] text-[#14B8A6]">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />
          memory_inject: 28ms · 17 facts loaded
        </div>
      </div>
    );
  }

  if (type === "reconnect") {
    return (
      <div className="mt-6 space-y-2 font-mono text-[10px]">
        {[
          { s: "On call", c: "#22c55e" },
          { s: "Network lost", c: "#ef4444" },
          { s: "Auto-callback · 0.8s", c: "#FF9933" },
          { s: "Resumed · same context", c: accent },
        ].map((step, i) => (
          <motion.div
            key={step.s}
            className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-black/50 px-3 py-2"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: step.c }} />
            <span className="text-[#a1a1aa]">{step.s}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "identity") {
    return (
      <div className="mt-6 rounded-xl border border-[#27272a] bg-black/50 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-[#52525b]">Voice analysis</span>
          <span className="rounded bg-[#6366f1]/20 px-2 py-0.5 font-mono text-[9px] text-[#a78bfa]">
            LIVE
          </span>
        </div>
        <div className="mt-3 flex h-10 items-end gap-0.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-[#6366f1]/60"
              initial={{ height: 4 }}
              animate={{ height: [4, 6 + (i % 5) * 4, 4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.04 }}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] text-[#a1a1aa]">
          Caller gender detected → tone adapted
        </p>
      </div>
    );
  }

  if (type === "campaigns") {
    return (
      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        {[
          { label: "Meta leads", count: "142 queued" },
          { label: "Website form", count: "38 auto-dial" },
          { label: "CSV batch", count: "10K uploaded" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="rounded-lg border border-[#27272a] bg-black/50 p-3"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            <p className="font-mono text-[9px] text-[#52525b]">{item.label}</p>
            <p className="mt-1 text-xs font-medium text-[#22c55e]">{item.count}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-[#27272a] bg-black/50 p-4 font-mono text-[10px]">
      <p className="text-[#52525b]">Google Calendar · synced</p>
      <div className="mt-3 rounded-lg border border-[#a855f7]/30 bg-[#a855f7]/5 p-3">
        <p className="text-[#a855f7]">Booked · Thu 3:00 PM IST</p>
        <p className="mt-1 text-[#a1a1aa]">Demo call confirmed mid-conversation</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="bento-border border-b bg-[#0a0a0a]">
      <div className="bento-border border-b p-8 md:p-12 lg:p-14">
        <Reveal>
          <p className="label">Exclusive features</p>
          <h2 className="headline-lg mt-3 max-w-2xl">
            5 things Vapi, Bolna &amp; Retell{" "}
            <span className="brand-gradient-text">don&apos;t have</span>
          </h2>
          <p className="body-text mt-3 max-w-xl">
            Built from scratch. Not on a roadmap. Shipped today.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="grid gap-px bg-[#27272a] lg:grid-cols-4"
        stagger={0.05}
      >
        {features.map((f) => (
          <StaggerItem
            key={f.n}
            className={`group relative overflow-hidden bg-[#0a0a0a] p-8 md:p-10 ${f.span}`}
          >
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
              style={{ backgroundColor: f.accent }}
            />
            <div className="relative">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm" style={{ color: f.accent }}>
                  {f.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#52525b]">
                  {f.tag}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#71717a]">
                {f.desc}
              </p>
              <FeatureVisual type={f.visual} accent={f.accent} />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
