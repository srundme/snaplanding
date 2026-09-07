import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import ContentLayout from "../components/ContentLayout";
import FunnelCTA from "../components/FunnelCTA";
import PartnerForm from "../components/PartnerForm";
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
        <div className="not-prose space-y-14">
          <Reveal>
            <p className="label">Why SnapServe</p>
            <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10">
              {page.benefits.map((benefit) => (
                <div key={benefit.title} className="border-t border-[#27272a] pt-5">
                  <h2 className="text-[15.5px] font-semibold tracking-[-0.02em] text-white">
                    {benefit.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#8b929d]">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="label">How it works</p>
            <ol className="mt-6 space-y-0 divide-y divide-[#27272a] border-y border-[#27272a]">
              {page.steps.map((step, i) => (
                <li key={step} className="flex gap-4 py-4">
                  <span className="w-8 shrink-0 font-mono text-[12px] text-[#14B8A6]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-[#c4c9d1]">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <FAQSection faqs={page.faq} id={`faq-${page.slug}`} />

          <Reveal>
            <PartnerForm
              source={`solutions/${page.slug}`}
              competitor={page.competitor || ""}
              title={
                page.competitor
                  ? `Switching from ${page.competitor}?`
                  : "Ready to run on SnapServe?"
              }
              subtitle={
                page.competitor
                  ? `Tell us you're coming from ${page.competitor} — we'll help you migrate and open the live console after you submit.`
                  : "Share your use case and we'll follow up within one business day. The console opens right after submit."
              }
            />
          </Reveal>

          <FunnelCTA />

          {page.relatedBlog && (
            <div className="border-t border-[#27272a] pt-6">
              <p className="label">Deep dive</p>
              <Link
                to={`/blog/${page.relatedBlog}`}
                className="mt-2 inline-block text-[14px] text-[#5EEAD4] transition-colors hover:text-white"
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
