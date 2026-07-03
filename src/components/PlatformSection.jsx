import { Reveal } from "./motion/Reveal";
import PlatformMockup from "./graphics/PlatformMockup";
import GlowButton from "./GlowButton";
import { SIGNUP_URL } from "../lib/links";

export default function PlatformSection() {
  return (
    <section id="how" className="bento-border border-b bg-[#0a0a0a]">
      <div className="bento-border border-b p-8 text-center md:p-12 lg:p-14">
        <Reveal>
          <p className="label">Orchestration Console</p>
          <h2 className="headline-lg mx-auto mt-3 max-w-2xl">
            Configure, deploy, and monitor{" "}
            <span className="brand-gradient-text">from one console.</span>
          </h2>
          <p className="body-text mx-auto mt-4 max-w-xl">
            Memory injection, campaign queues, latency traces, and provider routing —
            the full orchestration layer, visible in real time.
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="p-4 md:p-8">
        <div className="float-slow">
          <PlatformMockup />
        </div>
      </Reveal>
      <div className="bento-border border-t px-8 py-8 text-center md:px-14">
        <GlowButton href={SIGNUP_URL} hoverText="Get started →">
          Start building free
        </GlowButton>
      </div>
    </section>
  );
}
