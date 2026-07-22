"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/constants/site";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Navbar() {
  const { progress, scrolled } = useScrollProgress();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className="h-px bg-gradient-to-r from-primary via-secondary to-accent origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
      <div
        className={`container-px transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          className={`relative mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
            scrolled ? "glass shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]" : ""
          }`}
        >
          <Link
            href="#top"
            aria-label="Home"
            className="group relative flex items-center justify-center transition-transform duration-300 hover:scale-110"
          >
            <Logo className="size-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
          </Link>

          {/* Perfectly Centered Navigation Items */}
          <div className="hidden items-center gap-1 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-muted-2 transition-colors hover:text-[#10b981] hover:bg-black/5 dark:hover:bg-white/[0.05]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="primary" size="sm" asChild className="bg-[#10b981] text-white dark:text-[#030706] hover:bg-[#10b981]/90 font-bold">
              <a href="#contact">Contact</a>
            </Button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex size-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>Menu</SheetTitle>
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="rounded-lg px-3 py-3 text-base text-foreground hover:bg-black/5 dark:hover:bg-white/[0.05]"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <Button variant="primary" asChild className="bg-[#10b981] text-white dark:text-[#030706] hover:bg-[#10b981]/90 font-bold">
                    <a href="#contact">Contact</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
