import { Link } from "react-router-dom";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import { snapServeDefinition, quickFacts, aeoQuickAnswers } from "../data/aeoContent";

/** Visible, structured content block optimized for Answer Engine extraction. */
export default function AeoBlock() {
  return (
    <section
      id="aeo-summary"
      className="bento-border border-b bg-[#050505] p-8 md:p-12 lg:p-14"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <meta itemProp="name" content="SnapServe" />
      <meta itemProp="applicationCategory" content="AI Voice Agent Platform" />
      <meta itemProp="url" content={snapServeDefinition.url} />

      <Reveal>
        <p className="label">About SnapServe</p>
        <h2 className="headline-lg mt-3 max-w-3xl" itemProp="description">
          {snapServeDefinition.tagline}
        </h2>
        <p className="body-text aeo-answer mt-4 max-w-3xl">{snapServeDefinition.description}</p>
      </Reveal>

      <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickFacts.map((fact) => (
          <div
            key={fact.term}
            className="rounded-xl border border-[#27272a] bg-[#0a0a0a] p-5"
            itemScope
            itemType="https://schema.org/DefinedTerm"
          >
            <dt className="font-mono text-[10px] uppercase tracking-widest text-[#14B8A6]" itemProp="name">
              {fact.term}
            </dt>
            <dd className="aeo-answer mt-2 text-sm leading-relaxed text-[#a1a1aa]" itemProp="description">
              {fact.definition}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12">
        <p className="label">Quick answers</p>
        <Stagger className="mt-6 space-y-4" stagger={0.04}>
          {aeoQuickAnswers.slice(0, 4).map((item) => (
            <StaggerItem
              key={item.question}
              className="rounded-xl border border-[#27272a] bg-black/50 p-5"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3 className="text-sm font-semibold text-white" itemProp="name">
                {item.question}
              </h3>
              <p
                className="aeo-answer mt-2 text-sm leading-relaxed text-[#71717a]"
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <span itemProp="text">{item.answer}</span>
              </p>
            </StaggerItem>
          ))}
        </Stagger>
        <Link to="/blog" className="mt-6 inline-block text-sm text-[#14B8A6] hover:underline">
          More guides on AI voice agents in India →
        </Link>
      </div>
    </section>
  );
}
