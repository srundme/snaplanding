import { SIGNUP_URL, SALES_URL } from "@/lib/links";
import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import ScriptAtmosphere from "./graphics/ScriptAtmosphere";
import {
  DeepgramMark,
  ElevenLabsMark,
  GeminiMark,
  GoogleMeetMark,
  HubSpotMark,
  MetaMark,
  OpenAIMark,
  PlivoMark,
  SarvamMark,
  TeamsMark,
  TwilioMark,
  VobizMark,
  ZohoMark,
  ZoomMark,
} from "./PlatformLogos";

const STACK = [
  { Mark: VobizMark, name: "Vobiz" },
  { Mark: TwilioMark, name: "Twilio" },
  { Mark: PlivoMark, name: "Plivo" },
  { Mark: MetaMark, name: "Meta" },
  { Mark: OpenAIMark, name: "OpenAI" },
  { Mark: SarvamMark, name: "Sarvam" },
  { Mark: ElevenLabsMark, name: "ElevenLabs" },
  { Mark: DeepgramMark, name: "Deepgram" },
  { Mark: GeminiMark, name: "Gemini" },
  { Mark: HubSpotMark, name: "HubSpot" },
  { Mark: ZohoMark, name: "Zoho" },
  { Mark: GoogleMeetMark, name: "Google Meet" },
  { Mark: ZoomMark, name: "Zoom" },
  { Mark: TeamsMark, name: "Microsoft Teams" },
];

const MARQUEE_COPIES = 2;

export default function Hero() {
  return (
    <section className="hero-shell hero-shell--pixel">
      <ScriptAtmosphere section="hero" variant="hero" skyline={false} />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <PixelHero
          word1="Voice Agents"
          word2="Built for Business."
          description="Automate lead calls, follow-ups, and bookings—with memory, auto-redial, and CRM updates built in."
          primaryHref={SIGNUP_URL}
          secondaryHref={SALES_URL}
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
      </div>
    </section>
  );
}
