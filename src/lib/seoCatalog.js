import { blogPosts } from "../data/blogPosts";
import { funnelPages } from "../data/funnelPages";
import { homepageFaqs } from "../data/keywords";
import {
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  buildBlogGraph,
  buildFunnelGraph,
  buildHomeGraph,
  buildPartnerGraph,
  defaultSeo,
  jsonLdGraph,
  organizationSchema,
  websiteSchema,
  webPageSchema,
  breadcrumbSchema,
} from "./seo";

export function buildBlogIndexGraph() {
  return jsonLdGraph([
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      name: "AI Voice Agent Blog | SnapServe",
      description:
        "Guides on AI voice agent platforms, pricing, alternatives, and outbound playbooks.",
      url: absoluteUrl("/blog"),
      pageId: "blog-index",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
    {
      "@type": "ItemList",
      name: "SnapServe blog guides",
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
      })),
    },
  ]);
}

/** All crawlable routes with head + JSON-LD for static prerender. */
export function getAllSeoDocuments() {
  const docs = [
    {
      path: "/",
      title: defaultSeo.title,
      description: defaultSeo.description,
      keywords: defaultSeo.keywords,
      image: DEFAULT_OG_IMAGE,
      type: "website",
      jsonLd: buildHomeGraph(homepageFaqs),
      summary: defaultSeo.description,
    },
    {
      path: "/blog",
      title: "AI Voice Agent Blog — Guides & Comparisons | SnapServe",
      description:
        "Guides on AI voice agent platforms, low-cost setups, Vapi and Bolna alternatives, and outbound calling playbooks.",
      keywords: [
        "ai voice agent blog",
        "voice ai guides",
        "vapi alternative",
        "bolna alternative",
        "ai voice agent platform",
      ],
      image: DEFAULT_OG_IMAGE,
      type: "website",
      jsonLd: buildBlogIndexGraph(),
      summary:
        "SnapServe blog: platform comparisons, pricing guides, and outbound voice AI playbooks.",
    },
    {
      path: "/privacy",
      title: "Privacy Policy | SnapServe",
      description:
        "SnapServe privacy policy — how we collect, use, and protect your data on our AI voice agent platform.",
      keywords: [],
      image: DEFAULT_OG_IMAGE,
      type: "website",
      jsonLd: null,
      summary: "SnapServe privacy policy.",
    },
    {
      path: "/terms",
      title: "Terms of Service | SnapServe",
      description:
        "SnapServe terms of service for the AI voice agent orchestration platform.",
      keywords: [],
      image: DEFAULT_OG_IMAGE,
      type: "website",
      jsonLd: null,
      summary: "SnapServe terms of service.",
    },
    {
      path: "/partner",
      title: "Partner with SnapServe | Agencies & Resellers",
      description:
        "Discuss agency, reseller, and migration workflows with the SnapServe team.",
      keywords: [
        "snapserve partner",
        "voice ai reseller india",
        "vapi alternative partner",
      ],
      image: DEFAULT_OG_IMAGE,
      type: "website",
      jsonLd: buildPartnerGraph(),
      summary:
        "Partner and migration form for SnapServe — agencies, resellers, and teams switching voice AI platforms.",
    },
  ];

  for (const post of blogPosts) {
    docs.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} | SnapServe`,
      description: post.description,
      keywords: post.keywords,
      image: DEFAULT_OG_IMAGE,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      jsonLd: buildBlogGraph(post),
      summary: post.excerpt || post.description,
    });
  }

  for (const page of funnelPages) {
    docs.push({
      path: `/solutions/${page.slug}`,
      title: `${page.title} | SnapServe`,
      description: page.metaDescription,
      keywords: page.keywords,
      image: DEFAULT_OG_IMAGE,
      type: "website",
      jsonLd: buildFunnelGraph(page),
      summary: page.hero?.subline || page.metaDescription,
    });
  }

  return docs;
}

export function buildSitemapXml(docs = getAllSeoDocuments()) {
  const urls = docs
    .map((doc) => {
      const loc = absoluteUrl(doc.path === "/" ? "/" : doc.path);
      const lastmod = doc.modifiedTime || doc.publishedTime || "";
      const priority =
        doc.path === "/"
          ? "1.0"
          : doc.path.startsWith("/solutions")
            ? "0.7"
            : doc.path.startsWith("/blog/")
              ? "0.8"
              : doc.path === "/blog"
                ? "0.9"
                : "0.3";
      const changefreq =
        doc.path === "/" || doc.path === "/blog" ? "weekly" : "monthly";
      const modified = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
      return `  <url><loc>${loc}</loc>${modified}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
