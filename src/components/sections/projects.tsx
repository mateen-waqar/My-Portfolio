"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, ExternalLink, X } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 2.86-.39c.97 0 1.95.13 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55 4.52-1.5 7.77-5.76 7.77-10.78C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { PROJECTS, type Project } from "@/constants/projects";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "AI & Automation", "Full-Stack Web", "SaaS", "Computer Vision"] as const;

function ProjectCard({
  project,
  delay,
  onSelect,
}: {
  project: Project;
  delay: number;
  onSelect: (project: Project) => void;
}) {
  return (
    <Reveal delay={delay}>
      <button
        onClick={() => onSelect(project)}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#10b981]/50 hover:bg-surface-2 hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]"
      >
        {/* Glowing Emerald Accent Border Line */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#10b981]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-start justify-between gap-3">
          <Badge variant="accent" className="text-[11px] font-mono px-3 py-1 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30">
            {project.category}
          </Badge>
          <div className="flex size-8 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981] transition-all group-hover:bg-[#10b981] group-hover:text-white dark:group-hover:text-[#030706] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-[#10b981] transition-colors">
          {project.title}
        </h3>
        <p className="mt-2.5 text-xs leading-relaxed text-muted line-clamp-3">
          {project.summary}
        </p>

        {/* Tech Stack Pills */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[10px] text-foreground group-hover:border-[#10b981]/30 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[10px] text-[#10b981]">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Metrics Footer */}
        <div className="mt-auto pt-4 border-t border-border mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="text-xs font-bold text-foreground group-hover:text-[#10b981] transition-colors">
                {metric.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-muted-2">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </button>
    </Reveal>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = React.useState<string>("All");
  const [showAll, setShowAll] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState<Project | null>(null);

  const filtered = React.useMemo(
    () =>
      activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const displayedProjects = showAll ? filtered : filtered.slice(0, 3);

  const handleSelect = React.useCallback((project: Project) => {
    setActiveProject(project);
  }, []);

  return (
    <section id="projects" className="relative border-t border-border/60 py-24 bg-background overflow-hidden">
      {/* Ambient Radial Background Emerald Glow */}
      <div className="pointer-events-none absolute left-0 top-1/3 size-[500px] rounded-full bg-[#10b981]/5 blur-[180px]" />
      <div className="pointer-events-none absolute right-0 bottom-10 size-[400px] rounded-full bg-emerald-600/5 blur-[160px]" />

      <div className="container-px mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            eyebrow="PORTFOLIO"
            title={
              <>
                Featured{" "}
                <span className="text-[#10b981] drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                  Projects
                </span>
              </>
            }
            description="Real-world AI systems, high-scale web platforms, and automated workflows built with modern engineering."
            align="center"
            className="mx-auto text-center"
          />
        </div>

        {/* Filter Pills */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setShowAll(false);
                }}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-mono font-semibold transition-all duration-300",
                  activeFilter === filter
                    ? "border-[#10b981] bg-[#10b981] text-white dark:text-[#030706] shadow-[0_0_18px_rgba(16,185,129,0.4)]"
                    : "border-border bg-surface text-foreground hover:border-[#10b981]/40"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid of Projects */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={0.05 * (i % 3)}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Show More Work Button */}
        {filtered.length > 3 && (
          <Reveal delay={0.15}>
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="group flex items-center gap-2.5 rounded-full border border-[#10b981]/40 bg-surface px-7 py-3 text-xs font-mono font-bold text-foreground backdrop-blur-md shadow-lg transition-all duration-300 hover:border-[#10b981] hover:bg-[#10b981] hover:text-white dark:hover:text-[#030706] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              >
                <span>{showAll ? "SHOW LESS WORK" : "EXPLORE MORE WORK"}</span>
              </button>
            </div>
          </Reveal>
        )}
      </div>

      {/* Detail Modal Dialog */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          />
          <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute right-4 top-4 rounded-full border border-border bg-surface-2 p-2 text-muted transition-colors hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            <Badge variant="accent" className="text-xs font-mono bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30">
              {activeProject.category}
            </Badge>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {activeProject.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {activeProject.summary}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#10b981]">
                  Problem & Challenge
                </h4>
                <p className="mt-1.5 text-xs text-foreground leading-relaxed">
                  {activeProject.problem}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#10b981]">
                  Solution & Architecture
                </h4>
                <p className="mt-1.5 text-xs text-foreground leading-relaxed">
                  {activeProject.solution}
                </p>
                <p className="mt-2 text-xs text-muted leading-relaxed font-mono">
                  {activeProject.architecture}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#10b981]">
                Technologies & Tools
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-border pt-6">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-5 py-2.5 text-xs font-bold text-foreground transition-all hover:border-[#10b981] hover:text-[#10b981]"
                >
                  <GithubIcon className="size-4" />
                  View Source
                </a>
              )}
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[#10b981] px-5 py-2.5 text-xs font-bold text-white dark:text-[#030706] shadow-lg transition-all hover:bg-[#10b981]/90"
                >
                  <ExternalLink className="size-4" />
                  Live Product
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
