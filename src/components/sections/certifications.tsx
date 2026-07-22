import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { CERTIFICATIONS } from "@/constants/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="relative border-t border-border py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="// certifications"
          title="Credentials that back it up."
          description="Structured learning alongside the shipped work — the boxes checked along the way."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.id} delay={0.05 * i} className="h-full">
              <a
                href={cert.credentialUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border border-border bg-surface/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface/70"
              >
                {/* subtle corner glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-accent/10 blur-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border-strong bg-gradient-to-br from-primary/15 to-accent/10 text-accent">
                    <Award className="size-5" />
                  </div>
                  <ExternalLink className="size-4 shrink-0 text-muted-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-2">{cert.issuer}</p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-2">
                    <ShieldCheck className="size-3.5 text-accent" />
                    <span className="font-mono">{cert.date}</span>
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {cert.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-[11px] text-muted-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
