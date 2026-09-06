// Giới hạn upload dùng chung giữa client (pre-validation UI) và server
// (app/api/weddings/[id]/upload/presign/route.ts). Đây là NGUỒN DUY NHẤT
// cho các giới hạn này — không định nghĩa lại ở nơi khác để tránh lệch nhau.

export type UploadFileType = "image" | "audio";

export const ALLOWED_MIME_TYPES: Record<UploadFileType, string[]> = {
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  audio: ["audio/mpeg"],
};

export const MAX_FILE_SIZE_BYTES: Record<UploadFileType, number> = {
  image: 10 * 1024 * 1024, // 10MB
  audio: 20 * 1024 * 1024, // 20MB
};

export const MAX_FILES_PER_WEDDING = 50;

const FILE_TYPE_LABEL: Record<UploadFileType, string> = {
  image: "Ảnh",
  audio: "File nhạc",
};

const ALLOWED_MIME_LABEL: Record<UploadFileType, string> = {
  image: "JPG, PNG, WEBP, GIF",
  audio: "MP3",
};

export type UploadValidationResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Kiểm tra file trước khi upload (client-side), dùng CHÍNH XÁC cùng giới hạn
 * với server (`ALLOWED_MIME_TYPES` / `MAX_FILE_SIZE_BYTES`) để tránh việc
 * người dùng chờ hết vòng round-trip API mới biết file bị từ chối.
 */
export function validateUploadFile(
  file: File,
  fileType: UploadFileType
): UploadValidationResult {
  const allowedMime = ALLOWED_MIME_TYPES[fileType];
  const maxSize = MAX_FILE_SIZE_BYTES[fileType];
  const label = FILE_TYPE_LABEL[fileType];

  if (!allowedMime.includes(file.type)) {
    return {
      ok: false,
      message: `Định dạng ${label.toLowerCase()} không được hỗ trợ (chỉ nhận ${ALLOWED_MIME_LABEL[fileType]})`,
    };
  }

  if (file.size > maxSize) {
    return {
      ok: false,
      message: `${label} quá lớn (tối đa ${maxSize / 1024 / 1024}MB)`,
    };
  }

  return { ok: true };
}
