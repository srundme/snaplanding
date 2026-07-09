import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import ContentLayout from "../components/ContentLayout";
import FunnelCTA from "../components/FunnelCTA";
import FAQSection from "../components/FAQSection";
import { getFunnelBySlug } from "../data/funnelPages";
import { buildFunnelGraph } from "../lib/seo";
import { Reveal } from "../components/motion/Reveal";

export default function FunnelPage() {
  const { slug } = useParams();
  const page = getFunnelBySlug(slug);

  if (!page) return <Navigate to="/" replace />;

  return (
    <>
      <Seo
        title={`${page.title} | SnapServe`}
        description={page.metaDescription}
        pathname={`/solutions/${page.slug}`}
        keywords={page.keywords}
        jsonLd={[buildFunnelGraph(page)]}
      />
      <ContentLayout
        eyebrow={page.hero.badge}
        title={page.hero.headline}
        description={page.hero.subline}
        backHref="/"
        backLabel="← Back to home"
      >
        <div className="not-prose space-y-12">
          <Reveal>
            <p className="label">Why SnapServe</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {page.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-xl border border-[#27272a] bg-[#0a0a0a] p-5"
                >
                  <h2 className="text-base font-semibold text-white">{benefit.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#71717a]">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="label">How it works</p>
            <ol className="mt-4 space-y-3">
              {page.steps.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-[#27272a] bg-black/50 p-4"
                >
                  <span className="font-mono text-sm text-[#14B8A6]">0{i + 1}</span>
                  <span className="text-sm text-[#a1a1aa]">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <FAQSection faqs={page.faq} id={`faq-${page.slug}`} />

          <FunnelCTA />

          {page.relatedBlog && (
            <div className="rounded-xl border border-[#27272a] bg-[#0a0a0a] p-6">
              <p className="label">Deep dive</p>
              <Link
                to={`/blog/${page.relatedBlog}`}
                className="mt-2 inline-block text-[#14B8A6] hover:underline"
              >
                Read the full guide →
              </Link>
            </div>
          )}
        </div>
      </ContentLayout>
    </>
  );
}
