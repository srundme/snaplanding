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

function staticBody(doc) {
  const canonical = absoluteUrl(doc.path === "/" ? "/" : doc.path);
  return `<main id="seo-shell" style="max-width:48rem;margin:0 auto;padding:4rem 1.5rem;font-family:system-ui,sans-serif;color:#f5f7fa;background:#050607"><p style="font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:#5eead4">SnapServe</p><h1>${escapeHtml(doc.title)}</h1><p>${escapeHtml(doc.summary || doc.description)}</p><nav aria-label="Primary"><a style="color:#5eead4" href="${SITE_URL}">Home</a> · <a style="color:#5eead4" href="${SITE_URL}/blog">Guides</a> · <a style="color:#5eead4" href="${SITE_URL}/partner">Partner</a></nav><p><a style="color:#5eead4" href="${escapeHtml(canonical)}">Open this page</a></p></main>`;
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
    doc.type === "article" && doc.publishedTime
      ? `<meta property="article:published_time" content="${escapeHtml(doc.publishedTime)}" />`
      : "",
    doc.type === "article" && doc.modifiedTime
      ? `<meta property="article:modified_time" content="${escapeHtml(doc.modifiedTime)}" />`
      : "",
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
  next = next.replace(/<meta name="robots"[^>]*>/gi, "");
  next = next.replace(/<link rel="canonical"[^>]*>/i, "");
  next = next.replace(/<meta property="og:[^"]+"[^>]*>/gi, "");
  next = next.replace(/<meta property="article:[^"]+"[^>]*>/gi, "");
  next = next.replace(/<meta name="twitter:[^"]+"[^>]*>/gi, "");
  next = next.replace("<head>", `<head>\n    ${headBits}`);
  next = next.replace(
    '<div id="root"></div>',
    `<div id="root">${staticBody(doc)}</div>`,
  );

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
