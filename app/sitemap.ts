import { MetadataRoute } from "next";
import { SEO } from "@/constants/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SEO.SITE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
