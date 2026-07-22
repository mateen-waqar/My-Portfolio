import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiDocker,
  SiLangchain,
  SiN8N,
  SiGit,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { Sparkles, Bot, Network, Database } from "lucide-react";

export type Skill = { name: string; icon: IconType | typeof Sparkles };

export type SkillCategory = {
  id: string;
  title: string;
  blurb: string;
  span: "wide" | "tall" | "normal";
  skills: Skill[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai",
    title: "AI Engineering & Automation",
    blurb: "Agents, retrieval pipelines, and n8n workflows.",
    span: "wide",
    skills: [
      { name: "n8n", icon: SiN8N },
      { name: "AI Agents", icon: Bot },
      { name: "RAG", icon: Database },
      { name: "OpenAI API", icon: Sparkles },
      { name: "LangChain", icon: SiLangchain },
      { name: "MCP", icon: Network },
    ],
  },
  {
    id: "web",
    title: "Full-Stack Web Development",
    blurb: "Modern React, Next.js, and TypeScript architectures.",
    span: "wide",
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
    ],
  },
  {
    id: "backend-data",
    title: "Databases & Cloud Infrastructure",
    blurb: "Relational data modeling, vector stores, and containerized deployments.",
    span: "wide",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Supabase", icon: SiSupabase },
      { name: "Redis", icon: SiRedis },
      { name: "Docker", icon: SiDocker },
      { name: "AWS", icon: FaAws },
      { name: "Git", icon: SiGit },
    ],
  },
];
