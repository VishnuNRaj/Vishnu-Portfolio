import type { MetadataRoute } from "next";

import { env } from "@/lib/server";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    "",
    "/projects",
    "/experience",
    "/education",
  ].map((path) => ({
    url: `${env.APP_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
