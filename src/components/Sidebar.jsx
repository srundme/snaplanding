import { motion } from "framer-motion";
import SnapServeLogo from "./SnapServeLogo";
import { APP_URL } from "../lib/links";

const links = [
  { label: "Memory / CRM", href: "#memory-crm" },
  { label: "Smart Reconnect", href: "#smart-reconnect" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Contact", href: APP_URL },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-50 hidden h-screen w-[200px] flex-col justify-between py-8 pl-8 pr-4 lg:flex">
      <div>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SnapServeLogo variant="full" size="sm" theme="dark" asLink href="/" />
        </motion.div>

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
