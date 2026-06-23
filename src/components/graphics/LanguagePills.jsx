import { motion } from "framer-motion";
import { SAMPLE_LANGUAGES } from "../../lib/languages";

export default function LanguagePills({ className = "" }) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {SAMPLE_LANGUAGES.map((lang, i) => (
        <motion.span
          key={lang.name}
          title={lang.name}
          className="rounded-full border border-[#27272a] bg-black/80 px-3 py-1 font-mono text-[10px] text-[#a1a1aa] backdrop-blur-sm"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.05 }}
          whileHover={{ borderColor: "#14B8A6", color: "#fafafa" }}
        >
          {lang.native}
        </motion.span>
      ))}
      <motion.span
        className="rounded-full border border-dashed border-[#3f3f46] px-3 py-1 font-mono text-[10px] text-[#52525b]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        + more
      </motion.span>
    </div>
  );
}
