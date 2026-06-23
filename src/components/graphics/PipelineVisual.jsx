export default function PipelineVisual() {
  const boxes = ["ASR", "LLM", "TTS"];

  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center voxel-bg p-8">
      <div className="relative flex flex-col items-center">
        <div className="absolute top-0 bottom-0 w-px bg-white/20" />
        {boxes.map((label, i) => (
          <div key={label} className="relative my-6">
            <div
              className="relative z-10 flex h-16 w-28 items-center justify-center border border-white/30 bg-black/80 font-mono text-sm text-white backdrop-blur-sm"
              style={{
                transform: `rotate(${i === 1 ? 0 : i === 0 ? -8 : 8}deg)`,
              }}
            >
              {label}
            </div>
          </div>
        ))}
        <svg className="absolute -bottom-16 left-1/2 -translate-x-1/2" width="40" height="80" viewBox="0 0 40 80">
          <path
            d="M20 0 Q25 20 15 40 Q5 60 20 80"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />
          <path
            d="M20 0 Q15 20 25 40 Q35 60 20 80"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />
    </div>
  );
}
