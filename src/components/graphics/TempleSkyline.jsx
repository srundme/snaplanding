/** Chennai-inspired line skyline — gopuram + spire, vertical bar texture. */
export default function TempleSkyline() {
  const bars = [
    18, 26, 14, 32, 20, 38, 16, 48, 22, 34, 18, 28, 42, 24, 36, 20, 44, 28, 40, 22,
    52, 30, 44, 26, 38, 20, 48, 32, 42, 24, 36, 18, 50, 28, 40, 22, 34, 16, 46, 28,
  ];

  return (
    <svg
      className="temple-skyline"
      viewBox="0 0 400 120"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={8 + i * 9.6}
          y={120 - h}
          width={3}
          height={h}
          rx={1}
          fill="currentColor"
          opacity={0.28 + (i % 4) * 0.05}
        />
      ))}
      {/* Gopuram */}
      <path
        d="M198 14 L210 56 L186 56 Z M204 4 L222 56 L178 56 Z"
        fill="currentColor"
        opacity="0.42"
      />
      {/* Cathedral spire */}
      <path
        d="M118 22 L126 68 L110 68 Z"
        fill="currentColor"
        opacity="0.3"
      />
      <ellipse cx="292" cy="76" rx="13" ry="9" fill="currentColor" opacity="0.24" />
    </svg>
  );
}
