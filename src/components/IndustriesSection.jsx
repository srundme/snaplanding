import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Shield,
  ShoppingBag,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

const INDUSTRIES = [
  {
    name: "Real Estate",
    call: "Enquiry lands → qualify budget & area → book the site visit on the same dial.",
    Icon: Building2,
  },
  {
    name: "Healthcare",
    call: "Reminders and confirmations that cut no-shows before clinic hours start.",
    Icon: HeartPulse,
  },
  {
    name: "Lending & Finance",
    call: "Eligibility checks and EMI reminders — without a collections floor.",
    Icon: Landmark,
  },
  {
    name: "Insurance",
    call: "Renewals and claims follow-ups before the policy window closes.",
    Icon: Shield,
  },
  {
    name: "EdTech & Coaching",
    call: "Admissions and course follow-ups in Hindi, Tamil, Telugu, and more.",
    Icon: GraduationCap,
  },
  {
    name: "D2C & E-commerce",
    call: "COD confirms and delivery updates — no dialer farm required.",
    Icon: ShoppingBag,
  },
];

function Row({ item, className }) {
  return (
    <StaggerItem
      className={`bento-cell-hover grid grid-cols-[40px_minmax(0,1fr)] items-start gap-y-1 py-4 md:py-5 ${className}`}
    >
      <span className="story-icon">
        <item.Icon
          className="h-3.5 w-3.5"
          strokeWidth={1.7}
          aria-hidden="true"
        />
      </span>

      <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-ink md:text-[21px]">
        {item.name}
      </h3>

      <p className="col-start-2 max-w-md text-[14px] leading-relaxed text-ink-2">
        {item.call}
      </p>
    </StaggerItem>
  );
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="border-b border-line bg-surface-1">
      <div className="border-b border-line px-6 py-12 md:px-14 md:py-14">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#14B8A6]/60" />
            <p className="label text-ink-2">Industries</p>
          </div>
          <h2 className="headline-lg mt-4 max-w-2xl text-balance">
            Built for the calls{" "}
            <span className="brand-gradient-text">your team already makes.</span>
          </h2>
          <p className="body-text mt-3 max-w-xl">
            Site visits, renewals, COD confirms, admissions — closed in one
            dial, in the caller’s language.
          </p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 md:divide-x md:divide-line">
        <Stagger className="divide-y divide-line" stagger={0.04}>
          {INDUSTRIES.slice(0, 3).map((item) => (
            <Row key={item.name} item={item} className="px-8 md:pl-12 md:pr-10" />
          ))}
        </Stagger>

        <Stagger
          className="divide-y divide-line border-t border-line md:border-t-0"
          stagger={0.04}
        >
          {INDUSTRIES.slice(3).map((item) => (
            <Row key={item.name} item={item} className="px-8 md:pl-10 md:pr-12" />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
