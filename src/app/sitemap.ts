import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = `https://${SITE.domain}`;

  // Single-page site — fragment anchors (#projects, #about, etc.) aren't
  // separately indexable, so the sitemap only ever needs the one entry.
  // Bump lastModified whenever content meaningfully changes.
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
