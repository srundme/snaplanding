import { Link } from "react-router-dom";
import SiteFooter from "./SiteFooter";
import SnapServeLogo from "./SnapServeLogo";

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
    <div className="dot-bg min-h-screen">
      <header className="border-b border-[#27272a] px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <SnapServeLogo variant="full" size="sm" theme="dark" asLink href="/" />
          <Link to={backHref} className="text-sm text-[#71717a] transition-colors hover:text-[#14B8A6]">
            {backLabel}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {eyebrow && <p className="label">{eyebrow}</p>}
        <h1 className="headline-lg mt-2 max-w-3xl">{title}</h1>
        {description && <p className="body-text mt-4 max-w-2xl">{description}</p>}
        <div className="legal-prose mt-8">{children}</div>
        {footer}
      </main>

      <SiteFooter compact />
    </div>
  );
}
