import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    id: "active",
    status: "On call · 02:14",
    statusColor: "#22c55e",
    lines: [
      { role: "Agent", text: "Your ICICI policy IL-28491 renews March 15. Shall I send the payment link?" },
      { role: "Caller", text: "Yes, but network is bad here. Call me back if we drop." },
      { role: "Agent", text: "Noted. I'll continue right where we left off." },
    ],
  },
  {
    id: "drop",
    status: "Network lost",
    statusColor: "#ef4444",
    lines: [],
    alert: "Signal dropped — call disconnected",
  },
  {
    id: "reconnect",
    status: "Auto-callback · 0.8s",
    statusColor: "#FF9933",
    lines: [],
    alert: "SnapServe initiated outbound callback",
    timer: "< 1s",
  },
  {
    id: "resume",
    status: "Reconnected · same context",
    statusColor: "#14B8A6",
    lines: [
      { role: "Agent", text: "Sorry — we got disconnected due to network issues." },
      { role: "Agent", text: "Picking up where we left off: your IL-28491 renewal on March 15. Sending that payment link now." },
      { role: "Caller", text: "Wow, you didn't ask me anything again." },
    ],
    badge: "No re-introduction. No repeated questions.",
  },
];

export default function SmartReconnect() {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const current = STEPS[step];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 4200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative min-h-[420px] overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,153,51,0.07)_0%,transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(20,184,166,0.08)_0%,transparent_50%)]" />

      {/* Phone frame */}
      <div className="relative mx-auto max-w-sm p-6 pt-8">
        <div className="overflow-hidden rounded-[28px] border border-[#27272a] bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between border-b border-[#27272a] px-5 py-3">
            <div className="flex items-center gap-2">
              <motion.span
                className="h-2 w-2 rounded-full"
                animate={{ backgroundColor: current.statusColor }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                key={current.status}
                className="font-mono text-[11px] text-[#a1a1aa]"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {current.status}
              </motion.span>
            </div>
            <span className="font-mono text-[10px] text-[#52525b]">SnapServe</span>
          </div>

          <div className="relative min-h-[280px] p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3"
              >
                {current.alert && (
                  <motion.div
                    className={`rounded-xl border px-4 py-3 text-center text-sm ${
                      current.id === "drop"
                        ? "border-red-500/30 bg-red-500/10 text-red-300"
                        : "border-[#FF9933]/30 bg-[#FF9933]/10 text-[#FF9933]"
                    }`}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                  >
                    {current.alert}
                    {current.timer && (
                      <p className="mt-1 font-mono text-2xl font-semibold text-white">{current.timer}</p>
                    )}
                  </motion.div>
                )}

                {current.lines.map((line, i) => (
                  <motion.div
                    key={`${current.id}-${i}`}
                    initial={{ opacity: 0, x: line.role === "Agent" ? -12 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.2 }}
                    className={`max-w-[90%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                      line.role === "Agent"
                        ? "mr-auto bg-[#111] text-[#d4d4d8] border border-[#27272a]"
                        : "ml-auto bg-[#14B8A6]/15 text-[#a7f3d0] border border-[#14B8A6]/20"
                    }`}
                  >
                    <span className="mb-1 block font-mono text-[9px] uppercase tracking-wider text-[#52525b]">
                      {line.role}
                    </span>
                    {line.text}
                  </motion.div>
                ))}

                {current.badge && (
                  <motion.p
                    className="pt-2 text-center font-mono text-[10px] text-[#14B8A6]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {current.badge}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-1.5 border-t border-[#27272a] py-3">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(i)}
                className={`h-1 rounded-full transition-all ${
                  i === step ? "w-6 bg-[#14B8A6]" : "w-2 bg-[#27272a] hover:bg-[#3f3f46]"
                }`}
                aria-label={`Step ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Floating intelligence badge */}
        <motion.div
          className="absolute -right-2 top-16 hidden rounded-xl border border-[#27272a] bg-black/90 px-3 py-2 backdrop-blur-md md:block"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="font-mono text-[9px] text-[#52525b]">INTENT</p>
          <p className="text-xs text-white">Callback requested</p>
        </motion.div>
      </div>
    </div>
  );
}
