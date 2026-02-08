import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://thiepcuoi.online";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Published wedding pages
  try {
    const weddings = await prisma.wedding.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 1000,
    });

    const weddingPages: MetadataRoute.Sitemap = weddings.map((w) => ({
      url: `${baseUrl}/w/${w.slug}`,
      lastModified: w.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [...staticPages, ...weddingPages];
  } catch {
    return staticPages;
  }
}
