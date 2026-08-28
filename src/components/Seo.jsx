import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  defaultSeo,
  removeJsonLd,
  setCanonical,
  setJsonLd,
  setMetaTag,
} from "../lib/seo";

export default function Seo({
  title = defaultSeo.title,
  description = defaultSeo.description,
  pathname = "/",
  keywords = defaultSeo.keywords,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  jsonLd = [],
  noindex = false,
}) {
  useEffect(() => {
    const canonical = absoluteUrl(pathname);
    const keywordStr = Array.isArray(keywords) ? keywords.join(", ") : keywords;

    document.title = title;
    setCanonical(canonical);
    setMetaTag("name", "description", description);
    if (keywordStr) setMetaTag("name", "keywords", keywordStr);
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonical);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:image:width", "1200");
    setMetaTag("property", "og:image:height", "630");
    setMetaTag("property", "og:site_name", "SnapServe");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    // Drop static JSON-LD so the React graph is the single live source of truth.
    document.getElementById("jsonld-bootstrap")?.remove();
    document.getElementById("jsonld-prerender")?.remove();
    document
      .querySelectorAll('script[type="application/ld+json"]:not([id^="jsonld-seo-"])')
      .forEach((el) => {
        if (!el.id?.startsWith("jsonld-")) el.remove();
      });

    jsonLd.forEach((block, i) => setJsonLd(`seo-${i}`, block));

    return () => {
      for (let i = 0; i < jsonLd.length; i += 1) removeJsonLd(`seo-${i}`);
    };
  }, [title, description, pathname, keywords, image, type, noindex, jsonLd]);

  return null;
}
