"use client";

import { Reveal } from "@/components/common/reveal";
import { SKILL_CATEGORIES } from "@/constants/skills";

// Flatten all skills for a single smooth marquee row
const allSkills = SKILL_CATEGORIES.flatMap((cat) => cat.skills);

// Duplicate arrays for seamless infinite looping
const marqueeItems = [...allSkills, ...allSkills, ...allSkills];

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-border/60 py-20 bg-background overflow-hidden">
      {/* Background ambient emerald glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-[#10b981]/5 blur-[180px]" />

      <div className="container-px mx-auto max-w-6xl mb-10">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#10b981]">
              TECHNICAL PROFICIENCY
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Skills &{" "}
              <span className="text-[#10b981] drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                Technologies
              </span>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Smooth Single Line Sliding Marquee Bar */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Edge Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent" />

        {/* Single Row: Sliding Left */}
        <div className="flex overflow-hidden select-none py-3">
          <div className="flex shrink-0 animate-marquee items-center gap-3.5 transform-gpu will-change-transform py-2">
            {marqueeItems.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div
                  key={`bubble-${skill.name}-${i}`}
                  className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-4.5 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#10b981]/70 hover:bg-surface-2 hover:shadow-[0_0_22px_rgba(16,185,129,0.35)] hover:scale-105 cursor-pointer"
                >
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                    <Icon className="size-3.5" />
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-wide text-foreground whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
