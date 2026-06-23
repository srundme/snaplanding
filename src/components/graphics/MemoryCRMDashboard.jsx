import { motion } from "framer-motion";
import {
  callerProfile,
  displayFacts,
  episodeSummary,
  callHistory,
  factCount,
} from "../../lib/sampleCallLog";

const tabs = ["Overview", "Facts", "Episodes", "Call History"];

function StatCard({ icon, label, value, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-3 rounded-xl border border-[#1e2a3a] bg-[#111820] px-4 py-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2535] text-sm text-[#5b9fd4]">
        {icon}
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-[#5a6a7e]">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </motion.div>
  );
}

const initials = callerProfile.name
  .split(" ")
  .map((n) => n[0])
  .join("")
  .slice(0, 2);

export default function MemoryCRMDashboard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1e2a3a] bg-[#0b0f14] shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between border-b border-[#1e2a3a] bg-[#0d1219] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
          </div>
          <span className="font-mono text-[11px] text-[#5a6a7e]">Memory / CRM</span>
        </div>
        <motion.span
          className="flex items-center gap-1.5 rounded-full bg-[#14B8A6]/10 px-2 py-0.5 font-mono text-[9px] text-[#14B8A6]"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />
          LIVE
        </motion.span>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="border-b border-[#1e2a3a] bg-[#0d1219] p-3 lg:w-44 lg:border-b-0 lg:border-r">
          <div className="mb-3 rounded-lg border border-[#1e2a3a] bg-[#111820] px-3 py-2 text-[11px] text-[#5a6a7e]">
            Search callers…
          </div>
          <motion.div
            className="rounded-xl border border-[#3b82f6]/40 bg-[#111820] p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a2535] text-[10px] font-medium text-[#5b9fd4]">
                {initials}
              </div>
              <div>
                <p className="text-xs font-medium text-white">{callerProfile.name}</p>
                <p className="text-[9px] text-[#5a6a7e]">Just now</p>
              </div>
            </div>
            <div className="mt-2 flex gap-2 text-[9px] text-[#5a6a7e]">
              <span><b className="text-[#a1a1aa]">{callerProfile.callCount}</b> calls</span>
              <span><b className="text-[#a1a1aa]">{factCount}</b> facts</span>
            </div>
          </motion.div>
          <div className="mt-2 rounded-xl border border-[#1e2a3a] p-3 opacity-40">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#1a2535]" />
              <div className="h-3 w-16 rounded bg-[#1a2535]" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-3 md:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2535] text-sm font-medium text-[#5b9fd4]">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{callerProfile.name}</p>
                  <span className="text-[#fbbf24]">★</span>
                </div>
                <p className="text-[10px] text-[#5a6a7e]">browser · Chennai · Caller</p>
              </div>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button type="button" className="rounded-lg border border-[#1e2a3a] px-3 py-1.5 text-[10px] text-[#a1a1aa]">
                Add note
              </button>
            </div>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            <StatCard icon="📞" label="Total Calls" value={String(callerProfile.callCount)} delay={0.1} />
            <StatCard icon="📊" label="Facts" value={String(factCount)} delay={0.15} />
            <StatCard icon="📚" label="Recent Calls" value="5" delay={0.2} />
            <StatCard icon="🕐" label="Last Active" value="Just now" delay={0.25} />
          </div>

          <div className="mb-3 flex gap-4 border-b border-[#1e2a3a]">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                className={`pb-2 text-[11px] transition-colors ${
                  i === 0
                    ? "border-b-2 border-[#3b82f6] font-medium text-white"
                    : "text-[#5a6a7e] hover:text-[#a1a1aa]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <motion.div
              className="rounded-xl border border-[#1e2a3a] bg-[#111820] p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="mb-2 text-[11px] font-medium text-white">Caller Information</p>
              {[
                ["Name", callerProfile.name],
                ["Last active", "Just now"],
                ["Total calls", String(callerProfile.callCount)],
                ["Preferred language", "Tamil + English (regional)"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[#1e2a3a]/50 py-1.5 text-[10px] last:border-0">
                  <span className="text-[#5a6a7e]">{k}</span>
                  <span className="text-[#a1a1aa]">{v}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="rounded-xl border border-[#1e2a3a] bg-[#111820] p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-medium text-white">Facts</p>
                <span className="text-[9px] text-[#3b82f6]">View all {factCount} facts</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {displayFacts.map((f, i) => (
                  <motion.div
                    key={f.label}
                    className="rounded-lg border border-[#1e2a3a] bg-[#0d1219] p-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[10px]">{f.icon}</span>
                      <span className="text-[8px] text-[#5a6a7e]">{f.label}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] font-medium text-white">{f.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-xl border border-[#1e2a3a] bg-[#111820] p-3 md:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <p className="mb-2 text-[11px] font-medium text-white">Episodes</p>
              <div className="rounded-lg border border-[#14B8A6]/20 bg-[#14B8A6]/5 p-2.5">
                <p className="text-[9px] text-[#14B8A6]">Today, 09:26 IST</p>
                <p className="mt-1 text-[10px] leading-relaxed text-[#a1a1aa]">{episodeSummary}</p>
              </div>
              <p className="mt-2 text-[9px] text-[#3b82f6]">View all episodes</p>
            </motion.div>

            <motion.div
              className="rounded-xl border border-[#1e2a3a] bg-[#111820] p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="mb-2 text-[11px] font-medium text-white">Call History</p>
              {callHistory.map((c, i) => (
                <div
                  key={c.id}
                  className={`flex items-center justify-between py-2 text-[10px] ${
                    i < callHistory.length - 1 ? "border-b border-[#1e2a3a]/50" : ""
                  }`}
                >
                  <div>
                    <p className="text-[#a1a1aa]">
                      Call #{c.id} · {c.date}
                    </p>
                    <p className="text-[9px] text-[#5a6a7e]">{c.channel}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#a1a1aa]">{c.duration}</p>
                    <button type="button" className="text-[9px] text-[#3b82f6]">
                      View log
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
