import { motion } from "framer-motion";

const links = [
  { label: "Memory / CRM", href: "#memory-crm" },
  { label: "Smart Reconnect", href: "#smart-reconnect" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Contact", href: "#cta" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-50 hidden h-screen w-[200px] flex-col justify-between py-8 pl-8 pr-4 lg:flex">
      <div>
        <motion.a
          href="#"
          className="group flex items-center gap-2"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:scale-110">
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="20" y2="20">
                <stop stopColor="#FF9933" />
                <stop offset="1" stopColor="#14B8A6" />
              </linearGradient>
            </defs>
            <path d="M4 10c0-4.5 2.8-8 6-8s6 3.5 6 8-2.8 8-6 8" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="10" r="2.5" fill="url(#logo-grad)" />
          </svg>
          <span className="text-sm font-bold tracking-[0.12em] text-white">SNAPSERVE</span>
        </motion.a>

        <nav className="mt-16 flex flex-col items-end gap-5">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-sm text-[#a1a1aa] transition-colors hover:text-white"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <span className="absolute -right-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#14B8A6] opacity-0 transition-opacity group-hover:opacity-100" />
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>

      <motion.p
        className="text-right text-[11px] leading-relaxed text-[#52525b]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        by <span className="text-[#71717a]">AITEL</span>
        <br />
        <span className="text-[#3f3f46]">Chennai · Bengaluru</span>
      </motion.p>
    </aside>
  );
}
