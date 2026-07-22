import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Services } from "@/components/sections/services";

// Below-the-fold and client-heavy — Contact pulls in
// react-hook-form + zod purely for an interaction the visitor may never
// reach. Splitting into its own chunk keeps it off the critical
// path for the initial Hero/About/Skills paint.
const Contact = dynamic(
  () => import("@/components/sections/contact").then((m) => m.Contact),
  {
    loading: () => (
      <div className="min-h-[640px] border-t border-border py-28" aria-hidden />
    ),
  }
);

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Services />
      <Contact />
    </main>
  );
}
