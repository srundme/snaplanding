import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import SnapServeLogo from "./SnapServeLogo";
import CursorGlow from "./CursorGlow";
import { SIGNUP_URL } from "../lib/links";

const links = [
  { label: "Product", href: "#differentiator" },
  { label: "Meetings", href: "#meeting-bot" },
  { label: "Memory", href: "#memory-crm" },
  { label: "Auto-redial", href: "#smart-reconnect" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

/* The section crossing the upper third of the viewport is the one being read */
const ACTIVE_LINE = 0.45;
const BAND = 5;
const SCROLL_SETTLE = 900;

export default function Sidebar() {
  const [activeHref, setActiveHref] = useState(null);
  const lockedRef = useRef(false);
  const unlockTimer = useRef(0);

  const resolveActive = useCallback(() => {
    const line = window.innerHeight * ACTIVE_LINE;
    const passed = links
      .map((link) => {
        const el = document.getElementById(link.href.slice(1));
        return el ? { href: link.href, top: el.getBoundingClientRect().top } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.top - b.top)
      .filter((entry) => entry.top <= line);

    setActiveHref(passed.length ? passed[passed.length - 1].href : null);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean);

    if (!sections.length) return undefined;

    // Fires as a section edge crosses the detection band, not on every scroll frame
    const observer = new IntersectionObserver(
      () => {
        if (!lockedRef.current) resolveActive();
      },
      {
        rootMargin: `-${ACTIVE_LINE * 100}% 0px -${(1 - ACTIVE_LINE) * 100 - BAND}% 0px`,
      },
    );

    sections.forEach((section) => observer.observe(section));
    resolveActive();

    const handleResize = () => {
      if (!lockedRef.current) resolveActive();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [resolveActive]);

  useEffect(() => () => window.clearTimeout(unlockTimer.current), []);

  /* Hold the clicked item active so passed-over sections don't flicker mid-scroll */
  function handleNavClick(href) {
    setActiveHref(href);
    lockedRef.current = true;
    window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(() => {
      lockedRef.current = false;
      resolveActive();
    }, SCROLL_SETTLE);
  }

  return (
    <aside className="side-rail">
      <CursorGlow />
      <div className="flex w-full flex-col items-center">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SnapServeLogo variant="full" size="sm" theme="dark" asLink href="/" />
        </motion.div>

        <nav className="side-rail-nav" aria-label="On this page">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              aria-current={activeHref === link.href ? "true" : undefined}
              className="side-rail-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 + i * 0.04 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href={SIGNUP_URL}
            className="side-rail-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.36 }}
            rel="noopener noreferrer"
          >
            Get started →
          </motion.a>
        </nav>
      </div>

      <motion.div
        className="side-rail-colophon"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p>Chennai · Bengaluru</p>
      </motion.div>
    </aside>
  );
}
