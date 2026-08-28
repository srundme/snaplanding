import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  absoluteUrl,
} from "../src/lib/seo.js";
import { getAllSeoDocuments, buildSitemapXml } from "../src/lib/seoCatalog.js";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function injectHead(html, doc) {
  const canonical = absoluteUrl(doc.path === "/" ? "/" : doc.path);
  const keywords = Array.isArray(doc.keywords)
    ? doc.keywords.join(", ")
    : doc.keywords || "";
  const jsonLdBlock = doc.jsonLd
    ? `<script type="application/ld+json" id="jsonld-prerender">${JSON.stringify(doc.jsonLd)}</script>`
    : "";

  const headBits = [
    `<title>${escapeHtml(doc.title)}</title>`,
    `<meta name="description" content="${escapeHtml(doc.description)}" />`,
    keywords
      ? `<meta name="keywords" content="${escapeHtml(keywords)}" />`
      : "",
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(doc.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(doc.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="${escapeHtml(doc.type || "website")}" />`,
    `<meta property="og:image" content="${escapeHtml(doc.image || DEFAULT_OG_IMAGE)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:site_name" content="SnapServe" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(doc.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(doc.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(doc.image || DEFAULT_OG_IMAGE)}" />`,
    jsonLdBlock,
  ]
    .filter(Boolean)
    .join("\n    ");

  let next = html;

  next = next.replace(
    /<script type="application\/ld\+json" id="jsonld-bootstrap">[\s\S]*?<\/script>/i,
    "",
  );
  next = next.replace(/<title>[\s\S]*?<\/title>/i, "");
  next = next.replace(/<meta name="description"[^>]*>/i, "");
  next = next.replace(/<meta name="keywords"[^>]*>/i, "");
  next = next.replace(/<link rel="canonical"[^>]*>/i, "");
  next = next.replace(/<meta property="og:[^"]+"[^>]*>/gi, "");
  next = next.replace(/<meta name="twitter:[^"]+"[^>]*>/gi, "");
  next = next.replace("</head>", `    ${headBits}\n  </head>`);

  const noscript = `<noscript><div style="max-width:42rem;margin:2rem auto;padding:1.5rem;font-family:system-ui,sans-serif;color:#111"><h1>${escapeHtml(doc.title)}</h1><p>${escapeHtml(doc.summary || doc.description)}</p><p><a href="${SITE_URL}">SnapServe</a> · <a href="${SITE_URL}/blog">Blog</a></p></div></noscript>`;
  if (!next.includes('id="seo-noscript"')) {
    next = next.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    <div id="seo-noscript">${noscript}</div>`,
    );
  } else {
    next = next.replace(
      /<div id="seo-noscript">[\s\S]*?<\/div>/,
      `<div id="seo-noscript">${noscript}</div>`,
    );
  }

  return next;
}

function outPathForRoute(distDir, routePath) {
  if (routePath === "/") return join(distDir, "index.html");
  const clean = routePath.replace(/^\//, "").replace(/\/$/, "");
  return join(distDir, clean, "index.html");
}

export function prerenderSeoShells({ distDir, publicDir }) {
  const templatePath = join(distDir, "index.html");
  if (!existsSync(templatePath)) {
    throw new Error(`Missing ${templatePath} — run vite build first`);
  }

  const template = readFileSync(templatePath, "utf8");
  const docs = getAllSeoDocuments();

  for (const doc of docs) {
    const file = outPathForRoute(distDir, doc.path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, injectHead(template, doc), "utf8");
  }

  const sitemap = buildSitemapXml(docs);
  writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf8");
  if (publicDir) {
    writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
  }

  return { routes: docs.length };
}
