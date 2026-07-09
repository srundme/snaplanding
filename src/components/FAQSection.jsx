import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

export default function FAQSection({ faqs, id = "faq" }) {
  return (
    <section id={id} className="bento-border border-b bg-[#0a0a0a] p-8 md:p-12 lg:p-14">
      <Reveal>
        <p className="label">FAQ</p>
        <h2 className="headline-lg mt-3 max-w-2xl">
          Questions about{" "}
          <span className="brand-gradient-text">AI voice agents in India.</span>
        </h2>
        <p className="body-text mt-3 max-w-xl">
          Straight answers for teams evaluating voice AI platforms, pricing, and alternatives.
        </p>
      </Reveal>

      <Stagger className="mt-10 space-y-4" stagger={0.05}>
        {faqs.map((item) => (
          <StaggerItem
            key={item.question}
            className="rounded-xl border border-[#27272a] bg-black/50 p-6 md:p-7"
          >
            <h3 className="text-base font-semibold text-white">{item.question}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#71717a]">{item.answer}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
