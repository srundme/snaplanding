import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

const features = [
  {
    n: "01",
    tag: "Memory",
    title: "Your agent never forgets a caller.",
    desc: "Every call builds a structured profile — facts, episode summaries, verbatim quotes. The next call starts with full context. No repeated intros. No forgotten promises.",
  },
  {
    n: "02",
    tag: "Resilience",
    title: "Call drops mid-conversation? We redial.",
    desc: "SnapServe detects the disconnect in under 200ms and calls back automatically. The caller resumes exactly where they left off — no re-intro, no repeated questions.",
  },
  {
    n: "03",
    tag: "Identity",
    title: "AI knows who it's speaking with.",
    desc: "Real-time caller gender detection on every call — SnapServe identifies whether the caller is male or female from their voice, so your agent adapts tone and vocabulary to who they're actually talking to.",
  },
  {
    n: "04",
    tag: "Campaigns",
    title: "Leads come in. Calls go out.",
    desc: "Connect your Meta ad form and website form — new leads are auto-dialed. Upload bulk CSV for outbound batches. DNC filtering, retry logic, and live queue monitoring built in. Not an API you stitch together — a full outbound engine.",
  },
  {
    n: "05",
    tag: "Scheduling",
    title: "Agent books the meeting mid-call.",
    desc: "Built-in Google Calendar sync, availability windows, and double-booking prevention. The agent books before the call ends — no Cal.com, no Zapier, no third party.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bento-border border-b bg-[#0a0a0a] p-8 md:p-12 lg:p-14">
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

      <Stagger className="mt-12 flex flex-col gap-px bg-[#27272a]" stagger={0.06}>
        {features.map((f) => (
          <StaggerItem key={f.n} className="bento-cell-hover bg-[#0a0a0a] p-8 md:p-10">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-[#FF9933]">{f.n}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#52525b]">
                {f.tag}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#71717a]">{f.desc}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
