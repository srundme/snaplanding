import { SIGNUP_URL } from "@/lib/links";
import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import {
  GeminiMark,
  MetaMark,
  OpenAIMark,
  PlivoMark,
  TwilioMark,
} from "./PlatformLogos";

const STACK = [
  { Mark: MetaMark, name: "Meta" },
  { Mark: PlivoMark, name: "Plivo" },
  { Mark: TwilioMark, name: "Twilio" },
  { Mark: OpenAIMark, name: "OpenAI" },
  { Mark: GeminiMark, name: "Gemini" },
];

const MARQUEE_COPIES = 4;

export default function Hero() {
  return (
    <section className="hero-shell hero-shell--pixel">
      <PixelHero
        primaryHref={SIGNUP_URL}
        stackContent={
          <div className="hero-stack-scroll w-full">
            <div
              className="hero-stack-strip hero-stack-strip--marquee"
              style={{ "--hero-marquee-copies": MARQUEE_COPIES }}
              role="list"
              aria-label="Integration partners"
            >
              {Array.from({ length: MARQUEE_COPIES }, (_, copyIndex) =>
                STACK.map(({ Mark, name }) => (
                  <span
                    key={`${name}-${copyIndex}`}
                    className="hero-stack-item"
                    role="listitem"
                    aria-hidden={copyIndex > 0 ? true : undefined}
                  >
                    <Mark size={20} className="hero-stack-mark" aria-hidden="true" />
                    {name}
                  </span>
                )),
              )}
            </div>
          </div>
        }
      />
    </section>
  );
}
