/** Competitor & category alternative keywords — each maps to a funnel page. */
export const alternativeKeywords = [
  {
    slug: "vapi-alternative-india",
    title: "Vapi Alternative in India",
    primaryKeyword: "vapi alternative india",
    keywords: [
      "vapi alternative india",
      "vapi alternative",
      "alternative to vapi",
      "vapi competitor india",
      "vapi vs snapserve",
    ],
    summary:
      "SnapServe is a Vapi alternative for Indian business — adds caller memory, auto-redial, Meta lead auto-dial, and campaign orchestration on top of any voice AI stack.",
    competitor: "Vapi",
    relatedBlog: "vapi-alternative-india-guide",
  },
  {
    slug: "bolna-alternative-india",
    title: "Bolna Alternative in India",
    primaryKeyword: "bolna alternative india",
    keywords: [
      "bolna alternative india",
      "bolna alternative",
      "alternative to bolna",
      "bolna competitor",
      "bolna vs snapserve",
    ],
    summary:
      "SnapServe is a Bolna alternative with business-first orchestration — memory, campaigns, scheduling, and Indian telephony patterns without rebuilding on a dev-only API.",
    competitor: "Bolna",
    relatedBlog: "bolna-alternative-india-guide",
  },
  {
    slug: "retell-alternative-india",
    title: "Retell Alternative in India",
    primaryKeyword: "retell alternative india",
    keywords: [
      "retell alternative india",
      "retell alternative",
      "alternative to retell ai",
      "retell competitor india",
      "retell vs snapserve",
    ],
    summary:
      "SnapServe is a Retell alternative built for Indian outbound — persistent caller memory, auto-redial on drops, and bulk campaign tooling in every regional language.",
    competitor: "Retell",
    relatedBlog: "retell-alternative-india-guide",
  },
  {
    slug: "voice-agent-alternative",
    title: "AI Voice Agent Alternative",
    primaryKeyword: "ai voice agent alternative",
    keywords: [
      "ai voice agent alternative",
      "voice ai alternative",
      "voice agent platform alternative",
      "conversational ai alternative india",
    ],
    summary:
      "SnapServe is an AI voice agent alternative that orchestrates memory, campaigns, and scheduling — provider-agnostic and built for Indian business.",
    competitor: null,
    relatedBlog: "ai-voice-agent-alternatives-vapi-bolna",
  },
  {
    slug: "ultravox-alternative-india",
    title: "Ultravox Alternative in India",
    primaryKeyword: "ultravox alternative india",
    keywords: [
      "ultravox alternative india",
      "ultravox alternative",
      "open source voice ai alternative",
    ],
    summary:
      "SnapServe offers managed orchestration as an alternative to self-hosted voice AI — memory, campaigns, and Indian telephony without infra overhead.",
    competitor: "Ultravox",
    relatedBlog: "ai-voice-agent-alternatives-vapi-bolna",
  },
  {
    slug: "bland-ai-alternative-india",
    title: "Bland AI Alternative in India",
    primaryKeyword: "bland ai alternative india",
    keywords: [
      "bland ai alternative india",
      "bland ai alternative",
      "bland ai competitor",
    ],
    summary:
      "SnapServe is a Bland AI alternative for India with BYOP pricing, regional languages, and outbound campaign orchestration built in.",
    competitor: "Bland AI",
    relatedBlog: "ai-voice-agent-alternatives-vapi-bolna",
  },
];

export function getAlternativeBySlug(slug) {
  return alternativeKeywords.find((item) => item.slug === slug);
}
