export type Service = {
  id: string;
  title: string;
  description: string;
  icon:
    | "bot"
    | "workflow"
    | "code"
    | "layers"
    | "plug"
    | "cloud"
    | "sparkles"
    | "messageCircle";
  features: string[];
  span?: "wide";
};

export const SERVICES: Service[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "Turning repetitive, manual workflows into automated systems powered by LLMs — from document processing to internal ops.",
    icon: "sparkles",
    features: ["Process mapping", "LLM pipelines", "n8n / custom runners"],
    span: "wide",
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    description: "Task-specific agents that reason, call tools, and act autonomously within guardrails.",
    icon: "bot",
    features: ["Tool use", "RAG", "Multi-step reasoning"],
  },
  {
    id: "fullstack-dev",
    title: "Full-Stack Development",
    description: "End-to-end product builds — database schema to polished, responsive UI.",
    icon: "code",
    features: ["React / Next.js", "Node / Python", "Type-safe APIs"],
  },
  {
    id: "saas-dev",
    title: "SaaS Development",
    description: "Multi-tenant, subscription-ready products built to scale from day one.",
    icon: "layers",
    features: ["Auth & billing", "Multi-tenancy", "Dashboards"],
  },
  {
    id: "api-dev",
    title: "API Development",
    description: "Clean, documented, versioned APIs that other teams actually enjoy integrating with.",
    icon: "plug",
    features: ["REST / GraphQL", "OpenAPI docs", "Rate limiting & auth"],
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Connecting the tools your team already uses so work moves without manual handoffs.",
    icon: "workflow",
    features: ["Zapier / n8n", "Webhooks", "Event-driven pipelines"],
  },
  {
    id: "cloud-deployment",
    title: "Cloud Deployment",
    description: "Reliable, observable infrastructure — containerized, CI/CD'd, and production-hardened.",
    icon: "cloud",
    features: ["Docker", "AWS / Vercel", "CI/CD pipelines"],
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description: "An outside engineering perspective on architecture decisions, stack choices, and roadmaps.",
    icon: "messageCircle",
    features: ["Architecture review", "Stack selection", "Roadmap planning"],
  },
];
