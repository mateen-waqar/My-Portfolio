export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  readingMinutes: number;
  tag: string;
  href: string;
  featured?: boolean;
};

// TODO: wire this up to the real Medium/Dev.to RSS feed (or an MDX
// content collection) once the first three posts are published —
// structure below is written to make either swap a drop-in.
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "rag-pipelines-production",
    title: "What actually breaks when you take a RAG pipeline to production",
    excerpt:
      "Chunking strategy, retrieval quality, and the eval loop most demos skip entirely — notes from shipping RAG chatbots for real client knowledge bases.",
    date: "2025-11-18",
    readingMinutes: 9,
    tag: "AI Engineering",
    href: "#",
    featured: true,
  },
  {
    id: "nextjs-app-router-mental-model",
    title: "The mental model that made the App Router click for me",
    excerpt:
      "Server components, streaming, and where state actually lives — a practical map for developers coming from the Pages Router.",
    date: "2025-09-02",
    readingMinutes: 7,
    tag: "Next.js",
    href: "#",
  },
  {
    id: "n8n-vs-custom-runner",
    title: "n8n vs. a custom workflow runner: when to stop dragging nodes",
    excerpt:
      "A framework for deciding when visual automation tools start costing more than they save, based on three client migrations.",
    date: "2025-07-14",
    readingMinutes: 6,
    tag: "Automation",
    href: "#",
  },
  {
    id: "type-safe-api-contracts",
    title: "Type-safe API contracts without the ceremony",
    excerpt:
      "Zod schemas as the single source of truth for validation, types, and docs — one definition, three problems solved.",
    date: "2025-05-22",
    readingMinutes: 5,
    tag: "TypeScript",
    href: "#",
  },
  {
    id: "founder-engineer-context-switch",
    title: "Being the founder and the engineer at the same time",
    excerpt:
      "How the context-switch between roadmap and codebase changed the way I scope work, write specs, and say no.",
    date: "2025-03-10",
    readingMinutes: 8,
    tag: "Building",
    href: "#",
  },
];
