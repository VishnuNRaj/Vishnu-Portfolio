import type { MetadataRoute } from "next";

import { env } from "@/lib/server";

export default function sitemap(): MetadataRoute.Sitemap {
  const rootParams = {
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  return [
    { url: env.APP_URL, ...rootParams },
    { url: `${env.APP_URL}/projects`, ...rootParams, priority: 0.9 },
    { url: `${env.APP_URL}/experience`, ...rootParams, priority: 0.9 },
    { url: `${env.APP_URL}/education`, ...rootParams, priority: 0.8 },
  ];
}
