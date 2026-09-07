import { alternativeKeywords } from "./alternativeKeywords";

function buildAlternativeFunnelPage(alt) {
  const competitor = alt.competitor || "other voice AI platforms";
  return {
    slug: alt.slug,
    title: alt.title,
    metaDescription: `${alt.summary} Explore usage-based orchestration for Indian business workflows.`,
    primaryKeyword: alt.primaryKeyword,
    keywords: alt.keywords,
    hero: {
      badge: alt.competitor ? `${alt.competitor} Alternative` : "Voice Agent Alternative",
      headline: alt.competitor
        ? `Looking for a ${alt.competitor} alternative in India?`
        : "The AI voice agent alternative built for business.",
      subline: alt.summary,
    },
    benefits: [
      {
        title: "Business orchestration, not just APIs",
        desc: "Caller memory, campaign queues, Meta lead auto-dial, and in-call scheduling — without stitching dev tools together.",
      },
      {
        title: "Keep your providers",
        desc: `Use SnapServe as an orchestration layer above ${competitor} or migrate to BYOP — your telephony and AI keys stay under your control.`,
      },
      {
        title: "Built for Indian outbound",
        desc: "Provider-based Indian-language support, callback workflows, and outbound tools for mobile-first teams.",
      },
    ],
    steps: [
      `Evaluate what ${competitor} covers vs. what your team still builds (memory, campaigns, redial)`,
      "Open the console and connect the providers your workflow uses",
      "Run a pilot campaign on real leads and compare conversion and cost per call",
    ],
    faq: [
      {
        question: `Is SnapServe a ${competitor} alternative?`,
        answer: alt.summary,
      },
      {
        question: `Can I use SnapServe with ${competitor}?`,
        answer: `Yes. Many teams use SnapServe as an orchestration layer on top of ${competitor} — adding memory, campaigns, auto-redial, and Indian business workflows without replacing their voice AI stack overnight.`,
      },
      {
        question: "How much does SnapServe cost compared?",
        answer:
          "SnapServe uses usage-based orchestration pricing. You can bring your own telephony and AI providers, keeping those provider charges under your control. Contact sales for current rates.",
      },
    ],
    relatedBlog: alt.relatedBlog,
    competitor: alt.competitor || null,
  };
}

const competitorFunnelPages = alternativeKeywords
  .filter((alt) => alt.slug !== "voice-agent-alternative")
  .map(buildAlternativeFunnelPage);

export const funnelPages = [
  {
    slug: "ai-voice-agent-platform",
    title: "AI Voice Agent Platform for Indian Business",
    metaDescription:
      "SnapServe is the AI voice agent platform for India — caller memory, campaigns, auto-redial, and scheduling on one orchestration layer. Pay per minute. Start free.",
    primaryKeyword: "ai voice agent platform",
    keywords: [
      "ai voice agent platform",
      "voice ai platform india",
      "ai calling platform",
      "conversational ai voice agents",
      "voice agent orchestration",
    ],
    hero: {
      badge: "AI Voice Agent Platform",
      headline: "The AI voice agent platform built for India.",
      subline:
        "Orchestrate outbound calls, follow-ups, and bookings on one layer — with caller memory, auto-redial, and campaigns built in. Provider-agnostic. Multilingual and code-mix ready.",
    },
    benefits: [
      {
        title: "One platform, every call capability",
        desc: "Memory, campaigns, scheduling, and resilience — orchestrated automatically on every conversation.",
      },
      {
        title: "Bring your own providers",
        desc: "Use any ASR, LLM, and telephony stack. SnapServe is the orchestration layer, not another lock-in.",
      },
      {
        title: "Built for Indian telephony",
        desc: "Regional languages, drop detection, and outbound patterns tuned for how India actually calls.",
      },
    ],
    steps: [
      "Connect your telephony and AI provider keys",
      "Upload leads, connect Meta forms, or sync website enquiries",
      "Launch campaigns — memory and auto-redial run on every call",
    ],
    faq: [
      {
        question: "What makes SnapServe an AI voice agent platform?",
        answer:
          "SnapServe orchestrates the full call lifecycle — memory injection, campaign queues, provider routing, auto-redial, and scheduling — so you run voice agents without stitching five tools together.",
      },
      {
        question: "Do I need developers to use the platform?",
        answer:
          "No. Business teams launch outbound campaigns from the console. Developers can go deeper with APIs, but no-code setup is supported.",
      },
    ],
    relatedBlog: "best-ai-voice-agent-platforms-india",
  },
  {
    slug: "best-voice-agents-india",
    title: "Best Voice Agents in India — Platform Comparison",
    metaDescription:
      "Looking for the best voice agents in India? Compare AI voice agent platforms on memory, campaigns, Indian languages, and cost. See why teams choose SnapServe.",
    primaryKeyword: "best voice agents india",
    keywords: [
      "best voice agents india",
      "best ai voice agents",
      "top voice ai india",
      "ai calling agent india",
      "voice agent comparison",
    ],
    hero: {
      badge: "Best Voice Agents · India",
      headline: "Best voice agents for Indian business — compared.",
      subline:
        "The best voice agent isn't just good speech AI. It's memory across calls, auto-redial on drops, campaign tooling, and Indian-language support — without enterprise pricing.",
    },
    benefits: [
      {
        title: "Memory that compounds",
        desc: "Facts, episodes, and call history injected into every turn. Callers never start from zero.",
      },
      {
        title: "Campaign-ready out of the box",
        desc: "Meta leads, website forms, and bulk CSV — auto-dialed with DNC filtering and live queues.",
      },
      {
        title: "Resilience competitors skip",
        desc: "Detect interrupted calls, start a provider callback, and reload the caller profile.",
      },
    ],
    steps: [
      "Evaluate on memory, campaigns, and Indian telephony — not demo polish alone",
      "Open the SnapServe console and connect your providers",
      "Run a controlled pilot on a small, consented lead set",
    ],
    faq: [
      {
        question: "What should I look for in the best voice agents for India?",
        answer:
          "Check regional language quality, outbound campaign support, caller memory, auto-redial, pricing model, and whether you can bring your own telephony providers.",
      },
      {
        question: "Is SnapServe better than generic global voice AI tools?",
        answer:
          "Global tools often lack Indian telephony patterns, regional language workflows, and business-first campaign features. SnapServe is built specifically for Indian outbound and follow-up use cases.",
      },
    ],
    relatedBlog: "how-to-choose-ai-voice-agent-platform-india",
  },
  {
    slug: "low-cost-voice-agents-india",
    title: "Low-Cost Voice Agents for India — Pay Per Minute",
    metaDescription:
      "Usage-based voice-agent orchestration for Indian business. Bring your own providers and keep provider charges separate.",
    primaryKeyword: "low cost voice agents india",
    keywords: [
      "low cost voice agents india",
      "affordable voice ai india",
      "cheap ai calling agent",
      "pay per minute voice ai",
      "budget voice agents india",
    ],
    hero: {
      badge: "Low-Cost Voice AI",
      headline: "Low-cost voice agents — without cutting corners.",
      subline:
        "Pay for orchestration by usage and bring your own telephony and AI keys. Provider charges remain separate.",
    },
    benefits: [
      {
        title: "Pay per minute, not per seat",
        desc: "You control provider spend directly. SnapServe bills only for the orchestration layer.",
      },
      {
        title: "Test before scaling",
        desc: "Validate the workflow on a controlled lead set before increasing volume.",
      },
      {
        title: "No rebuild tax",
        desc: "Memory, campaigns, and auto-redial included — features you'd otherwise engineer yourself.",
      },
    ],
    steps: [
      "Open the console",
      "Connect provider keys you already use",
      "Run a small batch campaign and measure cost per connected call",
    ],
    faq: [
      {
        question: "How much do low-cost voice agents cost in India?",
        answer:
          "SnapServe charges per minute for orchestration. Telephony and AI provider costs are separate and under your control — typically the most efficient stack for Indian outbound.",
      },
      {
        question: "Is cheap voice AI reliable?",
        answer:
          "Cost efficiency comes from pay-per-use and BYOP — not from skipping memory, redial, or observability. SnapServe includes production-grade orchestration at minute-based pricing.",
      },
    ],
    relatedBlog: "low-cost-voice-agents-india-guide",
  },
  {
    slug: "voice-agent-alternative",
    title: "AI Voice Agent Alternative — Vapi, Bolna & Beyond",
    metaDescription:
      "Need an AI voice agent alternative? SnapServe adds caller memory, auto-redial, campaigns, and Indian telephony orchestration on top of any provider — including Vapi and Bolna.",
    primaryKeyword: "ai voice agent alternative",
    keywords: [
      "ai voice agent alternative",
      "vapi alternative india",
      "bolna alternative",
      "retell alternative india",
      "voice ai orchestrator",
    ],
    hero: {
      badge: "Voice Agent Alternative",
      headline: "The AI voice agent alternative with memory built in.",
      subline:
        "Not a replacement — an orchestration layer. Keep your providers. Add caller memory, auto-redial, campaigns, and scheduling that dev-first APIs don't ship by default.",
    },
    benefits: [
      {
        title: "Provider-agnostic orchestration",
        desc: "Works with your existing voice AI stack — add the business layer without migrating providers.",
      },
      {
        title: "Features APIs skip",
        desc: "Persistent memory, callback workflows, lead-source connectors, and in-call scheduling.",
      },
      {
        title: "Business-first, not dev-only",
        desc: "Launch campaigns from a console — insurance renewals, lead follow-up, admissions calls.",
      },
    ],
    steps: [
      "Keep your current ASR, LLM, and telephony providers",
      "Route calls through SnapServe's orchestration layer",
      "Gain memory, campaigns, and auto-redial without re-architecting",
    ],
    faq: [
      {
        question: "Is SnapServe a Vapi or Bolna replacement?",
        answer:
          "SnapServe is an orchestration layer that can work alongside or above provider APIs. It adds memory, campaigns, auto-redial, and Indian business workflows — use it with or instead of stitching features yourself.",
      },
      {
        question: "Can I migrate without downtime?",
        answer:
          "Yes. Connect providers incrementally, run parallel test campaigns, and switch traffic when ready.",
      },
    ],
    relatedBlog: "ai-voice-agent-alternatives-vapi-bolna",
  },
  {
    slug: "voice-ai-for-business-india",
    title: "Voice AI for Business in India — Outbound & Follow-Up",
    metaDescription:
      "Voice AI for Indian business: automate lead calls, renewals, bookings, and follow-ups in every regional language. SnapServe — AI voice orchestration for insurance, real estate, EdTech, and more.",
    primaryKeyword: "voice ai for business india",
    keywords: [
      "voice ai for business india",
      "ai voice agents for business",
      "outbound voice ai india",
      "ai phone agent india",
      "automated calling india",
    ],
    hero: {
      badge: "Voice AI for Business",
      headline: "Voice AI that runs your business calls — not just demos.",
      subline:
        "Insurance renewals, real estate follow-ups, EdTech admissions, healthcare reminders — orchestrated in the languages your customers speak.",
    },
    benefits: [
      {
        title: "Industry-ready workflows",
        desc: "Templates and patterns for insurance, real estate, coaching, healthcare, lending, and D2C.",
      },
      {
        title: "Leads in, calls out",
        desc: "Meta ad forms, website enquiries, and CSV uploads auto-dialed with live queue monitoring.",
      },
      {
        title: "Every call remembers",
        desc: "Caller profiles compound — budget, intent, and history injected on the next conversation.",
      },
    ],
    steps: [
      "Pick your use case — renewals, lead qual, bookings, or reminders",
      "Connect lead sources: Meta, website forms, or CSV",
      "Launch and monitor from the orchestration console",
    ],
    faq: [
      {
        question: "Which industries use voice AI in India?",
        answer:
          "Insurance, real estate, EdTech, healthcare, lending, and e-commerce are the fastest adopters — anywhere high-volume outbound or follow-up calls drive revenue.",
      },
      {
        question: "Does SnapServe handle compliance for outbound calls?",
        answer:
          "SnapServe provides DNC filtering and call logging. You remain responsible for consent and regulatory compliance (TRAI, DPDP) for your campaigns.",
      },
    ],
    relatedBlog: "ai-voice-agents-outbound-calls-india",
  },
  ...competitorFunnelPages,
];

export function getFunnelBySlug(slug) {
  return funnelPages.find((page) => page.slug === slug);
}
