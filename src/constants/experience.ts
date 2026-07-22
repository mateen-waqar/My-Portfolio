export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  techStack: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "sanestix-cofounder",
    role: "Co-Founder & Lead Engineer",
    company: "Sanestix",
    companyUrl: "https://www.sanestix.com",
    period: "Jan 2024 — Present",
    location: "Lahore, Pakistan · Remote",
    type: "Founder",
    summary:
      "Co-founded a small software studio building full-stack products and AI automation systems for clients across e-commerce, automotive, and events.",
    responsibilities: [
      "Own technical architecture end to end — schema design, API contracts, frontend implementation, and deployment.",
      "Design and build n8n-based RAG chatbot pipelines connected to client knowledge bases and messaging channels.",
      "Scope and price client engagements, then deliver against those estimates solo or with a small contractor pool.",
      "Handle production support — logging, error triage, and iteration once a client's product is live.",
    ],
    achievements: [
      "Shipped a multi-channel RAG chatbot suite live across Web, Facebook, Instagram, and WhatsApp for 10+ clients.",
      "Delivered a showroom CRM and an event-booking platform, both currently running in production.",
      "Built the studio's reusable n8n workflow library, cutting new chatbot integration time significantly.",
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "n8n", "PostgreSQL", "OpenAI API", "RAG", "Docker"],
  },
  {
    id: "freelance-fullstack",
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    period: "Jun 2023 — Present",
    location: "Lahore, Pakistan · Remote",
    type: "Freelance",
    summary:
      "Took on small business and personal-project engagements before Sanestix, building internal tools and learning what it actually takes to ship to real users.",
    responsibilities: [
      "Built internal tools and small websites for local businesses, working directly with non-technical clients.",
      "Handled the full loop — requirements, build, deploy, and post-launch fixes — with no team to hand off to.",
      "Learned to budget and quote time honestly after underestimating a couple of early projects.",
    ],
    achievements: [
      "Delivered every engagement to a paying client without a missed handover.",
      "Built a seat-locking ticketing platform as a personal project to test concurrency handling under load.",
    ],
    techStack: ["React", "Next.js", "Express", "MongoDB", "Tailwind CSS"],
  },
];
