"use client";

import { ArrowUp } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-px mx-auto max-w-6xl py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm text-foreground">
              {SITE.shortName}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-base font-semibold leading-relaxed text-foreground">
              {SITE.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-2">
                Navigate
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-muted-2">
                Elsewhere
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <a
                    href={SITE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.resumeUrl}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-2">
            © {year} {SITE.name}. Built from scratch, no templates.
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-muted transition-colors hover:text-foreground hover:border-border-strong"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}