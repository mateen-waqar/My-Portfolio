import Image from "next/image";
import { Rocket, Briefcase } from "lucide-react";
import { Reveal } from "@/components/common/reveal";
import { About3DBackground } from "@/components/common/about-3d-background";
import { SITE } from "@/constants/site";

export function About() {
  return (
    <section id="about" className="relative border-t border-border/60 py-28 overflow-hidden bg-background">
      {/* Background emerald glow */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#10b981]/10 blur-[150px]" />
      
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Portrait photo with 3D animation background */}
          <Reveal className="lg:col-span-5 flex justify-center">
            <div className="relative size-72 sm:size-80 flex items-center justify-center">
              {/* Interactive 3D Canvas Background Animation */}
              <About3DBackground />

              {/* Outer rotated geometric emerald wireframe rings */}
              <div className="absolute -inset-4 rounded-full border border-[#10b981]/30 rotate-12 transition-transform duration-700 hover:rotate-45 pointer-events-none shadow-[0_0_30px_rgba(16,185,129,0.2)]" />
              <div className="absolute -inset-8 rounded-full border border-[#10b981]/20 -rotate-12 transition-transform duration-700 hover:-rotate-45 pointer-events-none" />
              
              {/* Main Image Container */}
              <div className="relative z-10 size-full overflow-hidden rounded-full border-2 border-[#10b981]/50 bg-surface shadow-[0_0_50px_rgba(16,185,129,0.3)] group">
                <Image
                  src={SITE.avatarUrl}
                  alt={SITE.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="320px"
                />
              </div>
            </div>
          </Reveal>

          {/* Right Column: About Info & Feature Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#10b981]">
                ABOUT ME
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
                Crafting Digital{" "}
                <span className="text-[#10b981] drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                  Masterpieces
                </span>{" "}
                with Code.
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                I am <strong className="text-foreground font-semibold">{SITE.name}</strong>, a Computer Science undergraduate at COMSATS University Islamabad, Lahore Campus and Software Engineer. I specialize in building fast, scalable web applications and AI agents that bridge the gap between complex logic and beautiful interfaces.
              </p>
            </Reveal>

            {/* 2 Feature Cards */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Reveal delay={0.18}>
                <div className="group rounded-xl border border-border bg-surface p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#10b981]/50 hover:bg-surface-2 hover:-translate-y-1 shadow-lg">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#10b981]/10 text-[#10b981] transition-transform group-hover:scale-110">
                    <Rocket className="size-5" />
                  </div>
                  <p className="mt-4 text-xl font-bold tracking-tight text-foreground">
                    10+
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-2">
                    PROJECTS
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Modern digital solutions
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="group rounded-xl border border-border bg-surface p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#10b981]/50 hover:bg-surface-2 hover:-translate-y-1 shadow-lg">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#10b981]/10 text-[#10b981] transition-transform group-hover:scale-110">
                    <Briefcase className="size-5" />
                  </div>
                  <p className="mt-4 text-xl font-bold tracking-tight text-foreground">
                    2+ Years
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-2">
                    EXPERIENCE
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Production engineering & software design
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
