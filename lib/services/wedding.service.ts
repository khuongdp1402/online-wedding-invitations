import { prisma } from "@/lib/prisma";
import { WeddingStatus, Plan, Prisma } from "@prisma/client";

/**
 * WeddingService - Xử lý logic nghiệp vụ cho Thiệp cưới.
 */
export class WeddingService {
  /**
   * Lấy thông tin thiệp theo ID.
   */
  async getById(id: string) {
    return prisma.wedding.findUnique({
      where: { id },
      include: {
        template: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Lấy thông tin thiệp theo Slug (cho trang public).
   */
  async getBySlug(slug: string) {
    return prisma.wedding.findUnique({
      where: { slug },
      include: {
        template: true,
      },
    });
  }

  /**
   * Danh sách thiệp của một User.
   */
  async getByUserId(userId: string) {
    return prisma.wedding.findMany({
      where: { userId },
      include: {
        template: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  /**
   * Tạo thiệp mới.
   */
  async create(data: {
    userId: string;
    templateId: string;
    slug: string;
    groomName: string;
    brideName: string;
    groomParents: Prisma.InputJsonValue;
    brideParents: Prisma.InputJsonValue;
    groomCeremony: Prisma.InputJsonValue;
    brideCeremony: Prisma.InputJsonValue;
    gallery: Prisma.InputJsonValue;
    gifting?: Prisma.InputJsonValue;
  }) {
    return prisma.wedding.create({
      data: {
        ...data,
        status: WeddingStatus.DRAFT,
        plan: Plan.FREE,
      },
    });
  }

  /**
   * Cập nhật thông tin thiệp.
   */
  async update(id: string, data: Prisma.WeddingUpdateInput) {
    return prisma.wedding.update({
      where: { id },
      data,
    });
  }

  /**
   * Kiểm tra tính duy nhất của slug.
   */
  async isSlugAvailable(slug: string): Promise<boolean> {
    const existing = await prisma.wedding.findUnique({
      where: { slug },
      select: { id: true },
    });
    return !existing;
  }
}

// Singleton instance
export const weddingService = new WeddingService();
