"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft radial glow that trails the cursor across the entire page.
 * Deliberately subtle — this is ambience, not a spotlight. Mounted once
 * in the root layout, sits behind all content (pointer-events-none),
 * and stays inert on touch devices and for users who've asked the OS
 * for reduced motion — both handled in pure CSS so there's no
 * client-only state/hydration branching to manage.
 */
export function CursorGlow() {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const springX = useSpring(x, { stiffness: 120, damping: 25, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 120, damping: 25, mass: 0.5 });

  React.useEffect(() => {
    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden opacity-70 will-change-transform [@media(pointer:fine)]:block motion-reduce:!hidden"
      style={{
        background:
          "radial-gradient(480px circle at 0 0, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)",
        x: springX,
        y: springY,
      }}
    />
  );
}
