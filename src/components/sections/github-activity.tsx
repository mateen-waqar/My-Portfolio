"use client";

import * as React from "react";
import { Star, GitFork, Users, BookMarked, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { Card } from "@/components/ui/card";
import { SITE } from "@/constants/site";
import { useGithubStats, languageColor } from "@/hooks/use-github-stats";
import { cn } from "@/lib/utils";

// lucide-react no longer ships brand marks — hand-drawn to match lucide's
// 24x24 / stroke-2 footprint so it sits flush with the rest of the icon set.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 2.86-.39c.97 0 1.95.13 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55 4.52-1.5 7.77-5.76 7.77-10.78C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

const StatCard = React.memo(function StatCard({
  icon: Icon,
  label,
  value,
  loading,
}: {
  icon: typeof Star;
  label: string;
  value: string;
  loading: boolean;
}) {
  return (
    <Card className="flex flex-col gap-3 p-6">
      <div className="flex items-center gap-2 text-muted-2">
        <Icon className="size-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      {loading ? (
        <div className="h-7 w-16 animate-pulse rounded-md bg-white/[0.06]" />
      ) : (
        <span className="text-2xl font-semibold tracking-tight text-foreground">{value}</span>
      )}
    </Card>
  );
});

export function GithubActivity() {
  const state = useGithubStats(SITE.githubUsername);
  const loading = state.status === "loading";
  const data = state.status === "ready" ? state.data : null;

  const topRepos = React.useMemo(
    () =>
      data ? [...data.repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6) : [],
    [data]
  );

  return (
    <section id="github" className="relative border-t border-border py-28">
      <div className="container-px mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="// github"
            title="What I&apos;ve been shipping."
            description="Pulled live from GitHub — real repos, real activity, no curated highlight reel."
          />
          <Reveal delay={0.1}>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface"
            >
              <GithubIcon className="size-4" />
              @{SITE.githubUsername}
            </a>
          </Reveal>
        </div>

        {state.status === "error" ? (
          <Reveal delay={0.1} className="mt-14">
            <Card className="flex flex-col items-center gap-3 p-12 text-center">
              <p className="text-sm text-muted">
                GitHub&apos;s live API is rate-limiting this preview right now. The activity is all real —
                have a look directly on the profile.
              </p>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                View on GitHub <ExternalLink className="size-3.5" />
              </a>
            </Card>
          </Reveal>
        ) : (
          <>
            {/* Stat cards */}
            <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
              <Reveal delay={0}>
                <StatCard
                  icon={BookMarked}
                  label="Public Repos"
                  value={data ? String(data.user.public_repos) : "—"}
                  loading={loading}
                />
              </Reveal>
              <Reveal delay={0.05}>
                <StatCard
                  icon={Star}
                  label="Total Stars"
                  value={data ? String(data.totalStars) : "—"}
                  loading={loading}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <StatCard
                  icon={Users}
                  label="Followers"
                  value={data ? String(data.user.followers) : "—"}
                  loading={loading}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <StatCard
                  icon={GitFork}
                  label="Top Language"
                  value={data?.topLanguages[0]?.name ?? "—"}
                  loading={loading}
                />
              </Reveal>
            </div>

            {/* Contribution graph */}
            <Reveal delay={0.1} className="mt-5">
              <Card className="overflow-hidden p-6 sm:p-8">
                <h3 className="mb-5 text-sm font-medium text-muted-2">Contribution activity</h3>
                <div className="overflow-x-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element -- third-party
                      generated SVG chart with no fixed intrinsic size; next/image
                      isn't a fit for an external unsized SVG endpoint like this. */}
                  <img
                    src={`https://ghchart.rshah.org/06b6d4/${SITE.githubUsername}`}
                    alt={`${SITE.githubUsername}'s GitHub contribution graph`}
                    className="min-w-[720px]"
                    loading="lazy"
                  />
                </div>
              </Card>
            </Reveal>

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-5">
              {/* Top repos */}
              <div className="lg:col-span-3">
                <h3 className="mb-5 text-sm font-medium text-muted-2">Top repositories</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {loading &&
                    Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="h-36 animate-pulse p-6">
                        <div className="h-4 w-2/3 rounded bg-white/[0.06]" />
                        <div className="mt-3 h-3 w-full rounded bg-white/[0.04]" />
                        <div className="mt-2 h-3 w-4/5 rounded bg-white/[0.04]" />
                      </Card>
                    ))}
                  {!loading && topRepos.length === 0 && (
                    <p className="text-sm text-muted-2">No public repositories yet.</p>
                  )}
                  {topRepos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-3 rounded-xl border border-border bg-surface/40 p-6 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface/70"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="truncate text-sm font-semibold text-foreground">
                          {repo.name}
                        </span>
                        <ExternalLink className="size-3.5 shrink-0 text-muted-2 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
                        {repo.description ?? "No description provided."}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-2">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="size-2 rounded-full"
                              style={{ backgroundColor: languageColor(repo.language) }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="size-3" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="size-3" /> {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Language breakdown */}
              <div className="lg:col-span-2">
                <h3 className="mb-5 text-sm font-medium text-muted-2">Language breakdown</h3>
                <Card className="flex h-full flex-col gap-4 p-6">
                  {loading &&
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-3 w-full animate-pulse rounded bg-white/[0.05]" />
                    ))}
                  {!loading && data?.topLanguages.length === 0 && (
                    <p className="text-sm text-muted-2">No language data available.</p>
                  )}
                  {data?.topLanguages.map((lang) => (
                    <div key={lang.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                          <span
                            className="size-2 rounded-full"
                            style={{ backgroundColor: languageColor(lang.name) }}
                          />
                          {lang.name}
                        </span>
                        <span className="text-muted-2">{lang.percent}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className={cn("h-full rounded-full transition-all duration-700")}
                          style={{
                            width: `${lang.percent}%`,
                            backgroundColor: languageColor(lang.name),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
