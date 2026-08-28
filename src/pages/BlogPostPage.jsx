import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import ContentLayout from "../components/ContentLayout";
import ContentRenderer from "../components/ContentRenderer";
import FunnelCTA from "../components/FunnelCTA";
import { getBlogPost, getRelatedPosts } from "../data/blogPosts";
import { buildBlogGraph } from "../lib/seo";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post.slug, 2);

  return (
    <>
      <Seo
        title={`${post.title} | SnapServe`}
        description={post.description}
        pathname={`/blog/${post.slug}`}
        keywords={post.keywords}
        type="article"
        jsonLd={[buildBlogGraph(post)]}
      />
      <ContentLayout
        eyebrow={`${post.readTime} · ${post.publishedAt}`}
        title={post.title}
        description={post.excerpt}
        backHref="/blog"
        backLabel="← All articles"
        footer={
          <div className="not-prose mt-12 space-y-8">
            <FunnelCTA
              title="Ready to launch your AI voice agents?"
              subtitle="Start with $5 free credit — caller memory, campaigns, and auto-redial included."
            />

            {post.funnelSlug && (
              <div className="rounded-xl border border-[#27272a] bg-[#0a0a0a] p-6">
                <p className="label">Related solution</p>
                <Link
                  to={`/solutions/${post.funnelSlug}`}
                  className="mt-2 inline-block text-[#14B8A6] hover:underline"
                >
                  Explore the {post.funnelSlug.replace(/-/g, " ")} funnel →
                </Link>
              </div>
            )}

            {related.length > 0 && (
              <div>
                <p className="label mb-4">More guides</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/blog/${item.slug}`}
                      className="rounded-lg border border-[#27272a] p-4 text-sm text-[#a1a1aa] transition-colors hover:border-[#14B8A6]/40 hover:text-white"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        }
      >
        <ContentRenderer sections={post.sections} />
      </ContentLayout>
    </>
  );
}
