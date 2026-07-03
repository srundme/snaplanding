import { motion } from "framer-motion";
import GlowButton from "./GlowButton";
import { SIGNUP_URL } from "../lib/links";
import HeroVisual from "./graphics/HeroVisual";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="flex flex-col justify-center border-b border-[#27272a] px-8 py-14 md:px-12 md:py-16 lg:border-b-0 lg:border-r lg:px-14 lg:py-20">
        <motion.span
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#14B8A6]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6]" />
          AI Voice Orchestrator
        </motion.span>

        <motion.h1
          className="headline-xl max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
        >
          Voice AI orchestration for{" "}
          <span className="brand-gradient-text">Indian business.</span>
        </motion.h1>

        <motion.p
          className="body-text mt-5 max-w-md text-[#a1a1aa]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease }}
        >
          The layer between your providers and your agents — caller memory, auto-redial,
          campaigns, and scheduling orchestrated on every call. Provider-agnostic.
          Built for Indian telephony.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease }}
        >
          <GlowButton href={SIGNUP_URL} hoverText="Get started →">
            Get started
          </GlowButton>
          <a href="#how" className="outline-btn">
            View platform
          </a>
        </motion.div>

        <motion.p
          className="mt-6 font-mono text-[10px] text-[#52525b]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.36 }}
        >
          Memory · Auto-Redial · Campaigns · Every Indian language
        </motion.p>
      </div>

      <div className="relative min-h-[380px] overflow-hidden lg:min-h-0">
        <HeroVisual />
      </div>
    </div>
  );
}
