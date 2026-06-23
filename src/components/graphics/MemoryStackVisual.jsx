export default function MemoryStackVisual() {
  const layers = 5;
  const center = Math.floor(layers / 2);

  return (
    <div className="relative flex h-full min-h-[360px] items-center justify-center voxel-bg overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path d="M0 200 Q200 180 400 200 T800 200" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
        <path d="M0 220 Q200 200 400 220 T800 220" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.6" />
        <path d="M0 240 Q200 220 400 240 T800 240" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.6" />
      </svg>

      <div className="relative flex flex-col items-center gap-3">
        {Array.from({ length: layers }).map((_, i) => (
          <div
            key={i}
            className={`flex h-14 w-14 items-center justify-center border bg-black/60 backdrop-blur-sm transition-all ${
              i === center
                ? "border-white/80 scale-110"
                : "border-white/15"
            }`}
          >
            {i === center && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10c0-4 3-7 6-7s6 3 6 7-3 7-6 7" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <circle cx="10" cy="10" r="2" fill="#ef4444" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
