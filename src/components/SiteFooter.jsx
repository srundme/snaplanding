import { Link } from "react-router-dom";

export default function SiteFooter({ compact = false }) {
  return (
    <footer className={`bg-[#0a0a0a] ${compact ? "border-t border-[#27272a] px-6 py-8" : ""}`}>
      <div className={compact ? "mx-auto max-w-3xl" : ""}>
        {!compact && (
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="font-semibold text-white">SnapServe by AITEL</p>
              <p className="mt-1 text-sm text-[#52525b]">Chennai · Bengaluru</p>
            </div>
            <nav className="flex flex-wrap gap-6">
              {[
                { label: "Product", href: "/#solution" },
                { label: "How it works", href: "/#how-it-works" },
                { label: "Compliance", href: "/#compliance" },
                { label: "Contact", href: "mailto:support@snapserve.ai" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-[#52525b] transition-colors hover:text-[#14B8A6]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
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
