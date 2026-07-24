"use client";

import * as React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { SITE } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/common/magnetic";
import { SocialLinks } from "@/components/common/social-links";
import { Parallax } from "@/components/common/parallax";
import { Hero3DBackground } from "@/components/common/hero-3d-background";

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % SITE.taglineRoles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // GSAP entrance timeline
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-badge]", { y: 16, opacity: 0, duration: 0.6 })
        .from(
          "[data-hero-line]",
          { y: 40, opacity: 0, duration: 0.8, stagger: 0.08 },
          "-=0.3"
        )
        .from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          "[data-hero-cta] > *",
          { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.35"
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background pt-28 pb-24"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%" }}
    >
      {/* 3D Tech Data Network Background */}
      <Hero3DBackground />

      {/* Ambient Gradient Emerald Blobs */}
      <Parallax offset={40} className="absolute inset-0">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[#10b981]/10 blur-[140px]" />
      </Parallax>
      <Parallax offset={70} className="absolute inset-0">
        <div className="pointer-events-none absolute bottom-[-200px] right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-600/10 blur-[120px]" />
      </Parallax>

      {/* Cursor Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(16, 185, 129, 0.12), transparent 60%)",
        }}
      />

      <div className="container-px relative mx-auto w-full max-w-4xl">
        <div className="flex flex-col items-center text-center">
          {/* Hero Profile Avatar */}
          <div
            data-hero-badge
            className="group relative mb-8 flex flex-col items-center"
          >
            <div className="relative size-32 sm:size-40 rounded-full p-[3px] bg-gradient-to-tr from-[#10b981] via-[#059669] to-[#10b981]">
              <div className="relative size-full overflow-hidden rounded-full border-2 border-background/90 bg-surface">
                <Image
                  src={SITE.avatarUrl}
                  alt={SITE.name}
                  width={180}
                  height={180}
                  priority
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="relative -mt-3 inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-surface/90 px-3.5 py-1.5 shadow-lg backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-muted">{SITE.availability}</span>
            </div>
          </div>

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span data-hero-line className="block text-muted">
              Hi, I&apos;m
            </span>
            <span data-hero-line className="text-gradient block">
              {SITE.name}
            </span>
          </h1>

          <div
            data-hero-sub
            className="mt-6 h-8 font-mono text-lg text-[#10b981] sm:text-xl font-semibold"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={SITE.taglineRoles[roleIndex]}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="block"
              >
                {SITE.taglineRoles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p
            data-hero-sub
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
          >
            {SITE.tagline}
          </p>

          <div
            data-hero-cta
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Magnetic>
              <Button variant="primary" size="lg" asChild className="bg-[#10b981] text-[#030706] hover:bg-[#10b981]/90 font-bold">
                <a href="#projects">
                  View projects
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="outline" size="lg" asChild className="border-[#10b981]/30 hover:border-[#10b981] hover:text-[#10b981]">
                <a href={SITE.resumeUrl} download>
                  Resume
                  <FileDown className="size-4" />
                </a>
              </Button>
            </Magnetic>
          </div>

          {/* Social Links (GitHub, LinkedIn, Gmail, WhatsApp) */}
          <SocialLinks className="mt-10" />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-[#10b981]"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}