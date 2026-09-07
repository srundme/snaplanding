import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import SnapServeLogo from "./SnapServeLogo";
import {
  SIGNUP_URL,
  PARTNER_URL,
  X_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
} from "../lib/links";

const platformLinks = [
  { label: "Platform overview", href: "/#differentiator" },
  { label: "Meeting bot", href: "/#meeting-bot" },
  { label: "Caller memory", href: "/#memory-crm" },
  { label: "Auto-redial", href: "/#smart-reconnect" },
  { label: "Integrations", href: "/#integrations-stack" },
  { label: "Pricing", href: "/#pricing" },
];

const guideLinks = [
  { label: "Voice AI in India", href: "/solutions/best-voice-agents-india" },
  { label: "Pricing guide", href: "/solutions/low-cost-voice-agents-india" },
  { label: "Vapi migration", href: "/solutions/vapi-alternative-india" },
  { label: "Bolna migration", href: "/solutions/bolna-alternative-india" },
];

const companyLinks = [
  { label: "Industries", href: "/#industries" },
  { label: "Trust & controls", href: "/#trust" },
  { label: "Partner with us", href: PARTNER_URL, router: true },
  { label: "Blog", href: "/blog", router: true },
  { label: "Live console", href: SIGNUP_URL, external: true },
];

const legalLinks = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];

const socialLinks = [
  { label: "X (Twitter)", href: X_URL, Icon: FaXTwitter },
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: FaLinkedin },
  { label: "Instagram", href: INSTAGRAM_URL, Icon: FaInstagram },
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
            <p className="mt-5 text-[12.5px] text-ink-2">
              Chennai · Bengaluru
            </p>
            <div className="footer-social mt-5 flex items-center gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="footer-social__link"
                  aria-label={label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
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
          © {new Date().getFullYear()} SnapServe.ai
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
