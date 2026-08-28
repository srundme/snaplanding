import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

export default function FAQSection({
  faqs,
  id = "faq",
  eyebrow = "FAQ",
  title = (
    <>
      Questions teams ask before{" "}
      <span className="brand-gradient-text">they switch.</span>
    </>
  ),
  description = "Straight answers on platforms, pricing, and what SnapServe adds beyond a voice API.",
}) {
  return (
    <section id={id} className="border-t border-[#27272a] pt-10">
      <Reveal>
        <p className="label">{eyebrow}</p>
        <h2 className="headline-lg mt-3 max-w-2xl">{title}</h2>
        <p className="body-text mt-3 max-w-xl">{description}</p>
      </Reveal>

      <Stagger className="mt-8 divide-y divide-[#27272a] border-t border-[#27272a]" stagger={0.04}>
        {faqs.map((item) => (
          <StaggerItem key={item.question} className="py-6">
            <h3 className="text-[15.5px] font-semibold tracking-[-0.02em] text-white">
              {item.question}
            </h3>
            <p className="aeo-answer mt-3 max-w-3xl text-sm leading-relaxed text-[#8b929d]">
              {item.answer}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
