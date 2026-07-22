"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => setDisplay(Math.round(v)));
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
