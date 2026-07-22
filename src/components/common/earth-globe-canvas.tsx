"use client";

import * as React from "react";
import { type Skill } from "@/constants/skills";

// Continent landmass data (lat/long ranges for land points)
const CONTINENTS = [
  { latMin: 15, latMax: 72, lngMin: -168, lngMax: -52, density: 140 }, // NA
  { latMin: -55, latMax: 13, lngMin: -82, lngMax: -35, density: 100 },  // SA
  { latMin: 35, latMax: 70, lngMin: -10, lngMax: 40, density: 90 },    // EU
  { latMin: -35, latMax: 37, lngMin: -18, lngMax: 51, density: 120 },  // AF
  { latMin: 5, latMax: 75, lngMin: 40, lngMax: 180, density: 220 },   // AS
  { latMin: -42, latMax: -11, lngMin: 112, lngMax: 154, density: 70 }, // AU
  { latMin: -85, latMax: -65, lngMin: -180, lngMax: 180, density: 70 },// AN
];

function generateLandmassPoints(): { lat: number; lng: number }[] {
  const points: { lat: number; lng: number }[] = [];
  CONTINENTS.forEach((region) => {
    for (let i = 0; i < region.density; i++) {
      const u = Math.random();
      const v = Math.random();
      const lat = region.latMin + u * (region.latMax - region.latMin);
      const lng = region.lngMin + v * (region.lngMax - region.lngMin);
      if (region.lngMin === 40 && lng < 60 && lat < 25) continue;
      points.push({ lat, lng });
    }
  });
  return points;
}

// Map skills to real-world tech hub geographic coordinates (lat/long) like countries on Earth
const SKILL_GEO_COORDS: Record<string, { lat: number; lng: number; locationName: string }> = {
  "React": { lat: 37.77, lng: -122.41, locationName: "San Francisco" },
  "Next.js": { lat: 40.71, lng: -74.00, locationName: "New York" },
  "TypeScript": { lat: 47.60, lng: -122.33, locationName: "Seattle" },
  "JavaScript": { lat: 42.36, lng: -71.05, locationName: "Boston" },
  "Tailwind CSS": { lat: 34.05, lng: -118.24, locationName: "Los Angeles" },
  "HTML5": { lat: 48.20, lng: 16.37, locationName: "Vienna" },
  "CSS3": { lat: 52.52, lng: 13.40, locationName: "Berlin" },
  "Node.js": { lat: 43.65, lng: -79.38, locationName: "Toronto" },
  "Express": { lat: 52.36, lng: 4.90, locationName: "Amsterdam" },
  "Python": { lat: 30.26, lng: -97.74, locationName: "Austin" },
  "Flask": { lat: -33.92, lng: 18.42, locationName: "Cape Town" },
  "FastAPI": { lat: 48.85, lng: 2.35, locationName: "Paris" },
  "PostgreSQL": { lat: 51.50, lng: -0.12, locationName: "London" },
  "MongoDB": { lat: 53.34, lng: -6.26, locationName: "Dublin" },
  "MySQL": { lat: 59.32, lng: 18.06, locationName: "Stockholm" },
  "Redis": { lat: 41.90, lng: 12.49, locationName: "Rome" },
  "Supabase": { lat: 1.35, lng: 103.81, locationName: "Singapore" },
  "OpenAI API": { lat: 37.78, lng: -122.40, locationName: "Silicon Valley" },
  "LangChain": { lat: 41.87, lng: -87.62, locationName: "Chicago" },
  "MCP": { lat: 37.56, lng: 126.97, locationName: "Seoul" },
  "AI Agents": { lat: 50.11, lng: 8.68, locationName: "Frankfurt" },
  "n8n": { lat: 48.13, lng: 11.58, locationName: "Munich" },
  "RAG": { lat: 32.08, lng: 34.78, locationName: "Tel Aviv" },
  "Vector DBs": { lat: 22.31, lng: 114.16, locationName: "Hong Kong" },
  "AWS": { lat: 38.90, lng: -77.03, locationName: "Washington DC" },
  "Docker": { lat: 47.37, lng: 8.54, locationName: "Zurich" },
  "Firebase": { lat: 37.38, lng: -122.08, locationName: "Mountain View" },
  "Vercel": { lat: 37.77, lng: -122.43, locationName: "San Francisco" },
  "Git": { lat: 35.67, lng: 139.65, locationName: "Tokyo" },
  "GitHub": { lat: 35.68, lng: 139.76, locationName: "Tokyo" },
  "Linux": { lat: 60.16, lng: 24.93, locationName: "Helsinki" },
  "Postman": { lat: 12.97, lng: 77.59, locationName: "Bengaluru" },
  "VS Code": { lat: -33.86, lng: 151.20, locationName: "Sydney" },
  "Figma": { lat: -23.55, lng: -46.63, locationName: "Sao Paulo" },
};

export type EarthGlobeCanvasProps = {
  skills: (Skill & { categoryId?: string })[];
  activeSkillName?: string | null;
  onSkillSelect?: (skill: (Skill & { categoryId?: string }) | null) => void;
};

export function EarthGlobeCanvas({
  skills,
  activeSkillName,
  onSkillSelect,
}: EarthGlobeCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Initial Globe Rotation
  const rotXRef = React.useRef<number>(0.2);
  const rotYRef = React.useRef<number>(0.0);
  const velXRef = React.useRef<number>(0.0);
  const velYRef = React.useRef<number>(0.0);

  const isDraggingRef = React.useRef<boolean>(false);
  const lastMousePosRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoveredIndexRef = React.useRef<number | null>(null);

  const landmassPoints = React.useMemo(() => generateLandmassPoints(), []);

  // Map skills to exact Earth geographic positions (Lat/Lng) like countries on Earth
  const skillPositions = React.useMemo(() => {
    const fallbackPhiRatio = (1 + Math.sqrt(5)) / 2;

    return skills.map((skill, i) => {
      const geo = SKILL_GEO_COORDS[skill.name];
      let latRad: number;
      let lngRad: number;
      let locName = "";

      if (geo) {
        latRad = (geo.lat * Math.PI) / 180;
        lngRad = (geo.lng * Math.PI) / 180;
        locName = geo.locationName;
      } else {
        const y = 1 - (i / Math.max(1, skills.length - 1)) * 2;
        const theta = 2 * Math.PI * i / fallbackPhiRatio;
        latRad = Math.asin(y);
        lngRad = theta;
      }

      return {
        skill,
        lat: latRad,
        lng: lngRad,
        locationName: locName,
      };
    });
  }, [skills]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let pulseTime = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(container);

    const render = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const globeRadius = Math.min(width, height) * 0.30;

      pulseTime += 0.04;

      // Spin Earth round and round continuously
      if (isDraggingRef.current) {
        rotXRef.current += velXRef.current;
        rotYRef.current += velYRef.current;
        velXRef.current *= 0.88;
        velYRef.current *= 0.88;
      } else {
        rotYRef.current += 0.0035; // Earth rotation speed
        rotXRef.current += velXRef.current;
        rotYRef.current += velYRef.current;
        velXRef.current *= 0.92;
        velYRef.current *= 0.92;
      }

      rotXRef.current = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, rotXRef.current));

      const rotX = rotXRef.current;
      const rotY = rotYRef.current;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // 3D Spherical -> 2D Screen Projection
      const project3D = (lat: number, lng: number, r: number) => {
        const x0 = r * Math.cos(lat) * Math.cos(lng);
        const y0 = r * Math.sin(lat);
        const z0 = r * Math.cos(lat) * Math.sin(lng);

        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;

        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const fov = 550;
        const scale = fov / (fov + z2);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;

        return { px, py, z: z2, scale };
      };

      // 1. Atmosphere Radial Glow
      const atmosphereGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        globeRadius * 0.8,
        centerX,
        centerY,
        globeRadius * 1.32
      );
      atmosphereGrad.addColorStop(0, "rgba(16, 185, 129, 0.16)");
      atmosphereGrad.addColorStop(0.5, "rgba(16, 185, 129, 0.05)");
      atmosphereGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = atmosphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.32, 0, Math.PI * 2);
      ctx.fill();

      // 2. Earth Globe Dark Base Sphere
      const globeGrad = ctx.createRadialGradient(
        centerX - globeRadius * 0.3,
        centerY - globeRadius * 0.3,
        globeRadius * 0.05,
        centerX,
        centerY,
        globeRadius
      );
      globeGrad.addColorStop(0, "rgba(10, 18, 14, 0.96)");
      globeGrad.addColorStop(0.7, "rgba(5, 10, 8, 0.98)");
      globeGrad.addColorStop(1, "rgba(3, 7, 6, 1)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
      ctx.fillStyle = globeGrad;
      ctx.shadowBlur = 28;
      ctx.shadowColor = "rgba(16, 185, 129, 0.38)";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Emerald Specular Edge Rim
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
      ctx.stroke();

      // 3. Latitude & Longitude Graticule Lines
      ctx.lineWidth = 0.7;
      const latSteps = [-60, -30, 0, 30, 60];
      latSteps.forEach((latDeg) => {
        const latRad = (latDeg * Math.PI) / 180;
        ctx.beginPath();
        let isFirst = true;

        for (let lngDeg = 0; lngDeg <= 360; lngDeg += 10) {
          const lngRad = (lngDeg * Math.PI) / 180;
          const p = project3D(latRad, lngRad, globeRadius);

          if (p.z < 0) {
            if (isFirst) {
              ctx.moveTo(p.px, p.py);
              isFirst = false;
            } else {
              ctx.lineTo(p.px, p.py);
            }
          } else {
            isFirst = true;
          }
        }
        ctx.strokeStyle = latDeg === 0 ? "rgba(0, 216, 255, 0.22)" : "rgba(0, 216, 255, 0.1)";
        ctx.stroke();
      });

      // 4. Continent Landmass Dots (Earth Countries/Continents)
      landmassPoints.forEach((pt) => {
        const latRad = (pt.lat * Math.PI) / 180;
        const lngRad = (pt.lng * Math.PI) / 180;
        const p = project3D(latRad, lngRad, globeRadius);

        if (p.z < 0) {
          const depthAlpha = Math.max(0.1, 1 - Math.abs(p.z) / (globeRadius * 1.1));
          ctx.beginPath();
          ctx.arc(p.px, p.py, 1.2 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 216, 255, ${0.5 * depthAlpha})`;
          ctx.fill();
        }
      });

      // 5. SKILLS Mapped like Countries/Hubs on Earth Surface
      const projectedSkills = skillPositions.map((skillPos, idx) => {
        const p = project3D(skillPos.lat, skillPos.lng, globeRadius);
        const isActiveSkill = activeSkillName === skillPos.skill.name;
        const isHovered = hoveredIndexRef.current === idx;

        return {
          idx,
          skill: skillPos.skill,
          locationName: skillPos.locationName,
          px: p.px,
          py: p.py,
          z: p.z,
          scale: p.scale,
          isActiveSkill,
          isHovered,
        };
      });

      // Sort back-to-front by depth Z
      projectedSkills.sort((a, b) => b.z - a.z);

      projectedSkills.forEach((item) => {
        const { px, py, z, scale, isActiveSkill, isHovered } = item;
        const isFront = z < 0; // Front side of the spinning Earth sphere

        let opacity = isFront ? Math.max(0.35, 1 - Math.abs(z) / (globeRadius * 1.1)) : 0.12;
        if (isActiveSkill || isHovered) opacity = 1.0;

        ctx.save();
        ctx.globalAlpha = opacity;

        if (isFront) {
          // A. Pulsing Target Beacon Ring at the Country Location
          const ringPulse = (Math.sin(pulseTime * 2 + item.idx) * 0.5 + 0.5) * 6 * scale + 4 * scale;
          ctx.beginPath();
          ctx.arc(px, py, ringPulse, 0, Math.PI * 2);
          ctx.strokeStyle = isActiveSkill || isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 216, 255, 0.4)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // B. Country Location Dot
          ctx.beginPath();
          ctx.arc(px, py, (isActiveSkill || isHovered ? 4 : 2.5) * scale, 0, Math.PI * 2);
          ctx.fillStyle = isActiveSkill || isHovered ? "#ffffff" : "#00d8ff";
          ctx.fill();

          // C. Skill Label Pill attached directly to the Country location on Earth
          const label = item.skill.name;
          const fontPx = Math.max(10, Math.floor(11.5 * scale));
          ctx.font = `${isActiveSkill || isHovered ? "bold" : "600"} ${fontPx}px monospace`;

          const metrics = ctx.measureText(label);
          const padX = 7 * scale;
          const padY = 3.5 * scale;
          const badgeW = metrics.width + padX * 2;
          const badgeH = 18 * scale;

          const bx = px + 6 * scale;
          const by = py - badgeH / 2;

          // Glass pill background
          ctx.beginPath();
          ctx.roundRect(bx, by, badgeW, badgeH, 4 * scale);

          if (isActiveSkill || isHovered) {
            ctx.fillStyle = "#00d8ff";
            ctx.shadowBlur = 14;
            ctx.shadowColor = "#00d8ff";
          } else {
            ctx.fillStyle = "rgba(10, 15, 29, 0.82)";
          }
          ctx.fill();

          ctx.lineWidth = isActiveSkill || isHovered ? 1.5 : 1;
          ctx.strokeStyle = isActiveSkill || isHovered ? "#ffffff" : "rgba(0, 216, 255, 0.4)";
          ctx.stroke();

          // Skill Text Label
          ctx.fillStyle = isActiveSkill || isHovered ? "#0a0f1d" : "#ffffff";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(label, bx + padX, by + badgeH / 2 + 0.5);
        } else {
          // Faded dot for skills on the back hemisphere of Earth
          ctx.beginPath();
          ctx.arc(px, py, 1.8 * scale, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 216, 255, 0.3)";
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const getPointerPos = (e: MouseEvent | Touch) => {
      const rect = container.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const touch = "touches" in e ? e.touches[0] : e;
      lastMousePosRef.current = getPointerPos(touch);
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const touch = "touches" in e ? e.touches[0] : (e as MouseEvent);
      const pointerPos = getPointerPos(touch);

      if (isDraggingRef.current) {
        const dx = pointerPos.x - lastMousePosRef.current.x;
        const dy = pointerPos.y - lastMousePosRef.current.y;

        velYRef.current = dx * 0.005;
        velXRef.current = dy * 0.005;

        lastMousePosRef.current = pointerPos;
      } else {
        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const globeRadius = Math.min(rect.width, rect.height) * 0.30;

        const rotX = rotXRef.current;
        const rotY = rotYRef.current;
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        let closestIdx: number | null = null;
        let minDist = 24;

        skillPositions.forEach((skillPos, idx) => {
          const x0 = globeRadius * Math.cos(skillPos.lat) * Math.cos(skillPos.lng);
          const y0 = globeRadius * Math.sin(skillPos.lat);
          const z0 = globeRadius * Math.cos(skillPos.lat) * Math.sin(skillPos.lng);

          const x1 = x0 * cosY + z0 * sinY;
          const z1 = -x0 * sinY + z0 * cosY;
          const y2 = y0 * cosX - z1 * sinX;
          const z2 = y0 * sinX + z1 * cosX;

          if (z2 < 0) {
            const scale = 550 / (550 + z2);
            const px = centerX + x1 * scale;
            const py = centerY + y2 * scale;

            const dist = Math.hypot(px - pointerPos.x, py - pointerPos.y);
            if (dist < minDist) {
              minDist = dist;
              closestIdx = idx;
            }
          }
        });

        hoveredIndexRef.current = closestIdx;
        container.style.cursor = closestIdx !== null ? "pointer" : "grab";
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      container.style.cursor = "grab";
    };

    const handleClick = () => {
      if (hoveredIndexRef.current !== null) {
        const clickedSkill = skillPositions[hoveredIndexRef.current]?.skill || null;
        onSkillSelect?.(clickedSkill);
      }
    };

    const node = container;
    node.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    node.addEventListener("click", handleClick);

    node.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      node.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      node.removeEventListener("click", handleClick);

      node.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [landmassPoints, skillPositions, activeSkillName, onSkillSelect]);

  return (
    <div
      ref={containerRef}
      className="relative flex size-full min-h-[460px] sm:min-h-[560px] items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
