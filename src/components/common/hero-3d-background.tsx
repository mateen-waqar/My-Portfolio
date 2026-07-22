"use client";

import * as React from "react";

export function Hero3DBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Tech Badges
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

    // 3D Nodes Network
    const nodeCount = 60;
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

    // Data packets
    const packets = Array.from({ length: 18 }, () => ({
      from: Math.floor(Math.random() * nodeCount),
      to: Math.floor(Math.random() * nodeCount),
      progress: Math.random(),
      speed: Math.random() * 0.012 + 0.006,
    }));

    // Target and smoothed mouse rotation variables
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let autoAngle = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from center (-1 to 1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      targetRotY = nx * 0.45; // Yaw rotation around Y axis
      targetRotX = -ny * 0.45; // Pitch rotation around X axis
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const fov = 400;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Buttery smooth lerp (exponential smoothing) for cursor movement
      currentRotX += (targetRotX - currentRotX) * 0.04;
      currentRotY += (targetRotY - currentRotY) * 0.04;

      // Continuous subtle ambient spin
      autoAngle += 0.002;
      const totalRotY = currentRotY + Math.sin(autoAngle) * 0.15;
      const totalRotX = currentRotX + Math.cos(autoAngle * 0.7) * 0.1;

      const cx = width / 2;
      const cy = height / 2;

      // Project & update 3D nodes
      const projectedNodes: { x: number; y: number; z: number; scale: number; badge: string; isMajor: boolean; pulse: number }[] = [];

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        node.pulse += 0.035;

        // Wrap 3D boundaries smoothly
        if (Math.abs(node.x) > width * 0.75) node.vx *= -1;
        if (Math.abs(node.y) > height * 0.75) node.vy *= -1;
        if (Math.abs(node.z) > 350) node.vz *= -1;

        // 3D Rotations around X & Y axes with smoothed mouse coords
        const cosX = Math.cos(totalRotX);
        const sinX = Math.sin(totalRotX);
        const y1 = node.y * cosX - node.z * sinX;
        const z1 = node.y * sinX + node.z * cosX;

        const cosY = Math.cos(totalRotY);
        const sinY = Math.sin(totalRotY);
        const x2 = node.x * cosY + z1 * sinY;
        const z2 = -node.x * sinY + z1 * cosY;

        const scale = fov / (fov + z2 + 300);
        if (scale > 0) {
          const px = cx + x2 * scale;
          const py = cy + y1 * scale;
          projectedNodes.push({
            x: px,
            y: py,
            z: z2,
            scale,
            badge: node.badge,
            isMajor: node.isMajor,
            pulse: node.pulse,
          });
        }
      });

      // 1. Draw 3D Connecting Grid Lines
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 170) {
            const alpha = (1 - dist / 170) * 0.55 * Math.min(n1.scale, n2.scale);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = "#10b981";
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw Traveling Data Packets
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
          ctx.fillStyle = "#10b981";
          ctx.shadowBlur = 16;
          ctx.shadowColor = "#10b981";
          ctx.fill();
        }
      });

      // 3. Draw 3D Tech Nodes & Badges
      projectedNodes.sort((a, b) => b.z - a.z); // Depth sorting
      projectedNodes.forEach((node) => {
        const alpha = Math.min(1, Math.max(0.25, node.scale * 0.9));
        const pulseFactor = Math.sin(node.pulse) * 1.5 + 4.5;

        // Glowing Core Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, (node.isMajor ? pulseFactor : 3) * node.scale, 0, Math.PI * 2);
        ctx.fillStyle = node.isMajor ? "#10b981" : "rgba(5, 150, 105, 0.95)";
        ctx.shadowBlur = node.isMajor ? 18 : 10;
        ctx.shadowColor = "#10b981";
        ctx.fill();

        // Tech Badge Label
        if (node.isMajor) {
          ctx.font = `bold ${Math.max(10, Math.floor(13 * node.scale))}px monospace`;
          ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 0.95})`;
          ctx.shadowBlur = 14;
          ctx.shadowColor = "#10b981";
          ctx.fillText(node.badge, node.x + 10 * node.scale, node.y + 4 * node.scale);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
    />
  );
}
