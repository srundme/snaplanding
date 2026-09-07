import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import SnapServeLogo from "./SnapServeLogo";
import CursorGlow from "./CursorGlow";
import TempleSkyline from "./graphics/TempleSkyline";
import { SIGNUP_URL, PARTNER_URL } from "../lib/links";
import { SIDEBAR_NAV } from "../lib/nav";

const links = SIDEBAR_NAV;

const externalLinks = [{ label: "Partner with us", href: PARTNER_URL }];

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
    queueMicrotask(() => {
      if (!lockedRef.current) resolveActive();
    });

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
      <div className="side-rail-atmosphere" aria-hidden="true">
        <TempleSkyline />
      </div>
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
          {externalLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 + (links.length + i) * 0.04 }}
            >
              <Link to={link.href} className="side-rail-link side-rail-link--partner">
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.a
            href={SIGNUP_URL}
            className="side-rail-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.36 }}
            rel="noopener noreferrer"
          >
            Start free →
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
        <p className="side-rail-langs">Indian-language workflows</p>
      </motion.div>
    </aside>
  );
}
