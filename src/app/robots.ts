import type { MetadataRoute } from "next";

import { env } from "@/lib/server";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/manage/", "/api/"],
    },
    sitemap: `${env.APP_URL}/sitemap.xml`,
  };
}
