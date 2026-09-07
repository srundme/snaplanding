import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import { AskGlyph } from "./graphics/SnapGlyphs";
import { homepageFaqs } from "../data/keywords";

/*
  FAQ accordion — question always visible; answer expands on click.
  Answers stay in the DOM for SEO / FAQ schema.
*/

const FAQ_SHOW = homepageFaqs;

function FaqItem({ item, open, onToggle }) {
  const panelId = `faq-panel-${item.question.slice(0, 24).replace(/\W+/g, "-")}`;
  const headingId = `${panelId}-heading`;

  return (
    <article className={`aeo-faq-item${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="aeo-faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <h3 id={headingId} className="aeo-faq-q">{item.question}</h3>
        <span className="aeo-faq-chevron" aria-hidden="true">
          <ChevronDown size={16} strokeWidth={1.8} />
        </span>
      </button>
      <div
        id={panelId}
        className="aeo-faq-panel"
        role="region"
        aria-labelledby={headingId}
        aria-hidden={!open}
        inert={!open}
      >
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
      className="relative overflow-hidden border-b border-line bg-surface-1 px-6 py-16 md:px-14 md:py-20"
    >
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <SectionLabel icon={AskGlyph}>Quick answers</SectionLabel>
          <h2 className="headline-lg mt-4 max-w-2xl">
            Straight answers{" "}
            <span className="brand-gradient-text">before you sign up.</span>
          </h2>
          <p className="body-text mt-3 max-w-xl">
            The essentials about setup, providers, memory, and pricing.
          </p>
        </Reveal>

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
        <nav aria-label="Related voice agent guides" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[13px]">
          <Link className="text-ink-2 underline decoration-line underline-offset-4 hover:text-ink" to="/solutions/ai-voice-agent-platform">
            Platform guide
          </Link>
          <Link className="text-ink-2 underline decoration-line underline-offset-4 hover:text-ink" to="/solutions/best-voice-agents-india">
            Voice agents in India
          </Link>
          <Link className="text-ink-2 underline decoration-line underline-offset-4 hover:text-ink" to="/blog">
            Read all guides
          </Link>
        </nav>
      </div>
    </section>
  );
}
