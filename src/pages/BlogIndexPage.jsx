import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ContentLayout from "../components/ContentLayout";
import { blogPosts } from "../data/blogPosts";
import { buildBlogIndexGraph } from "../lib/seoCatalog";

const BLOG_SEO = {
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
};

export default function BlogIndexPage() {
  return (
    <>
      <Seo
        title={BLOG_SEO.title}
        description={BLOG_SEO.description}
        pathname="/blog"
        keywords={BLOG_SEO.keywords}
        jsonLd={[buildBlogIndexGraph()]}
      />
      <ContentLayout
        eyebrow="Blog"
        title="Guides on voice AI that ships."
        description="Platform comparisons, pricing, and outbound playbooks — for teams evaluating SnapServe and the wider market."
        backHref="/"
      >
        <div className="grid gap-3 not-prose">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group border-b border-[#27272a] py-7 transition-colors first:pt-0 last:border-b-0"
            >
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-[#52525b]">
                <span>{post.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{post.publishedAt}</span>
              </div>
              <h2 className="mt-3 text-[1.15rem] font-semibold tracking-[-0.025em] text-white transition-colors group-hover:text-[#5EEAD4] md:text-[1.25rem]">
                {post.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#8b929d]">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
