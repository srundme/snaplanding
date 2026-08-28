import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./motion/Reveal";
import { homepageFaqs } from "../data/keywords";
import { alternativeKeywords } from "../data/alternativeKeywords";

/*
  FAQ accordion — question always visible; answer expands on click.
  Answers stay in the DOM for SEO / FAQ schema.
*/

const FAQ_SHOW = homepageFaqs.slice(0, 6);

const ALTS = alternativeKeywords
  .filter((a) => a.competitor)
  .slice(0, 5);

function FaqItem({ item, open, onToggle }) {
  const panelId = `faq-panel-${item.question.slice(0, 24).replace(/\W+/g, "-")}`;

  return (
    <article className={`aeo-faq-item${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="aeo-faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <h3 className="aeo-faq-q">{item.question}</h3>
        <span className="aeo-faq-chevron" aria-hidden="true">
          <ChevronDown size={16} strokeWidth={1.8} />
        </span>
      </button>
      <div id={panelId} className="aeo-faq-panel" role="region">
        <p className="aeo-faq-a aeo-answer">{item.answer}</p>
      </div>
    </article>
  );
}

export default function AnswersSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="answers"
      className="border-b border-line bg-surface-1 px-6 py-12 md:px-14 md:py-14"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#14B8A6]/60" />
            <p className="label text-ink-2">Quick answers</p>
          </div>
          <h2 className="headline-lg mt-4 max-w-2xl">
            Straight answers{" "}
            <span className="brand-gradient-text">before you sign up.</span>
          </h2>
          <p className="body-text mt-3 max-w-xl">
            What SnapServe is, how pricing works, and how it compares to
            provider-only stacks.
          </p>
        </Reveal>

        <div className="aeo-alts mt-7">
          <p className="aeo-alts-label">Alternatives to</p>
          <div className="aeo-alts-row">
            {ALTS.map((alt) => (
              <Link key={alt.slug} to={`/solutions/${alt.slug}`} className="aeo-alt">
                {alt.competitor}
              </Link>
            ))}
          </div>
        </div>

        <div id="aeo-summary" className="aeo-faq mt-8 border-t border-line">
          {FAQ_SHOW.map((item, i) => (
            <Reveal key={item.question} delay={0.03 * i}>
              <FaqItem
                item={item}
                open={openIndex === i}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === i ? null : i))
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
