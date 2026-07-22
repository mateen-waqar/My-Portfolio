"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } },
};

/**
 * Wraps a list of `StaggerItem`s and reveals them in sequence once the
 * container scrolls into view. Cheaper than N individual `Reveal`s with
 * manually offset delays, and keeps the timing consistent.
 */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const Comp = motion[as];
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = motion[as];
  return (
    <Comp variants={itemVariants} className={className}>
      {children}
    </Comp>
  );
}
