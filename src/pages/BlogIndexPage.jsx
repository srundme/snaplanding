import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ContentLayout from "../components/ContentLayout";
import { blogPosts } from "../data/blogPosts";
import { organizationSchema, websiteSchema } from "../lib/seo";

export default function BlogIndexPage() {
  return (
    <>
      <Seo
        title="AI Voice Agent Blog — Guides for Indian Business | SnapServe"
        description="Guides on AI voice agent platforms, low-cost voice agents in India, alternatives to Vapi and Bolna, and outbound calling playbooks."
        pathname="/blog"
        keywords={[
          "ai voice agent blog",
          "voice ai guides india",
          "best voice agents india",
          "low cost voice agents india",
          "ai voice agent platform",
        ]}
        jsonLd={[organizationSchema(), websiteSchema()]}
      />
      <ContentLayout
        eyebrow="Blog"
        title="AI voice agent guides for India."
        description="Platform comparisons, pricing guides, and outbound playbooks — written for business teams evaluating voice AI."
        backHref="/"
      >
        <div className="grid gap-4 not-prose">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-xl border border-[#27272a] bg-[#0a0a0a] p-6 transition-colors hover:border-[#14B8A6]/40"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#52525b]">
                  {post.readTime}
                </span>
                <span className="text-[#3f3f46]">·</span>
                <span className="font-mono text-[10px] text-[#52525b]">{post.publishedAt}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-white transition-colors group-hover:text-[#14B8A6]">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#71717a]">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.keywords.slice(0, 3).map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-[#27272a] px-2.5 py-0.5 font-mono text-[9px] text-[#52525b]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </ContentLayout>
    </>
  );
}
