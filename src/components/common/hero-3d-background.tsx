"use client";

import * as React from "react";

export function Hero3DBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true; // in-viewport (IntersectionObserver)
    let isTabActive = document.visibilityState === "visible";

    // Cap DPR so we're not rendering 3x pixels on high-density screens for zero visual gain
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const applySize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();

    let resizeRAF = 0;
    const handleResize = () => {
      // debounce resize to next frame instead of doing it synchronously on every resize event
      cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(applySize);
    };
    window.addEventListener("resize", handleResize);

    // Reduce node count on smaller / lower-power screens (mobile)
    const isSmallScreen = width < 768;
    const nodeCount = isSmallScreen ? 26 : 42;
    const maxConnDist = 150;
    const maxConnDistSq = maxConnDist * maxConnDist;

    const techBadges = [
      "< AI Agent >",
      "{ TypeScript }",
      "[ Next.js ]",
      "< Python />",
      "( React )",
      "01001011",
      "[ REST API ]",
      "< RAG Pipeline >",
      "[ PostgreSQL ]",
      "< LangChain >",
      "01011001",
      "{ Docker }",
      "< Fast API />",
      "[ Supabase ]",
    ];

    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: (Math.random() - 0.5) * width * 1.4,
      y: (Math.random() - 0.5) * height * 1.4,
      z: Math.random() * 600 - 300,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.4,
      badge: techBadges[i % techBadges.length],
      isMajor: i % 3 === 0,
      pulse: Math.random() * Math.PI * 2,
    }));

    const packets = Array.from({ length: 12 }, () => ({
      from: Math.floor(Math.random() * nodeCount),
      to: Math.floor(Math.random() * nodeCount),
      progress: Math.random(),
      speed: Math.random() * 0.012 + 0.006,
    }));

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let autoAngle = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = nx * 0.45;
      targetRotX = -ny * 0.45;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Pause entirely when the hero scrolls out of view
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible && isTabActive) start();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isTabActive = document.visibilityState === "visible";
      if (isTabActive && isVisible) start();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const fov = 400;
    const glowColor = "#10b981";

    // Pre-format font strings once per scale bucket instead of every frame
    const fontCache: Record<number, string> = {};
    const getFont = (scale: number) => {
      const size = Math.max(10, Math.floor(13 * scale));
      if (!fontCache[size]) fontCache[size] = `bold ${size}px monospace`;
      return fontCache[size];
    };

    const projectedNodes: {
      x: number;
      y: number;
      z: number;
      scale: number;
      badge: string;
      isMajor: boolean;
      pulse: number;
    }[] = [];

    const render = () => {
      if (!isVisible || !isTabActive) return; // stop the loop; observers will restart it

      ctx.clearRect(0, 0, width, height);

      currentRotX += (targetRotX - currentRotX) * 0.04;
      currentRotY += (targetRotY - currentRotY) * 0.04;

      autoAngle += 0.002;
      const totalRotY = currentRotY + Math.sin(autoAngle) * 0.15;
      const totalRotX = currentRotX + Math.cos(autoAngle * 0.7) * 0.1;

      const cx = width / 2;
      const cy = height / 2;

      projectedNodes.length = 0;

      const cosX = Math.cos(totalRotX);
      const sinX = Math.sin(totalRotX);
      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        node.pulse += 0.035;

        if (Math.abs(node.x) > width * 0.75) node.vx *= -1;
        if (Math.abs(node.y) > height * 0.75) node.vy *= -1;
        if (Math.abs(node.z) > 350) node.vz *= -1;

        const y1 = node.y * cosX - node.z * sinX;
        const z1 = node.y * sinX + node.z * cosX;

        const x2 = node.x * cosY + z1 * sinY;
        const z2 = -node.x * sinY + z1 * cosY;

        const scale = fov / (fov + z2 + 300);
        if (scale > 0) {
          projectedNodes.push({
            x: cx + x2 * scale,
            y: cy + y1 * scale,
            z: z2,
            scale,
            badge: node.badge,
            isMajor: node.isMajor,
            pulse: node.pulse,
          });
        }
      }

      // 1. Connecting lines — NO shadowBlur here (this was the single biggest cost).
      // Glow is instead achieved once via a single ctx.shadowBlur pass on the nodes/packets only.
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 0;
      for (let i = 0; i < projectedNodes.length; i++) {
        const n1 = projectedNodes[i];
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n2 = projectedNodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxConnDist) * 0.5 * Math.min(n1.scale, n2.scale);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Data packets — glow applied, but only ~12 draw calls, so it's cheap.
      ctx.shadowBlur = 14;
      ctx.shadowColor = glowColor;
      ctx.fillStyle = glowColor;
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.from = Math.floor(Math.random() * projectedNodes.length);
          p.to = Math.floor(Math.random() * projectedNodes.length);
        }

        const n1 = projectedNodes[p.from];
        const n2 = projectedNodes[p.to];
        if (n1 && n2) {
          const pkX = n1.x + (n2.x - n1.x) * p.progress;
          const pkY = n1.y + (n2.y - n1.y) * p.progress;
          ctx.beginPath();
          ctx.arc(pkX, pkY, 3.5 * n1.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Nodes & badges
      projectedNodes.sort((a, b) => b.z - a.z);
      ctx.shadowBlur = 16;
      ctx.shadowColor = glowColor;
      projectedNodes.forEach((node) => {
        const alpha = Math.min(1, Math.max(0.25, node.scale * 0.9));
        const pulseFactor = Math.sin(node.pulse) * 1.5 + 4.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, (node.isMajor ? pulseFactor : 3) * node.scale, 0, Math.PI * 2);
        ctx.fillStyle = node.isMajor ? glowColor : "rgba(5, 150, 105, 0.95)";
        ctx.fill();

        if (node.isMajor) {
          ctx.font = getFont(node.scale);
          ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 0.95})`;
          ctx.fillText(node.badge, node.x + 10 * node.scale, node.y + 4 * node.scale);
        }
      });
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };
    start();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeRAF);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
    />
  );
}