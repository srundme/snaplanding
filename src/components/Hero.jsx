import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import { SIGNUP_URL } from "@/lib/links";

export default function Hero() {
  return (
    <PixelHero
      className="min-h-[min(100dvh,820px)] border-b border-border lg:min-h-[780px]"
      word1="Voice AI"
      word2="Orchestration."
      description="The layer between your providers and your agents — caller memory, auto-redial, campaigns, and scheduling on every call. Built for Indian telephony."
      primaryCta="Get started free"
      primaryCtaMobile="Get started"
      secondaryCta="View platform"
      secondaryCtaMobile="Platform"
      secondaryHref="#how"
      trustLabel="Works with your stack"
      onPrimaryClick={() => {
        window.open(SIGNUP_URL, "_blank", "noopener,noreferrer");
      }}
    />
  );
}
