import { motion, useReducedMotion } from "framer-motion";

const items = [
  "Caller Memory",
  "Auto-Redial",
  "Caller Gender Detection",
  "Campaign Engine",
  "Native Scheduling",
  "BYOP",
  "Live Command Center",
  "Indian Telephony",
  "Vapi · Bolna · Retell don't have this",
];

function TickerTrack() {
  const content = [...items, ...items];
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {content.map((item, i) => (
        <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-8 whitespace-nowrap">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
            {item}
          </span>
          <span className="text-[#3f3f46]">·</span>
        </span>
      ))}
    </div>
  );
}

export default function LiveTicker() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="border-b border-[#27272a] bg-black px-6 py-4">
        <p className="text-center font-mono text-[10px] uppercase tracking-wider text-[#52525b]">
          {items.join(" · ")}
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-b border-[#27272a] bg-black py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <TickerTrack />
        <TickerTrack />
      </motion.div>
    </div>
  );
}
