"use client";

import * as React from "react";

export function About3DBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 340);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // 3D Geometry Points for 3 rotating wireframe rings & particles
    const rings = [
      { radius: 150, points: 36, tiltX: 0.4, tiltY: 0.6, speed: 0.008, color: "rgba(16, 185, 129, 0.45)" },
      { radius: 175, points: 40, tiltX: -0.5, tiltY: 0.8, speed: -0.006, color: "rgba(5, 150, 105, 0.35)" },
      { radius: 200, points: 48, tiltX: 0.7, tiltY: -0.3, speed: 0.004, color: "rgba(16, 185, 129, 0.25)" },
    ];

    const particles = Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * 320,
      y: (Math.random() - 0.5) * 380,
      z: (Math.random() - 0.5) * 200,
      size: Math.random() * 2.2 + 0.8,
      speedZ: Math.random() * 0.5 + 0.2,
    }));

    let angle = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.001;
      mouseY = (e.clientY - rect.top - height / 2) * 0.001;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 300;

      angle += 0.01;

      // Render 3D Floating Particles
      particles.forEach((p) => {
        p.z -= p.speedZ;
        if (p.z < -150) p.z = 200;

        const scale = fov / (fov + p.z);
        const px = cx + (p.x + mouseX * 100) * scale;
        const py = cy + (p.y + mouseY * 100) * scale;

        ctx.beginPath();
        ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${0.4 * scale})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#10b981";
        ctx.fill();
      });

      // Render 3D Wireframe Rings
      rings.forEach((ring, rIdx) => {
        ctx.beginPath();
        const currentAngle = angle * (rIdx % 2 === 0 ? 1 : -1);

        for (let i = 0; i <= ring.points; i++) {
          const theta = (i / ring.points) * Math.PI * 2;
          let x = Math.cos(theta) * ring.radius;
          let y = Math.sin(theta) * ring.radius;
          let z = 0;

          // 3D Rotations around X, Y, Z axes
          const cosX = Math.cos(ring.tiltX + mouseY * 2);
          const sinX = Math.sin(ring.tiltX + mouseY * 2);
          const y1 = y * cosX - z * sinX;
          const z1 = y * sinX + z * cosX;

          const cosY = Math.cos(ring.tiltY + currentAngle + mouseX * 2);
          const sinY = Math.sin(ring.tiltY + currentAngle + mouseX * 2);
          const x2 = x * cosY + z1 * sinY;
          const z2 = -x * sinY + z1 * cosY;

          const scale = fov / (fov + z2 + 100);
          const projX = cx + x2 * scale;
          const projY = cy + y1 * scale;

          if (i === 0) {
            ctx.moveTo(projX, projY);
          } else {
            ctx.lineTo(projX, projY);
          }
        }

        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#10b981";
        ctx.stroke();
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
      className="pointer-events-none absolute -inset-10 z-0 h-[calc(100%+80px)] w-[calc(100%+80px)] opacity-80"
    />
  );
}
