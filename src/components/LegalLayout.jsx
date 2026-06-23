import { Link } from "react-router-dom";
import SiteFooter from "./SiteFooter";

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
      <div className="legal-prose mt-4">{children}</div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function LegalLayout({ title, lastUpdated, children, crossLink }) {
  return (
    <div className="dot-bg min-h-screen">
      <header className="border-b border-[#27272a] px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M4 10c0-4.5 2.8-8 6-8s6 3.5 6 8"
                stroke="#14B8A6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="10" cy="10" r="2.5" fill="#FF9933" />
            </svg>
            <span className="text-xs font-bold tracking-[0.12em] text-white">SNAPSERVE</span>
          </Link>
          <Link to="/" className="text-sm text-[#71717a] transition-colors hover:text-[#14B8A6]">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <p className="label">Last updated: {lastUpdated}</p>
        <h1 className="headline-lg mt-2">{title}</h1>
        <div className="legal-prose mt-6">{children}</div>
        {crossLink && <div className="legal-prose mt-10 border-t border-[#27272a] pt-8">{crossLink}</div>}
      </main>

      <SiteFooter compact />
    </div>
  );
}

export { Section, BulletList };
