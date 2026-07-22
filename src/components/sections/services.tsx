"use client";

import * as React from "react";
import {
  Bot,
  Workflow,
  Code2,
  Layers,
  Plug,
  Cloud,
  Sparkles,
  MessageCircle,
  ArrowUpRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { SERVICES } from "@/constants/services";

const ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  workflow: Workflow,
  code: Code2,
  layers: Layers,
  plug: Plug,
  cloud: Cloud,
  sparkles: Sparkles,
  messageCircle: MessageCircle,
};

export function Services() {
  const [showAll, setShowAll] = React.useState(false);
  const displayedServices = showAll ? SERVICES : SERVICES.slice(0, 4);

  return (
    <section id="services" className="relative border-t border-border/60 py-20 bg-background overflow-hidden">
      {/* Background ambient emerald glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#10b981]/5 blur-[160px]" />

      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="SERVICES & SOLUTIONS"
          title={
            <>
              What I{" "}
              <span className="text-[#10b981] drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                Offer
              </span>
            </>
          }
          description="High-impact engineering engagements tailored for startups, businesses, and digital products."
        />

        {/* Elegant Compact Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {displayedServices.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.id} delay={0.04 * (i % 4)}>
                <a
                  href="#contact"
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0a120e]/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#10b981]/50 hover:bg-[#0f1c16] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.2)]"
                >
                  <div>
                    {/* Top Row: Index + Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-muted-2 group-hover:text-[#10b981] transition-colors">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold tracking-tight text-white group-hover:text-[#10b981] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-4">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex flex-wrap gap-1.5">
                        {service.features.slice(0, 2).map((feat) => (
                          <span
                            key={feat}
                            className="rounded-md border border-white/5 bg-[#030706]/80 px-2 py-0.5 font-mono text-[10px] text-muted-2"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight className="size-4 text-muted-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#10b981]" />
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Show More Button */}
        {SERVICES.length > 4 && (
          <Reveal delay={0.12}>
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="group flex items-center gap-2.5 rounded-full border border-[#10b981]/40 bg-[#0a120e]/90 px-6 py-2.5 text-xs font-semibold text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:border-[#10b981] hover:bg-[#10b981] hover:text-[#030706] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <span>{showAll ? "Show less services" : "Show more services"}</span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-300 ${
                    showAll ? "rotate-180" : "group-hover:translate-y-0.5"
                  }`}
                />
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
