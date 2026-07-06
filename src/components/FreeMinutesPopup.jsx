import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import GlowButton from "./GlowButton";
import { SIGNUP_URL } from "../lib/links";

const STORAGE_KEY = "snapserve_free_minutes_popup_dismissed";

export default function FreeMinutesPopup() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close offer"
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={dismiss}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="free-minutes-title"
            className="fixed inset-x-4 top-1/2 z-[101] mx-auto max-w-md -translate-y-1/2 md:inset-x-auto"
            initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: reduce ? "-50%" : 16, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#14B8A6]/30 bg-[#0a0a0a] shadow-[0_0_80px_rgba(20,184,166,0.15)]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#FF9933]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-[#14B8A6]/20 blur-3xl" />

              <button
                type="button"
                onClick={dismiss}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#27272a] text-[#71717a] transition-colors hover:border-[#52525b] hover:text-white"
                aria-label="Dismiss"
              >
                ×
              </button>

              <div className="relative p-8 pt-10 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#FF9933]">
                  Limited offer
                </span>

                <h2
                  id="free-minutes-title"
                  className="headline-lg mt-5"
                >
                  Get{" "}
                  <span className="brand-gradient-text">100 minutes free</span>
                </h2>

                <p className="body-text mx-auto mt-3 max-w-xs">
                  Start orchestrating voice AI for your business — caller memory,
                  campaigns, and auto-redial included.
                </p>

                <p className="mt-2 font-mono text-[10px] text-[#52525b]">
                  No credit card · Set up in minutes
                </p>

                <div className="mt-7 flex flex-col items-center gap-3">
                  <GlowButton
                    href={SIGNUP_URL}
                    hoverText="Claim now →"
                    className="w-full justify-center sm:w-auto"
                  >
                    Claim 100 free minutes
                  </GlowButton>
                  <button
                    type="button"
                    onClick={dismiss}
                    className="text-sm text-[#52525b] transition-colors hover:text-[#a1a1aa]"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
