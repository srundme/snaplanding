export default function PlatformMockup() {
  return (
    <div className="relative mx-auto max-w-4xl py-8">
      <div className="relative">
        {/* Main window */}
        <div className="relative z-10 rounded-xl border border-[#27272a] bg-[#111] shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 border-b border-[#27272a] px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27272a]" />
            <span className="ml-2 font-mono text-[10px] text-[#52525b]">snapserve-console</span>
          </div>

          <div className="flex">
            <div className="flex w-12 flex-col items-center gap-4 border-r border-[#27272a] py-4">
              {["⌂", "✦", "⎘", "⚒"].map((icon) => (
                <span key={icon} className="text-sm text-[#52525b]">{icon}</span>
              ))}
            </div>

            <div className="flex-1">
              <div className="flex border-b border-[#27272a]">
                {["Memory", "Providers", "Latency", "Settings"].map((tab, i) => (
                  <button
                    key={tab}
                    type="button"
                    className={`px-4 py-2.5 text-xs ${
                      i === 0 ? "border-b border-white text-white" : "text-[#52525b]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-2 px-4">
                  <span className="rounded border border-[#27272a] px-2 py-1 text-[10px] text-[#71717a]">Voice</span>
                  <span className="rounded border border-[#27272a] px-2 py-1 text-[10px] text-[#71717a]">Tools (3)</span>
                  <span className="rounded bg-[#22c55e]/20 px-2 py-1 text-[10px] text-[#22c55e]">Save</span>
                </div>
              </div>

              <div className="p-5 font-mono text-[12px] leading-relaxed text-[#a1a1aa]">
                <p className="text-[#71717a]"># Caller memory config</p>
                <p className="mt-2">
                  <span className="text-[#a855f7]">caller_id</span>: +91XXXXXXXXXX
                </p>
                <p>
                  <span className="text-[#a855f7]">layers</span>: [transcripts, episodes, facts]
                </p>
                <p>
                  <span className="text-[#a855f7]">languages</span>: all regional (ta, te, hi, bn, mr, gu, kn, ml, …)
                </p>
                <p className="mt-3 text-[#71717a]">
                  # Auto-inject on every turn via OpenAI-compatible proxy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat overlay */}
        <div className="absolute -right-4 top-12 z-20 w-72 rounded-xl border border-[#27272a] bg-[#0a0a0a] shadow-2xl shadow-black/60 md:-right-16">
          <div className="flex items-center justify-between border-b border-[#27272a] px-4 py-2.5">
            <span className="text-xs text-[#71717a]">Live Call</span>
            <span className="rounded bg-[#22c55e]/20 px-2 py-0.5 text-[10px] text-[#22c55e]">Test Agent</span>
          </div>
          <div className="space-y-3 p-4 text-xs">
            <div>
              <span className="text-[#52525b]">User · </span>
              <span className="text-[#a1a1aa]">Last time you said renewal is next week...</span>
            </div>
            <div>
              <span className="text-[#52525b]">Agent · </span>
              <span className="text-[#a1a1aa]">Yes, your ICICI policy IL-28491 renews March 15.</span>
            </div>
            <div className="rounded border border-[#27272a] bg-[#111] p-2 font-mono text-[10px] text-[#71717a]">
              memory_inject: 28ms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
