"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPin, Sparkles, Target, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCE } from "@/constants/experience";
import { cn } from "@/lib/utils";

function ExperienceCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof EXPERIENCE)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentId = `experience-panel-${item.id}`;

  return (
    <Reveal delay={0.05 * index} className="relative pl-10 sm:pl-14">
      {/* timeline rail */}
      <div className="absolute left-0 top-0 flex h-full w-10 flex-col items-center sm:w-14">
        <span
          className={cn(
            "z-10 mt-1.5 size-3 shrink-0 rounded-full border-2 transition-colors duration-300",
            isOpen
              ? "border-[#10b981] bg-[#10b981] shadow-[0_0_12px_#10b981]"
              : "border-[#10b981]/40 bg-background"
          )}
        />
        {index < EXPERIENCE.length - 1 && (
          <span className="mt-1 w-px flex-1 bg-gradient-to-b from-[#10b981]/50 to-transparent" />
        )}
      </div>

      <div className="pb-4">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className={cn(
            "group flex w-full flex-col gap-3 rounded-xl border border-border bg-surface p-4 text-left transition-all hover:border-[#10b981]/40 hover:bg-surface-2 sm:p-5",
            isOpen && "border-[#10b981]/40 bg-surface-2"
          )}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {item.role}
                </h3>
                <Badge variant="accent">{item.type}</Badge>
              </div>
              <p className="mt-1.5 text-sm font-medium text-muted-2">
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-foreground/80 underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent"
                  >
                    {item.company}
                  </a>
                ) : (
                  <span className="text-foreground/80">{item.company}</span>
                )}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
              <span className="font-mono text-xs uppercase tracking-wide text-muted-2">
                {item.period}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <MapPin className="size-3.5 text-muted-2" />
                {item.location}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="max-w-2xl text-sm leading-relaxed text-muted">
              {item.summary}
            </p>
            <ChevronDown
              className={cn(
                "size-5 shrink-0 text-muted-2 transition-transform duration-300 group-hover:text-accent",
                isOpen && "rotate-180 text-accent"
              )}
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              id={contentId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <div className="mt-4 grid grid-cols-1 gap-6 rounded-xl border border-border bg-surface-2 p-6 sm:grid-cols-2 sm:p-7">
                <div>
                  <h4 className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    <Wrench className="size-3.5" />
                    Responsibilities
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {item.responsibilities.map((responsibility) => (
                      <li
                        key={responsibility}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-2" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    <Sparkles className="size-3.5" />
                    Achievements &amp; Impact
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {item.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:col-span-2">
                  <h4 className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    <Target className="size-3.5" />
                    Technologies
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function Experience() {
  // Closed by default as requested
  const [openIds, setOpenIds] = React.useState<string[]>([]);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="experience" className="relative border-t border-border/60 py-16 sm:py-20 bg-background">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="CAREER JOURNEY"
          title={
            <>
              Work{" "}
              <span className="text-[#10b981] drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                Experience
              </span>
            </>
          }
          description="A short timeline — from personal projects to co-founding a studio. Tap any role to toggle details."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mt-10">
          {EXPERIENCE.map((item, i) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={i}
              isOpen={openIds.includes(item.id)}
              onToggle={() => toggleOpen(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
