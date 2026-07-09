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
    setMetaTag("name", "keywords", keywordStr);
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonical);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:site_name", "SnapServe");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

    jsonLd.forEach((block, i) => setJsonLd(`seo-${i}`, block));

    return () => {
      for (let i = 0; i < jsonLd.length; i += 1) removeJsonLd(`seo-${i}`);
    };
  }, [title, description, pathname, keywords, image, type, noindex, jsonLd]);

  return null;
}
