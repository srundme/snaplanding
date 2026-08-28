import { Link } from "react-router-dom";
import SnapServeLogo from "./SnapServeLogo";
import { SIGNUP_URL } from "../lib/links";

const platformLinks = [
  { label: "What’s included", href: "/#differentiator" },
  { label: "Meeting bot", href: "/#meeting-bot" },
  { label: "Caller memory", href: "/#memory-crm" },
  { label: "Auto-redial", href: "/#smart-reconnect" },
  { label: "How a dial runs", href: "/#how-it-works" },
  { label: "Pay per minute", href: "/#pricing" },
];

/* Labels stay human; URLs keep SEO targets. */
const guideLinks = [
  { label: "Platform overview", href: "/solutions/ai-voice-agent-platform" },
  { label: "Buyer guide — India", href: "/solutions/best-voice-agents-india" },
  { label: "Cost without lock-in", href: "/solutions/low-cost-voice-agents-india" },
  { label: "Moving off Vapi", href: "/solutions/vapi-alternative-india" },
  { label: "Moving off Bolna", href: "/solutions/bolna-alternative-india" },
  { label: "Moving off Retell", href: "/solutions/retell-alternative-india" },
];

const companyLinks = [
  { label: "Your stack stays yours", href: "/#integrations-stack" },
  { label: "Built for live outbound", href: "/#industries" },
  { label: "Calls that move money", href: "/#trust" },
  { label: "Field notes", href: "/blog", router: true },
  { label: "Live console", href: SIGNUP_URL, external: true },
];

const legalLinks = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];

function FooterLink({ href, router, external, children }) {
  const className =
    "footer-link text-[13px] text-ink-2 transition-colors";

  if (router) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(external ? { rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function SiteFooter({ compact = false }) {
  return (
    <footer className="site-footer">
      {!compact && (
        <div className="grid gap-10 border-b border-line pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-14">
          <div>
            <SnapServeLogo variant="full" size="md" asLink href="/" />
            <p className="mt-4 max-w-[18rem] text-[13.5px] leading-relaxed text-ink-2">
              The layer between your phone trunk and your voice providers —
              so every dial remembers, recovers, and writes back.
            </p>
            <p className="mt-5 text-[12.5px] text-ink-2">
              Chennai · Bengaluru
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <nav aria-label="Platform">
              <p className="label text-ink-3">Platform</p>
              <div className="mt-3.5 flex flex-col gap-2.5">
                {platformLinks.map((l) => (
                  <FooterLink key={l.label} href={l.href}>
                    {l.label}
                  </FooterLink>
                ))}
              </div>
            </nav>

            <nav aria-label="Guides">
              <p className="label text-ink-3">Guides</p>
              <div className="mt-3.5 flex flex-col gap-2.5">
                {guideLinks.map((l) => (
                  <FooterLink key={l.label} href={l.href} router>
                    {l.label}
                  </FooterLink>
                ))}
              </div>
            </nav>

            <nav aria-label="Company">
              <p className="label text-ink-3">Company</p>
              <div className="mt-3.5 flex flex-col gap-2.5">
                {companyLinks.map((l) => (
                  <FooterLink
                    key={l.label}
                    href={l.href}
                    router={l.router}
                    external={l.external}
                  >
                    {l.label}
                  </FooterLink>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      <div
        className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${
          compact ? "" : "pt-6"
        }`}
      >
        <p className="text-[12px] text-ink-3">
          © {new Date().getFullYear()} SnapServe
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {legalLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="footer-link text-[12px] text-ink-3 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:support@snapserve.ai"
            className="footer-link text-[12px] text-ink-3 transition-colors"
          >
            support@snapserve.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
