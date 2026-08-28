import { blogPosts } from "../data/blogPosts";
import { funnelPages } from "../data/funnelPages";
import { alternativeKeywords } from "../data/alternativeKeywords";
import { snapServeDefinition } from "../data/aeoContent";

export const SITE_URL = "https://snapserve.ai";
export const SITE_NAME = "SnapServe";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-card.png`;

export const defaultSeo = {
  title: "SnapServe — AI Voice Agent Platform & Orchestration Layer",
  description: snapServeDefinition.description,
  keywords: [
    "ai voice agent platform",
    "voice ai orchestration",
    "ai calling agent",
    "bring your own provider voice ai",
    "outbound voice ai",
    "caller memory voice ai",
    "ai meeting bot",
    "vapi alternative",
    "bolna alternative",
    "retell alternative",
    "ai voice agent alternative",
    "multilingual voice agents",
  ],
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function setMetaTag(attr, key, content) {
  if (!content || typeof document === "undefined") return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function setCanonical(href) {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function setJsonLd(id, data) {
  if (typeof document === "undefined" || !data) return;
  const scriptId = `jsonld-${id}`;
  let el = document.getElementById(scriptId);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = scriptId;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function removeJsonLd(id) {
  document.getElementById(`jsonld-${id}`)?.remove();
}

/** Merge multiple schema objects into one @graph document for AI/search parsers. */
export function jsonLdGraph(schemas) {
  const nodes = schemas
    .flat()
    .filter(Boolean)
    .map((schema) => {
      if (!schema["@context"]) return schema;
      const { "@context": _ctx, ...rest } = schema;
      return rest;
    });

  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "SnapServe",
    alternateName: ["SnapServe", "SnapServe AI"],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/logo-full-light.png` },
    email: "support@snapserve.ai",
    description: snapServeDefinition.description,
    knowsAbout: [
      "AI voice agents",
      "Voice AI orchestration",
      "Outbound calling automation",
      "Multi-provider ASR LLM TTS",
      "Conversational AI",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: defaultSeo.description,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function snapServeProductSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "SnapServe",
    alternateName: "SnapServe AI Voice Orchestrator",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "AI Voice Agent Platform",
    operatingSystem: "Web",
    url: SITE_URL,
    description: snapServeDefinition.description,
    featureList: [
      "Multi-provider ASR, LLM, TTS, and telephony orchestration",
      "Persistent caller memory across conversations",
      "Auto-redial on dropped calls with full context",
      "Meeting bot for Google Meet, Zoom, and Teams",
      "Turn management with barge-in and endpointing",
      "Outbound campaign orchestration",
      "CRM and webhook write-back",
      "1-click provider swap",
      "BYOP or managed provider keys",
      "Multilingual and code-mix speech support",
      "Live call logs, transcripts, and recordings",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Pay per minute orchestration · start with $5 free credit",
      url: snapServeDefinition.signupUrl,
    },
    brand: { "@type": "Brand", name: "SnapServe" },
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function faqSchema(faqs, id = "faq", pageUrl = SITE_URL) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#${id}`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function webPageSchema({ name, description, url, pageId }) {
  return {
    "@type": "WebPage",
    "@id": `${url}#${pageId || "webpage"}`,
    url,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    inLanguage: "en",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#aeo-summary", "h1", ".aeo-answer"],
    },
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function articleSchema(post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { "@type": "Organization", name: "SnapServe", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    keywords: post.keywords.join(", "),
    inLanguage: "en-IN",
    about: { "@id": `${SITE_URL}/#software` },
  };
}

export function productSchema(page) {
  const url = absoluteUrl(`/solutions/${page.slug}`);
  return {
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: "SnapServe",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: page.metaDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Pay per minute · $5 free credit to start",
      url: snapServeDefinition.signupUrl,
    },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function howToSchema(name, steps) {
  return {
    "@type": "HowTo",
    name,
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text,
      text,
    })),
  };
}

export function definedTermSetSchema(terms) {
  return {
    "@type": "DefinedTermSet",
    name: "SnapServe AI Voice Agent Glossary",
    hasDefinedTerm: terms.map((item) => ({
      "@type": "DefinedTerm",
      name: item.term,
      description: item.definition,
    })),
  };
}

export function alternativesItemListSchema() {
  return {
    "@type": "ItemList",
    name: "AI Voice Agent Platform Alternatives",
    description:
      "SnapServe as an alternative to popular voice AI platforms — orchestration with memory, campaigns, and CRM write-back",
    itemListElement: alternativeKeywords.map((alt, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: alt.title,
      description: alt.summary,
      url: absoluteUrl(`/solutions/${alt.slug}`),
    })),
  };
}

/** Homepage graph — only schemas backed by visible on-page content. */
export function buildHomeGraph(faqs) {
  return jsonLdGraph([
    organizationSchema(),
    websiteSchema(),
    snapServeProductSchema(),
    webPageSchema({
      name: defaultSeo.title,
      description: defaultSeo.description,
      url: SITE_URL,
      pageId: "homepage",
    }),
    faqSchema(faqs, "faq"),
    alternativesItemListSchema(),
  ]);
}

export function buildBlogGraph(post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return jsonLdGraph([
    organizationSchema(),
    webPageSchema({ name: post.title, description: post.description, url }),
    articleSchema(post),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ]);
}

export function buildFunnelGraph(page) {
  const url = absoluteUrl(`/solutions/${page.slug}`);
  return jsonLdGraph([
    organizationSchema(),
    snapServeProductSchema(),
    webPageSchema({ name: page.title, description: page.metaDescription, url }),
    productSchema(page),
    faqSchema(page.faq, "faq", url),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Solutions", path: "/solutions/ai-voice-agent-platform" },
      { name: page.title, path: `/solutions/${page.slug}` },
    ]),
    howToSchema(`How to get started with ${page.primaryKeyword}`, page.steps),
  ]);
}

export function getAllSitemapPaths() {
  const staticPaths = ["/", "/blog", "/privacy", "/terms"];
  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);
  const funnelPaths = funnelPages.map((p) => `/solutions/${p.slug}`);
  const altPaths = alternativeKeywords
    .filter((a) => !funnelPaths.includes(`/solutions/${a.slug}`))
    .map((a) => `/solutions/${a.slug}`);
  return [...staticPaths, ...blogPaths, ...funnelPaths, ...altPaths];
}

/** Static JSON-LD for index.html — parsed without JavaScript by AI crawlers. */
export function staticHomeJsonLd(faqs) {
  return JSON.stringify(buildHomeGraph(faqs), null, 2);
}
