/**
 * Danh sach thu muc asset template (tuong doi voi public/) duoc dua len MinIO.
 * Nguon duy nhat: lib/asset-dirs.json (middleware.ts cung doc file nay qua
 * lib/asset-base-url.ts), nen chi can sua o mot cho.
 */
const ASSET_DIRS = Object.freeze(require("../lib/asset-dirs.json").slice());

module.exports = { ASSET_DIRS };
