import { prisma } from "@/lib/prisma";
import { Guest, RSVPStatus, Side } from "@prisma/client";

/**
 * GuestService - Xử lý logic nghiệp vụ cho Khách mời và RSVP.
 */
export class GuestService {
  /**
   * Lấy danh sách khách theo Wedding ID.
   */
  async getByWeddingId(weddingId: string) {
    return prisma.guest.findMany({
      where: { weddingId },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Tạo khách mời mới.
   */
  async create(data: {
    weddingId: string;
    name: string;
    salutation?: string;
    phone?: string;
    email?: string;
    side: Side;
    group?: string;
  }) {
    return prisma.guest.create({
      data: {
        ...data,
        rsvpStatus: RSVPStatus.PENDING,
      },
    });
  }

  /**
   * Cập nhật thông tin khách mời.
   */
  async update(id: string, data: Partial<Guest>) {
    return prisma.guest.update({
      where: { id },
      data,
    });
  }

  /**
   * Xử lý RSVP từ khách.
   */
  async submitRSVP(id: string, rsvpStatus: RSVPStatus, numberOfGuests: number) {
    return prisma.guest.update({
      where: { id },
      data: {
        rsvpStatus,
        numberOfGuests,
        rsvpAt: new Date(),
      },
    });
  }

  /**
   * Tìm khách theo UID/InviteLink (cho trang thiệp cá nhân).
   */
  async getByInviteLink(inviteLink: string) {
    return prisma.guest.findUnique({
      where: { inviteLink },
    });
  }
}

// Singleton instance
export const guestService = new GuestService();
