import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = `https://${SITE.domain}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
