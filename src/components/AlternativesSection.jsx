import { Link } from "react-router-dom";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import { alternativeKeywords } from "../data/alternativeKeywords";

export default function AlternativesSection() {
  return (
    <section id="alternatives" className="bento-border border-b bg-[#0a0a0a] p-8 md:p-12 lg:p-14">
      <Reveal>
        <p className="label">Alternatives</p>
        <h2 className="headline-lg mt-3 max-w-2xl">
          AI voice agent{" "}
          <span className="brand-gradient-text">alternatives for India.</span>
        </h2>
        <p className="body-text mt-3 max-w-xl">
          Evaluating Vapi, Bolna, Retell, or other voice AI tools? See how SnapServe compares as
          an orchestration layer with memory, campaigns, and Indian telephony built in.
        </p>
      </Reveal>

      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {alternativeKeywords.map((alt) => (
          <StaggerItem key={alt.slug}>
            <Link
              to={`/solutions/${alt.slug}`}
              className="group flex h-full flex-col rounded-xl border border-[#27272a] bg-black p-6 transition-colors hover:border-[#14B8A6]/40"
            >
              {alt.competitor && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#52525b]">
                  vs {alt.competitor}
                </span>
              )}
              <h3 className="mt-2 text-base font-semibold text-white transition-colors group-hover:text-[#14B8A6]">
                {alt.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#71717a]">{alt.summary}</p>
              <span className="mt-4 font-mono text-[10px] text-[#14B8A6]">{alt.primaryKeyword}</span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
