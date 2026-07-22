export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issuerUrl?: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
};

// TODO: replace with real credential URLs once issued.
export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issuerUrl: "https://aws.amazon.com/certification/",
    date: "2024",
    credentialUrl: "#",
    skills: ["AWS", "Cloud Architecture", "IAM"],
  },
  {
    id: "meta-frontend",
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    issuerUrl: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    date: "2023",
    credentialUrl: "#",
    skills: ["React", "JavaScript", "UI Engineering"],
  },
  {
    id: "postgresql-fundamentals",
    title: "PostgreSQL for Everybody",
    issuer: "University of Michigan (Coursera)",
    issuerUrl: "https://www.coursera.org/specializations/postgresql-for-everybody",
    date: "2023",
    credentialUrl: "#",
    skills: ["PostgreSQL", "SQL", "Database Design"],
  },
  {
    id: "langchain-ai",
    title: "LangChain for LLM Application Development",
    issuer: "DeepLearning.AI",
    issuerUrl: "https://www.deeplearning.ai",
    date: "2024",
    credentialUrl: "#",
    skills: ["LangChain", "RAG", "AI Agents"],
  },
  {
    id: "docker-fundamentals",
    title: "Docker Foundations Professional Certificate",
    issuer: "Docker, Inc.",
    issuerUrl: "https://www.docker.com",
    date: "2024",
    credentialUrl: "#",
    skills: ["Docker", "Containers", "DevOps"],
  },
  {
    id: "problem-solving",
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    issuerUrl: "https://www.hackerrank.com",
    date: "2023",
    credentialUrl: "#",
    skills: ["Data Structures", "Algorithms"],
  },
];
