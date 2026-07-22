"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

const VARIANTS: Record<"fade" | "blur" | "scale", Variants> = {
  // Default — fade + slide up. Used everywhere today.
  fade: {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
  },
  // Softer, more editorial — pairs well with large hero-adjacent copy.
  blur: {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  // Slight scale-in — good for standalone cards, badges, stat tiles.
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
};

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  className,
  as = "div",
  variant = "fade",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "li";
  variant?: "fade" | "blur" | "scale";
}) {
  const Comp = motion[as];
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={VARIANTS[variant]}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </Comp>
  );
}
