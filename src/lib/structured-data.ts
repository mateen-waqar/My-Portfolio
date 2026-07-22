import { SITE } from "@/constants/site";

/**
 * A single @graph containing both a Person and a WebSite node, cross-linked.
 * Kept as one script tag rather than two so crawlers see the relationship
 * between "who" and "what" in a single parse — this is what Google's Rich
 * Results docs recommend over separate, disconnected JSON-LD blocks.
 */
export function buildStructuredData() {
  const siteUrl = `https://${SITE.domain}`;

  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: SITE.name,
    url: siteUrl,
    jobTitle: SITE.role,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: SITE.university,
    },
    worksFor: {
      "@type": "Organization",
      name: SITE.company.name,
      url: SITE.company.url,
    },
    knowsAbout: [
      "Software Engineering",
      "Artificial Intelligence",
      "Full-Stack Development",
      "Next.js",
      "AI Agents",
      "Workflow Automation",
    ],
    sameAs: [SITE.github, SITE.linkedin],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE.name,
    description: SITE.tagline,
    publisher: { "@id": `${siteUrl}/#person` },
    inLanguage: "en-US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website],
  };
}
