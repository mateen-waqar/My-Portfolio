"use client";

import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shifts children vertically as their container scrolls through the
 * viewport. Meant for decorative depth (gradient blobs, floating shapes) —
 * never for content that needs to stay put, since it's purely a transform
 * and doesn't affect layout.
 */
export function Parallax({
  children,
  className,
  offset = 60,
}: {
  children: React.ReactNode;
  className?: string;
  /** Total px of vertical travel across the scroll range. Keep small — this is ambience, not a slideshow. */
  offset?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={cn("pointer-events-none", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
