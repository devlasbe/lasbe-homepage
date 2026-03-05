import type { MetadataRoute } from "next";
import { SEO } from "@/constants/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: SEO.SITEMAP_URL,
    host: SEO.SITE_URL,
  };
}
