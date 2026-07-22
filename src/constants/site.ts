export const SITE = {
  name: "S. M. Mateen Ud Din",
  shortName: "Mateen",
  role: "Software Engineer",
  avatarUrl: "/profile.png",
  fullAvatarUrl: "/profile-full.png",
  taglineRoles: ["Software Engineer", "AI Engineer", "Full-Stack Developer"],
  tagline: "I build products that work — from the database schema to the pixel on screen.",
  location: "Lahore, Pakistan",
  university: "COMSATS University Islamabad, Lahore Campus",
  email: "connect.mateenwaqar@gmail.com",
  whatsapp: "+923141688073",
  github: "https://github.com/mateen-waqar",
  githubUsername: "mateen-waqar",
  linkedin: "https://www.linkedin.com/in/mateen-waqar-4a325a330",
  company: { name: "Sanestix", role: "Co-Founder", url: "https://www.sanestix.com" },
  resumeUrl: "/resume.pdf", // TODO: drop a real resume PDF into /public
  availability: "Available for new opportunities",
  domain: "mateenuddin.dev", // TODO: replace with real domain
  stats: { experienceYears: 1, happyClients: 10, projectsCompleted: 10 },
} as const;

export const NAV_LINKS = [
  { label: "HOME", href: "#top" },
  { label: "ABOUT", href: "#about" },
  { label: "EDUCATION", href: "#education" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SERVICES", href: "#services" },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: SITE.github, icon: "github" },
  { label: "LinkedIn", href: SITE.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${SITE.email}`, icon: "mail" },
  { label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp.replace("+", "")}`, icon: "whatsapp" },
] as const;
