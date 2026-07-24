"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { EDUCATION } from "@/constants/education";

export function Education() {
  return (
    <section id="education" className="relative border-t border-border/60 py-16 sm:py-20 bg-background overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#10b981]/5 blur-[150px]" />

      <div className="container-px mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#10b981]">
              ACADEMIC JOURNEY
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              My{" "}
              <span className="relative inline-block text-[#10b981]">
                Education
                <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981]" />
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Vertical Timeline Layout with Scroll Slide-in Animations */}
        <div className="relative mt-14">
          {/* Vertical Emerald Stem Line */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#10b981] via-[#10b981]/50 to-transparent shadow-[0_0_10px_#10b981] sm:left-1/2 sm:-translate-x-1/2" />

          <div className="flex flex-col gap-10">
            {EDUCATION.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Glowing Node Dot on Timeline */}
                  <div className="absolute left-4 top-5 z-10 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#10b981] bg-background shadow-[0_0_10px_#10b981] sm:left-1/2">
                    <div className="size-1 rounded-full bg-[#10b981]" />
                  </div>

                  {/* Card Container with Framer Motion Slide-In on Scroll */}
                  <div className="ml-8 w-full sm:ml-0 sm:w-1/2 sm:px-4">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
                      className="group relative rounded-2xl border border-border bg-surface/90 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-[#10b981]/40 hover:bg-surface-2 hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.2)]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] shadow-md transition-transform group-hover:scale-110">
                          <GraduationCap className="size-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#10b981]">
                              {item.id.includes("comsats")
                                ? "UNIVERSITY"
                                : item.id.includes("intermediate")
                                ? "COLLEGE"
                                : "SCHOOL"}
                            </span>
                            <span className="font-mono text-xs text-muted-2">
                              • {item.period}
                            </span>
                          </div>
                          <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground">
                            {item.degree}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-muted">
                        {item.institution}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}