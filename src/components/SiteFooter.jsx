import { Link } from "react-router-dom";

const productLinks = [
  { label: "Features", href: "/#features" },
  { label: "Industries", href: "/#industries" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
];

const solutionLinks = [
  { label: "AI Voice Agent Platform", href: "/solutions/ai-voice-agent-platform" },
  { label: "Best Voice Agents India", href: "/solutions/best-voice-agents-india" },
  { label: "Low-Cost Voice Agents", href: "/solutions/low-cost-voice-agents-india" },
  { label: "Vapi Alternative India", href: "/solutions/vapi-alternative-india" },
  { label: "Bolna Alternative India", href: "/solutions/bolna-alternative-india" },
  { label: "Retell Alternative India", href: "/solutions/retell-alternative-india" },
];

export default function SiteFooter({ compact = false }) {
  return (
    <footer className={`bg-[#0a0a0a] ${compact ? "border-t border-[#27272a] px-6 py-8" : ""}`}>
      <div className={compact ? "mx-auto max-w-3xl" : ""}>
        {!compact && (
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div>
              <p className="font-semibold text-white">SnapServe by AITEL</p>
              <p className="mt-1 text-sm text-[#52525b]">Chennai · Bengaluru</p>
              <p className="mt-3 max-w-xs text-sm text-[#52525b]">
                AI voice agent platform for Indian business — memory, campaigns, and orchestration.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <nav>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#52525b]">Product</p>
                <div className="mt-3 flex flex-col gap-2">
                  {productLinks.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="text-sm text-[#71717a] transition-colors hover:text-[#14B8A6]"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </nav>
              <nav>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#52525b]">Solutions</p>
                <div className="mt-3 flex flex-col gap-2">
                  {solutionLinks.map((l) => (
                    <Link
                      key={l.label}
                      to={l.href}
                      className="text-sm text-[#71717a] transition-colors hover:text-[#14B8A6]"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}
        <div
          className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${
            compact ? "" : "mt-10 border-t border-[#27272a] pt-8"
          }`}
        >
          <p className="font-mono text-[11px] text-[#3f3f46]">
            © {new Date().getFullYear()} AITEL
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/privacy"
              className="font-mono text-[11px] text-[#52525b] transition-colors hover:text-[#14B8A6]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="font-mono text-[11px] text-[#52525b] transition-colors hover:text-[#14B8A6]"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:support@snapserve.ai"
              className="font-mono text-[11px] text-[#52525b] transition-colors hover:text-[#14B8A6]"
            >
              SUPPORT@SNAPSERVE.AI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
