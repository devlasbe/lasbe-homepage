import { MetadataRoute } from "next";
import { PUBLIC_WINDOW_CONFIGS } from "@/constants/windowConfigs";
import { SEO } from "@/constants/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const windowEntries: MetadataRoute.Sitemap = PUBLIC_WINDOW_CONFIGS.map((config) => ({
    url: `${SEO.SITE_URL}/${config.id}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const entries: MetadataRoute.Sitemap = [
    {
      url: SEO.SITE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...windowEntries,
  ];
  return entries;
}
