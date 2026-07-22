import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { BLOG_POSTS } from "@/constants/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function Blog() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <section id="blog" className="relative border-t border-border py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="// writing"
          title="Notes from the build."
          description="Longer-form thoughts on AI engineering, product decisions, and the tradeoffs that don't fit in a commit message."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Featured post */}
          {featured && (
            <Reveal className="lg:col-span-3">
              <a
                href={featured.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between gap-8 overflow-hidden rounded-xl border border-border bg-surface/40 p-8 transition-all duration-300 hover:border-border-strong hover:bg-surface/70 sm:p-10 lg:flex-row lg:items-end"
              >
                <div
                  className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative flex max-w-2xl flex-col gap-4">
                  <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-wide text-accent">
                    {featured.tag}
                  </span>
                  <h3 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="text-balance leading-relaxed text-muted">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {formatDate(featured.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {featured.readingMinutes} min read
                    </span>
                  </div>
                </div>

                <div className="relative flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-background/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors group-hover:border-accent/40 lg:self-auto">
                  Read post
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </Reveal>
          )}

          {/* Remaining posts */}
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={0.05 * i}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-5 rounded-xl border border-border bg-surface/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface/70"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-2">
                    {post.tag}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 -translate-x-1 translate-y-1 text-muted-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>

                <h3 className="flex-1 text-balance text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {post.title}
                </h3>

                <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 border-t border-border pt-5 text-xs text-muted-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {post.readingMinutes} min
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
