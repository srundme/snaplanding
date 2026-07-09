import { Link } from "react-router-dom";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import { blogPosts } from "../data/blogPosts";

export default function BlogPreviewSection() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="bento-border border-b bg-black p-8 md:p-12 lg:p-14">
      <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label">Resources</p>
          <h2 className="headline-lg mt-3 max-w-xl">
            Guides on{" "}
            <span className="brand-gradient-text">AI voice agents in India.</span>
          </h2>
          <p className="body-text mt-3 max-w-lg">
            Keyword guides, platform comparisons, and outbound playbooks for Indian business.
          </p>
        </div>
        <Link to="/blog" className="outline-btn w-fit shrink-0">
          View all articles
        </Link>
      </Reveal>

      <Stagger className="mt-10 grid gap-4 md:grid-cols-3" stagger={0.06}>
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-xl border border-[#27272a] bg-[#0a0a0a] p-6 transition-colors hover:border-[#14B8A6]/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#52525b]">
                {post.readTime} · {post.publishedAt}
              </p>
              <h3 className="mt-3 text-base font-semibold text-white transition-colors group-hover:text-[#14B8A6]">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#71717a]">{post.excerpt}</p>
              <span className="mt-4 text-sm text-[#14B8A6]">Read guide →</span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
