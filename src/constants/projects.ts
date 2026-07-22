export type Project = {
  id: string;
  title: string;
  category: "AI & Automation" | "Full-Stack Web" | "SaaS" | "Computer Vision";
  summary: string;
  problem: string;
  solution: string;
  role: string;
  architecture: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  githubUrl?: string;
  liveUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "ai-automation-suite",
    title: "AI Automation Suite — Multi-Channel Chatbots & RAG Agent",
    category: "AI & Automation",
    summary:
      "A family of n8n-powered conversational agents deployed across web, Facebook, Instagram, and WhatsApp, backed by a shared RAG knowledge layer.",
    problem:
      "Clients needed consistent, always-on customer engagement across multiple messaging channels without hiring a support team for each one, and without their AI giving inconsistent or hallucinated answers.",
    solution:
      "Built a modular n8n workflow architecture with a central RAG agent connected to vector-embedded knowledge bases, then fanned it out to channel-specific webhooks for Web, Facebook Messenger, Instagram DMs, and WhatsApp — each with tailored conversation flows but shared retrieval logic.",
    role: "Automation Engineer — designed the workflow architecture, built the RAG pipeline, and integrated each messaging channel end to end.",
    architecture:
      "n8n orchestration layer → vector database for embeddings → RAG retrieval node → LLM response generation → channel-specific webhook adapters (Meta Graph API, WhatsApp Business API, custom web widget).",
    techStack: ["n8n", "RAG", "Vector Databases", "OpenAI", "WhatsApp Business API", "Meta Graph API", "Webhooks"],
    metrics: [
      { label: "Channels Live", value: "4" },
      { label: "Happy Clients", value: "10+" },
      { label: "Response Time", value: "<3s" },
    ],
  },
  {
    id: "velora-motors",
    title: "Velora Motors — Showroom Management System",
    category: "Full-Stack Web",
    summary:
      "A full-stack dealership management platform handling inventory, sales pipeline, and customer records for a vehicle showroom.",
    problem:
      "Manual, spreadsheet-driven tracking of vehicle inventory and customer leads was slowing down sales cycles and causing data inconsistencies across the showroom floor and back office.",
    solution:
      "Delivered a centralized showroom management system with structured inventory tracking, customer relationship records, and role-based access, replacing fragmented manual processes with a single source of truth.",
    role: "Full-Stack Developer — architected the database schema, built the backend APIs, and implemented the management dashboard.",
    architecture:
      "Relational database for inventory and customer data → REST API layer → server-rendered dashboard for showroom staff with role-based views.",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Modules", value: "Inventory · CRM · Sales" },
      { label: "Type", value: "Full-Stack" },
    ],
    githubUrl: "https://github.com/mateen-waqar/Velora-Motors-Showroom-management",
  },
  {
    id: "event-booking-platform",
    title: "Event Booking Platform",
    category: "Full-Stack Web",
    summary:
      "An end-to-end event discovery and booking platform allowing users to browse events, reserve seats, and manage bookings.",
    problem:
      "Small event organizers lacked an affordable, self-hostable booking system that handled seat/ticket availability and booking state reliably.",
    solution:
      "Built a booking platform with real-time availability tracking, a clean booking flow, and an organizer-facing view to manage events — designed to be lightweight enough for independent organizers to run themselves.",
    role: "Full-Stack Developer — built both the customer-facing booking flow and the backend logic for availability and reservations.",
    architecture:
      "Frontend booking UI → API layer handling reservation state and validation → database enforcing booking/seat integrity.",
    techStack: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
    metrics: [
      { label: "Type", value: "Full-Stack" },
      { label: "Core Feature", value: "Real-Time Booking" },
    ],
    githubUrl: "https://github.com/mateen-waqar/Event-Booking-Platform",
  },
  {
    id: "dental-appointment-agent",
    title: "Dental Appointment Booking Agent",
    category: "AI & Automation",
    summary:
      "A conversational AI agent that handles dental clinic appointment scheduling, rescheduling, and patient FAQs autonomously.",
    problem:
      "Dental clinics were losing time to manual phone-based scheduling and repetitive FAQ calls, creating friction for both staff and patients.",
    solution:
      "Designed an n8n-based conversational agent that understands natural-language scheduling requests, checks calendar availability, books or reschedules appointments, and answers common patient questions — all without human intervention.",
    role: "Automation Engineer — designed the conversation flow, calendar integration, and appointment-state logic.",
    architecture:
      "Messaging webhook → LLM intent parsing → calendar API integration for availability → automated confirmation and reminder flow.",
    techStack: ["n8n", "AI Agents", "OpenAI", "Calendar API", "Webhooks"],
    metrics: [
      { label: "Vertical", value: "Healthcare" },
      { label: "Automation", value: "End-to-End Booking" },
    ],
  },
  {
    id: "ai-virtual-mouse",
    title: "AI Virtual Mouse Using Hand Gesture",
    category: "Computer Vision",
    summary:
      "A gesture-controlled virtual mouse that lets users control their cursor and perform clicks using real-time hand tracking.",
    problem:
      "Explored a touchless, camera-based alternative to physical input devices — useful for accessibility and hands-free interaction scenarios.",
    solution:
      "Implemented real-time hand landmark detection to map finger positions to cursor movement, with gesture recognition for click and scroll actions, running entirely on-device from a webcam feed.",
    role: "AI Engineer — built the hand-tracking pipeline and gesture-to-action mapping logic.",
    architecture:
      "Webcam video stream → hand landmark detection model → gesture classification → OS-level cursor and click control.",
    techStack: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    metrics: [
      { label: "Type", value: "Computer Vision" },
      { label: "Input", value: "Real-Time Webcam" },
    ],
    githubUrl: "https://github.com/mateen-waqar/AI-Virtual-Mouse-Using-Hand-Gesture",
  },
  {
    id: "ai-teacher-agent",
    title: "AI Teacher — Tutoring & Q&A Agent",
    category: "SaaS",
    summary:
      "An AI tutoring SaaS platform that answers student questions, explains concepts, and adapts responses to a student's level using a RAG-backed knowledge base.",
    problem:
      "Students needed on-demand, accurate academic help outside classroom hours, without relying on generic chatbots that lose context or give unreliable answers.",
    solution:
      "Built an n8n-orchestrated tutoring agent with a subject-specific knowledge base via RAG, capable of holding multi-turn tutoring conversations and adjusting explanations based on follow-up questions.",
    role: "Automation Engineer — designed the retrieval pipeline and conversational flow for multi-turn tutoring sessions.",
    architecture:
      "Chat interface → n8n orchestration → RAG retrieval over subject knowledge base → LLM response with context memory across turns.",
    techStack: ["n8n", "RAG", "OpenAI", "Vector Databases", "AI Agents"],
    metrics: [
      { label: "Vertical", value: "Education SaaS" },
      { label: "Mode", value: "Multi-Turn Tutoring" },
    ],
  },
];
