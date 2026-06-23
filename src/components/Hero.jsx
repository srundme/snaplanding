import { motion } from "framer-motion";
import GlowButton from "./GlowButton";
import { APP_URL, SIGNUP_URL } from "../lib/links";
import HeroVisual from "./graphics/HeroVisual";
import { HERO_LANGUAGE_LINE, LANGUAGE_TAGLINE } from "../lib/languages";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <div className="grid lg:grid-cols-2">
      {/* Copy — clean, breathable */}
      <div className="flex flex-col justify-center border-b border-[#27272a] px-8 py-14 md:px-12 md:py-16 lg:border-b-0 lg:border-r lg:px-14 lg:py-20">
        <motion.p
          className="label mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          Voice AI that doesn't start from zero
        </motion.p>

        <motion.h1
          className="headline-xl max-w-[22rem] sm:max-w-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
        >
          Voice agents that{" "}
          <span className="brand-gradient-text">remember</span> every caller.
        </motion.h1>

        <motion.p
          className="mt-2 font-display text-xl font-medium brand-gradient-text sm:text-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease }}
        >
          {HERO_LANGUAGE_LINE}
        </motion.p>

        <motion.p
          className="mt-3 text-sm leading-relaxed text-[#71717a]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.17, ease }}
        >
          {LANGUAGE_TAGLINE}
        </motion.p>

        <motion.p
          className="body-text mt-5 max-w-md"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          SnapServe orchestrates enterprise voice AI for India — persistent caller
          memory, native support for every regional language, and Smart Reconnect
          when networks drop.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease }}
        >
          <GlowButton>Open dashboard</GlowButton>
          <a href={SIGNUP_URL} className="outline-btn" rel="noopener noreferrer">
            Sign up
          </a>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] text-[#52525b]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>IRDAI · DPDP · TRAI</span>
          <span className="text-[#3f3f46]">·</span>
          <span>1+ year in production</span>
          <span className="text-[#3f3f46]">·</span>
          <span>Insurance &amp; EdTech</span>
        </motion.div>
      </div>

      {/* Visual — lightweight, not cramped CRM */}
      <div className="relative min-h-[380px] overflow-hidden lg:min-h-0">
        <HeroVisual />
      </div>
    </div>
  );
}
