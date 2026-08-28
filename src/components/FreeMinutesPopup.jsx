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

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="free-credit-title"
              className="pointer-events-auto w-full max-w-md"
              initial={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 12, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
            <div className="relative overflow-hidden rounded-xl border border-[#14B8A6]/25 bg-surface-1 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95),0_0_60px_-30px_rgba(20,184,166,0.5)]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#FF9933]/12 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-[#14B8A6]/12 blur-3xl" />

              <button
                type="button"
                onClick={dismiss}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-line text-ink-3 transition-colors hover:border-line-strong hover:text-ink"
                aria-label="Dismiss"
              >
                ×
              </button>

              <div className="relative p-8 pt-10 text-center">
                <span className="inline-flex items-center gap-2 rounded-md border border-[#FF9933]/25 bg-[#FF9933]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.09em] text-[#FF9933]">
                  Free to start
                </span>

                <h2
                  id="free-credit-title"
                  className="headline-lg mt-5"
                >
                  Start with{" "}
                  <span className="brand-gradient-text">$5 free credit</span>
                </h2>

                <p className="body-text mx-auto mt-3 max-w-xs">
                  Start orchestrating voice AI for your business — caller memory,
                  campaigns, and auto-redial included.
                </p>

                <p className="mt-2.5 text-[11px] text-ink-3">
                  No credit card · Set up in minutes
                </p>

                <div className="mt-7 flex flex-col items-center gap-3">
                  <GlowButton
                    href={SIGNUP_URL}
                    hoverText="Claim now →"
                    className="w-full justify-center sm:w-auto"
                  >
                    Claim free credit
                  </GlowButton>
                  <button
                    type="button"
                    onClick={dismiss}
                    className="text-[13px] text-ink-3 transition-colors hover:text-ink-2"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
