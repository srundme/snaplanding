import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleCallLog } from "../../lib/sampleCallLog";

const componentColor = {
  Agent: "text-[#a1a1aa]",
  Memory: "text-[#14B8A6]",
  VariableResolver: "text-[#818cf8]",
};

const statusColor = {
  success: "bg-[#14B8A6]/15 text-[#14B8A6]",
  info: "bg-[#27272a] text-[#71717a]",
  error: "bg-[#ef4444]/15 text-[#ef4444]",
};

function formatTs(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3 });
}

function summaryLine(entry) {
  if (entry.component === "Memory" && entry.responsePayload?.profile) {
    const { name, callCount } = entry.responsePayload.profile;
    return `Loaded ${entry.responsePayload.factCount} facts for ${name} (${callCount} calls)`;
  }
  if (entry.component === "VariableResolver" && entry.responsePayload?.resolvedPromptPreview) {
    return "Injected caller memory into system prompt";
  }
  if (entry.requestPayload?.event === "call.end") {
    return `Call ended · ${entry.requestPayload.durationSeconds}s · ${entry.requestPayload.reason}`;
  }
  if (entry.requestPayload?.agentName) {
    return `Session start · ${entry.requestPayload.asrProvider} / ${entry.requestPayload.llmProvider} / ${entry.requestPayload.ttsProvider}`;
  }
  return entry.direction;
}

function LogRow({ entry, expanded, onToggle }) {
  const payload = entry.responsePayload ?? entry.requestPayload;
  const hasPayload = payload != null;

  return (
    <div className="border-b border-[#1e2a3a]/60 last:border-0">
      <button
        type="button"
        onClick={hasPayload ? onToggle : undefined}
        className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors ${
          hasPayload ? "hover:bg-[#14B8A6]/5 cursor-pointer" : "cursor-default"
        }`}
      >
        <span className="shrink-0 font-mono text-[10px] tabular-nums text-[#52525b]">
          {formatTs(entry.ts)}
        </span>
        <span className={`shrink-0 font-mono text-[10px] font-medium ${componentColor[entry.component] ?? "text-[#a1a1aa]"}`}>
          {entry.component}
        </span>
        <span className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase ${statusColor[entry.status] ?? statusColor.info}`}>
          {entry.status}
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-[#71717a]">
          {summaryLine(entry)}
        </span>
        {entry.latencyMs != null && (
          <span className="shrink-0 font-mono text-[9px] text-[#52525b]">{entry.latencyMs}ms</span>
        )}
        {hasPayload && (
          <span className="shrink-0 font-mono text-[9px] text-[#3f3f46]">{expanded ? "▾" : "▸"}</span>
        )}
      </button>

      <AnimatePresence>
        {expanded && hasPayload && (
          <motion.pre
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <code className="block max-h-48 overflow-auto border-t border-[#1e2a3a]/40 bg-[#080b10] px-3 py-2 font-mono text-[10px] leading-relaxed text-[#a1a1aa]">
              {JSON.stringify(payload, null, 2)}
            </code>
          </motion.pre>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CallLogViewer({ compact = false }) {
  const [expandedId, setExpandedId] = useState(3272);
  const [showRaw, setShowRaw] = useState(false);

  if (compact) {
    return (
      <div className="rounded-xl border border-[#1e2a3a] bg-[#0d1219]">
        <div className="flex items-center justify-between border-b border-[#1e2a3a] px-3 py-2">
          <span className="font-mono text-[10px] text-[#5a6a7e]">call_log.json · callId 206</span>
          <span className="font-mono text-[9px] text-[#14B8A6]">{sampleCallLog.length} events</span>
        </div>
        <pre className="max-h-40 overflow-auto p-3 font-mono text-[9px] leading-relaxed text-[#71717a]">
          {JSON.stringify(sampleCallLog, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1e2a3a] bg-[#0b0f14] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1e2a3a] bg-[#0d1219] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
          </div>
          <span className="font-mono text-[11px] text-[#5a6a7e]">Call log</span>
          <span className="rounded bg-[#111820] px-2 py-0.5 font-mono text-[9px] text-[#71717a]">
            callId 206 · agent 5
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowRaw(false)}
            className={`rounded-lg px-2.5 py-1 font-mono text-[9px] transition-colors ${
              !showRaw ? "bg-[#27272a] text-white" : "text-[#52525b] hover:text-[#a1a1aa]"
            }`}
          >
            Trace
          </button>
          <button
            type="button"
            onClick={() => setShowRaw(true)}
            className={`rounded-lg px-2.5 py-1 font-mono text-[9px] transition-colors ${
              showRaw ? "bg-[#27272a] text-white" : "text-[#52525b] hover:text-[#a1a1aa]"
            }`}
          >
            JSON
          </button>
        </div>
      </div>

      {showRaw ? (
        <pre className="max-h-[420px] overflow-auto p-4 font-mono text-[10px] leading-relaxed text-[#a1a1aa]">
          {JSON.stringify(sampleCallLog, null, 2)}
        </pre>
      ) : (
        <div className="max-h-[420px] overflow-y-auto">
          {sampleCallLog.map((entry) => (
            <LogRow
              key={entry.id}
              entry={entry}
              expanded={expandedId === entry.id}
              onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
