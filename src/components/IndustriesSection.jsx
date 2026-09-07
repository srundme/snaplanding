import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import SectionLabel from "./SectionLabel";
import ScriptAtmosphere from "./graphics/ScriptAtmosphere";
import { MapGlyph } from "./graphics/SnapGlyphs";
import IndicAcousticShowcase from "./graphics/IndicAcousticShowcase";

const INDUSTRIES = [
  {
    name: "Real Estate",
    call: "Qualify budget and location, then book the site visit.",
    Icon: Building2,
  },
  {
    name: "Healthcare",
    call: "Automate appointment reminders and confirmations.",
    Icon: HeartPulse,
  },
  {
    name: "Lending & Finance",
    call: "Run eligibility checks and EMI reminders at scale.",
    Icon: Landmark,
  },
  {
    name: "Insurance",
    call: "Follow up on renewals and claims on time.",
    Icon: ShieldCheck,
  },
  {
    name: "EdTech & Coaching",
    call: "Handle admission and course follow-ups in local languages.",
    Icon: GraduationCap,
  },
  {
    name: "D2C & E-commerce",
    call: "Confirm COD orders and share delivery updates.",
    Icon: ShoppingBag,
  },
];

function Row({ item, className }) {
  return (
    <StaggerItem
      className={`bento-cell-hover grid grid-cols-[40px_minmax(0,1fr)] items-start gap-y-1 py-4 md:py-5 ${className}`}
    >
      <span className="story-icon">
        <item.Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
      </span>

      <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-ink md:text-[21px]">
        {item.name}
      </h3>

      <p className="col-start-2 max-w-lg text-[14px] leading-[1.65] text-ink-2">
        {item.call}
      </p>
    </StaggerItem>
  );
}

export default function IndustriesSection() {
  return (
    <section id="industries" className="relative overflow-hidden border-b border-line bg-surface-1">
      <div className="industries-head relative min-h-[13rem] border-b border-line px-6 py-12 md:min-h-[16rem] md:px-14 md:py-14">
        <ScriptAtmosphere section="industries" />
        <Reveal className="relative z-[2]">
          <SectionLabel icon={MapGlyph}>Industries</SectionLabel>
          <h2 className="headline-lg mt-4 max-w-2xl text-balance">
            Built for the calls{" "}
            <span className="brand-gradient-text">your team already makes.</span>
          </h2>
          <p className="body-text mt-3 max-w-xl">
            Automate repeatable calls with Indian-language coverage from your connected speech provider.
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

      <div className="border-t border-line bg-surface-0/50 px-6 py-10 md:px-14 md:py-14">
        <Reveal>
          <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-ink md:text-[21px]">
            Hear it in the caller&rsquo;s language
          </h3>
          <p className="body-text mt-2 max-w-xl">
            Sample scripts your agent speaks on real calls, in the accent the caller expects.
          </p>
        </Reveal>
        <Reveal delay={0.04} className="mt-6">
          <IndicAcousticShowcase />
        </Reveal>
      </div>
    </section>
  );
}
