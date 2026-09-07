import { Link } from "react-router-dom";
import SiteFooter from "./SiteFooter";
import SnapServeLogo from "./SnapServeLogo";
import { SIGNUP_URL } from "../lib/links";

export default function ContentLayout({
  eyebrow,
  title,
  description,
  children,
  backHref = "/",
  backLabel = "← Back to home",
  footer,
}) {
  return (
    <div className="dot-bg relative min-h-screen">
      <div className="grain-layer" aria-hidden="true" />

      <header className="sticky top-0 z-30 border-b border-line bg-[#050607]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <SnapServeLogo variant="full" size="sm" asLink href="/" />
          <div className="flex items-center gap-4">
            <Link
              to={backHref}
              className="hidden text-[13px] text-ink-3 transition-colors hover:text-ink sm:inline"
            >
              {backLabel}
            </Link>
            <a
              href={SIGNUP_URL}
              className="rounded-full border border-[#14B8A6]/40 bg-[#14B8A6]/10 px-3.5 py-1.5 text-xs font-medium text-[#14B8A6] transition-colors hover:bg-[#14B8A6]/20"
              rel="noopener noreferrer"
            >
              Start free
            </a>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-6 py-12 md:py-16">
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#14B8A6]/60" />
            <p className="label text-ink-2">{eyebrow}</p>
          </div>
        )}
        <h1 className="headline-lg mt-4 max-w-3xl text-balance">{title}</h1>
        {description && (
          <p className="body-text mt-4 max-w-2xl text-pretty">{description}</p>
        )}
        <div className="legal-prose mt-10">{children}</div>
        {footer}
      </main>

      <div className="relative border-t border-line bg-surface-0 px-6 py-6 md:px-10">
        <SiteFooter compact />
      </div>
    </div>
  );
}
