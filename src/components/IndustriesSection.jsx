import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

const industries = [
  {
    icon: "🛡️",
    name: "Insurance",
    desc: "Renewals, claims, and policy follow-ups — handled before they lapse.",
  },
  {
    icon: "🏠",
    name: "Real Estate",
    desc: "Qualify leads and book site visits the moment an enquiry comes in.",
  },
  {
    icon: "🎓",
    name: "EdTech & Coaching",
    desc: "Admissions calls and course follow-ups in your students' language.",
  },
  {
    icon: "🩺",
    name: "Healthcare",
    desc: "Appointment reminders and confirmations that cut down no-shows.",
  },
  {
    icon: "💳",
    name: "Lending & Finance",
    desc: "Eligibility checks and gentle payment reminders at scale.",
  },
  {
    icon: "🛍️",
    name: "D2C & E-commerce",
    desc: "COD confirmations and order updates — without a call centre.",
  },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="bento-border border-b">
      <div className="bento-border border-b p-8 md:p-12 lg:p-14">
        <Reveal>
          <p className="label">Built for India</p>
          <h2 className="headline-lg mt-3 max-w-2xl">
            Made for how{" "}
            <span className="brand-gradient-text">India does business.</span>
          </h2>
          <p className="body-text mt-3 max-w-xl">
            From insurance to real estate to coaching centres — SnapServe handles your
            calls in every language your customers actually speak.
          </p>
        </Reveal>
      </div>

      <Stagger className="grid gap-px bg-[#27272a] sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {industries.map((ind) => (
          <StaggerItem
            key={ind.name}
            className="bento-cell-hover bg-[#0a0a0a] p-8 md:p-10"
          >
            <span className="text-2xl">{ind.icon}</span>
            <h3 className="mt-4 text-base font-semibold text-white">{ind.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#71717a]">{ind.desc}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
