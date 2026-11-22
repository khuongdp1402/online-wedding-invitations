/**
 * Danh sách các quyền hạn chi tiết trong hệ thống quản trị Winglove.
 */
export const PERMISSIONS = {
  VIEW_DASHBOARD: {
    key: "VIEW_DASHBOARD",
    label: "Xem Dashboard Tổng quan",
    description: "Xem báo cáo số liệu KPI, biểu đồ doanh thu và thống kê",
  },
  MANAGE_PAYMENTS: {
    key: "MANAGE_PAYMENTS",
    label: "Quản lý Giao dịch & Thanh toán",
    description: "Xác nhận hoặc từ chối chuyển khoản ngân hàng, xem lịch sử",
  },
  MANAGE_TEMPLATES: {
    key: "MANAGE_TEMPLATES",
    label: "Quản lý Mẫu thiệp & Giá bán",
    description: "Cập nhật giá bán, chương trình khuyến mãi và đồng bộ kho mẫu",
  },
  MANAGE_COUPONS: {
    key: "MANAGE_COUPONS",
    label: "Quản lý Mã giảm giá (Coupons)",
    description: "Tạo, chỉnh sửa, bật/tắt mã giảm giá khi thanh toán",
  },
  MANAGE_CONTACTS: {
    key: "MANAGE_CONTACTS",
    label: "Tư vấn & Chăm sóc khách hàng",
    description: "Tiếp nhận và cập nhật trạng thái các yêu cầu tư vấn",
  },
  MANAGE_USERS: {
    key: "MANAGE_USERS",
    label: "Quản lý Tài khoản & Phân quyền",
    description: "Xem danh sách người dùng, thăng cấp nhân viên và cấp quyền",
  },
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;

export const ALL_PERMISSIONS: PermissionKey[] = Object.keys(PERMISSIONS) as PermissionKey[];

export interface UserPermissionContext {
  role?: string | null;
  permissions?: string[] | null;
}

/**
 * Kiểm tra xem user có quyền thực hiện hành động hay không.
 * - ADMIN: Toàn quyền (luôn trả về true).
 * - STAFF: Kiểm tra trong mảng permissions của user.
 * - USER: Không có quyền admin.
 */
export function hasPermission(
  user: UserPermissionContext | null | undefined,
  permission: PermissionKey
): boolean {
  if (!user || !user.role) return false;
  if (user.role === "ADMIN") return true;
  if (user.role === "STAFF") {
    return Array.isArray(user.permissions) && user.permissions.includes(permission);
  }
  return false;
}

/**
 * Kiểm tra xem user có được truy cập vào khu vực Admin hay không (ADMIN hoặc STAFF).
 */
export function canAccessAdmin(user: UserPermissionContext | null | undefined): boolean {
  if (!user || !user.role) return false;
  return user.role === "ADMIN" || user.role === "STAFF";
}
