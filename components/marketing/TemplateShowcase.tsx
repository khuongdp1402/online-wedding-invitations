"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Heart,
  Loader2,
  Sparkles,
  ExternalLink,
  Search,
  Flame,
  Tag,
  Palette,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { resolveTemplatePrice } from "@/lib/template-pricing";
import { TemplatePreviewModal } from "@/components/marketing/TemplatePreviewModal";

export type TemplatePreview = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  salePrice: number | null;
  saleStartsAt: string | null;
  saleEndsAt: string | null;
  tags?: string[];
  colors?: string[];
  badges?: string[];
  occasion?: "wedding" | "birthday" | "graduation" | "event";
  trendingScore?: number;
  isHot?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  releasedAt?: string;
};

const OCCASION_TABS: Array<{ key: string; label: string }> = [
  { key: "all", label: "Tất cả dịp" },
  { key: "wedding", label: "💍 Thiệp Cưới" },
  { key: "birthday", label: "🎂 Sinh Nhật & Thôi Nôi" },
  { key: "graduation", label: "🎓 Tốt Nghiệp" },
  { key: "event", label: "🎉 Sự Kiện & Tân Gia" },
];

const CATEGORY_LABELS: Record<string, string> = {
  all: "Tất Cả Chủ Đề",
  classic: "Cổ Điển & Truyền Thống",
  modern: "Hiện Đại & Có Ảnh",
  minimal: "Tối Giản",
  luxury: "Sang Trọng & Hoàng Gia",
  vintage: "Vintage & Boho",
};

const STATUS_FILTERS: Array<{
  key: "all" | "hot" | "new" | "featured";
  label: string;
}> = [
  { key: "all", label: "Tất cả" },
  { key: "hot", label: "🔥 Hot / Thịnh hành" },
  { key: "new", label: "✨ Mẫu Mới" },
  { key: "featured", label: "⭐ Mẫu Gốc Banner" },
];

const COLOR_SWATCHES: Array<{ name: string; hex: string; border?: string }> = [
  { name: "Đỏ", hex: "#9b1c1c" },
  { name: "Vàng", hex: "#d4af37" },
  { name: "Xanh lá", hex: "#2d6a4f" },
  { name: "Xanh dương", hex: "#1e40af" },
  { name: "Hồng", hex: "#db2777" },
  { name: "Trắng", hex: "#f8fafc", border: "#cbd5e1" },
  { name: "Nâu", hex: "#78350f" },
  { name: "Tím", hex: "#6b21a8" },
];

function buildPageNumbers(current: number, total: number): Array<number | "..."> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: Array<number | "..."> = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export function TemplateShowcase() {
  useSession();
  const ctaBaseHref = "/dashboard/weddings/new";

  const topRef = useRef<HTMLDivElement | null>(null);

  const [templates, setTemplates] = useState<TemplatePreview[] | null>(null);
  const [previewTemplate, setPreviewTemplate] =
    useState<TemplatePreview | null>(null);

  const [selectedOccasion, setSelectedOccasion] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "hot" | "new" | "featured"
  >("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [showAllTags, setShowAllTags] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(16);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/templates")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled) setTemplates(data.templates ?? []);
      })
      .catch(() => {
        if (!cancelled) setTemplates([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedOccasion,
    selectedCategory,
    statusFilter,
    selectedColor,
    selectedTag,
    searchQuery,
    pageSize,
  ]);

  // Compute available tags & counts based on current occasion/category
  const availableTags = useMemo(() => {
    if (!templates) return [];
    const counts = new Map<string, number>();
    for (const t of templates) {
      if (selectedOccasion !== "all" && (t.occasion || "wedding") !== selectedOccasion) {
        continue;
      }
      if (selectedCategory !== "all" && t.category !== selectedCategory) {
        continue;
      }
      for (const tag of t.tags ?? []) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [templates, selectedOccasion, selectedCategory]);

  const filteredTemplates = useMemo(() => {
    if (!templates) return [];
    const q = searchQuery.trim().toLowerCase();

    const list = templates.filter((t) => {
      if (
        selectedOccasion !== "all" &&
        (t.occasion || "wedding") !== selectedOccasion
      ) {
        return false;
      }
      if (selectedCategory !== "all" && t.category !== selectedCategory) {
        return false;
      }
      if (statusFilter === "hot" && !t.isHot) {
        return false;
      }
      if (statusFilter === "new" && !t.isNew) {
        return false;
      }
      if (statusFilter === "featured" && !t.isFeatured) {
        return false;
      }
      if (
        selectedColor !== "all" &&
        !(t.colors ?? []).includes(selectedColor)
      ) {
        return false;
      }
      if (selectedTag !== "all" && !(t.tags ?? []).includes(selectedTag)) {
        return false;
      }
      if (!q) return true;
      const inTags = (t.tags ?? []).some((tag) =>
        tag.toLowerCase().includes(q)
      );
      const inColors = (t.colors ?? []).some((c) =>
        c.toLowerCase().includes(q)
      );
      return (
        t.name.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        inTags ||
        inColors
      );
    });

    if (statusFilter === "hot") {
      return [...list].sort(
        (a, b) => (b.trendingScore ?? 0) - (a.trendingScore ?? 0)
      );
    }
    if (statusFilter === "new") {
      return [...list].sort((a, b) =>
        (b.releasedAt ?? "").localeCompare(a.releasedAt ?? "")
      );
    }
    return list;
  }, [
    templates,
    selectedOccasion,
    selectedCategory,
    statusFilter,
    selectedColor,
    selectedTag,
    searchQuery,
  ]);

  const hasActiveFilters =
    selectedOccasion !== "all" ||
    selectedCategory !== "all" ||
    statusFilter !== "all" ||
    selectedColor !== "all" ||
    selectedTag !== "all" ||
    searchQuery.trim() !== "";

  function resetAllFilters() {
    setSelectedOccasion("all");
    setSelectedCategory("all");
    setStatusFilter("all");
    setSelectedColor("all");
    setSelectedTag("all");
    setSearchQuery("");
    setCurrentPage(1);
  }

  function handlePageChange(nextPage: number) {
    setCurrentPage(nextPage);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (!templates) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-gray-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Đang tải kho mẫu thiệp...</span>
      </div>
    );
  }

  const totalItems = filteredTemplates.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const displayedTemplates = filteredTemplates.slice(
    startIndex,
    startIndex + pageSize
  );
  const pageNumbers = buildPageNumbers(safePage, totalPages);
  const visibleTagPills = showAllTags
    ? availableTags.slice(0, 32)
    : availableTags.slice(0, 12);

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Filter Panel */}
      <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-6 shadow-xs space-y-5">
        {/* Row 1: Occasion Tabs + Search + Hot/New Status */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Occasion Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {OCCASION_TABS.map((occ) => {
              const count =
                occ.key === "all"
                  ? templates.length
                  : templates.filter((t) => (t.occasion || "wedding") === occ.key)
                      .length;
              const active = selectedOccasion === occ.key;
              return (
                <button
                  key={occ.key}
                  type="button"
                  onClick={() => setSelectedOccasion(occ.key)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {occ.label}{" "}
                  <span className="opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, mã, tag (VD: Song Hỷ, Cổ phục, Đỏ...)"
              className="w-full rounded-full border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-800 outline-none transition-colors focus:border-winglove-red"
            />
          </div>
        </div>

        {/* Row 2: Style Categories (Chủ đề thiết kế) & Status Filter (Hot / Mới) */}
        <div className="flex flex-col gap-3 border-t border-gray-200/80 pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mr-1">
              Chủ đề:
            </span>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
              const count =
                key === "all"
                  ? templates.filter(
                      (t) =>
                        selectedOccasion === "all" ||
                        (t.occasion || "wedding") === selectedOccasion
                    ).length
                  : templates.filter(
                      (t) =>
                        (selectedOccasion === "all" ||
                          (t.occasion || "wedding") === selectedOccasion) &&
                        t.category === key
                    ).length;
              const active = selectedCategory === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedCategory(key)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "border-winglove-red bg-winglove-red text-white shadow-xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-winglove-red/50"
                  }`}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>

          {/* Hot / Mới / Mẫu Gốc */}
          <div className="flex flex-wrap items-center gap-1.5">
            {STATUS_FILTERS.map((sf) => {
              const active = statusFilter === sf.key;
              return (
                <button
                  key={sf.key}
                  type="button"
                  onClick={() => setStatusFilter(sf.key)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-amber-400"
                  }`}
                >
                  {sf.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Color Swatches & Tag Pills */}
        <div className="flex flex-col gap-3 border-t border-gray-200/80 pt-4">
          {/* Colors */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500 mr-1">
              <Palette className="h-3.5 w-3.5" /> Màu sắc:
            </span>
            <button
              type="button"
              onClick={() => setSelectedColor("all")}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                selectedColor === "all"
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              Tất cả
            </button>
            {COLOR_SWATCHES.map((c) => {
              const active = selectedColor === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() =>
                    setSelectedColor(active ? "all" : c.name)
                  }
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
                    active
                      ? "border-stone-900 bg-stone-900 text-white shadow-xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{
                      backgroundColor: c.hex,
                      border: c.border ? `1px solid ${c.border}` : undefined,
                    }}
                  />
                  {c.name}
                </button>
              );
            })}
          </div>

          {/* Tags */}
          {availableTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gray-500 mr-1">
                <Tag className="h-3.5 w-3.5" /> Tag:
              </span>
              <button
                type="button"
                onClick={() => setSelectedTag("all")}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
                  selectedTag === "all"
                    ? "border-winglove-red bg-winglove-red text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                Tất cả tag
              </button>
              {visibleTagPills.map(({ tag, count }) => {
                const active = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(active ? "all" : tag)}
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
                      active
                        ? "border-winglove-red bg-winglove-red text-white shadow-xs"
                        : "border-gray-200 bg-white text-gray-700 hover:border-winglove-red/40"
                    }`}
                  >
                    #{tag} <span className="opacity-70">({count})</span>
                  </button>
                );
              })}
              {availableTags.length > 12 && (
                <button
                  type="button"
                  onClick={() => setShowAllTags((prev) => !prev)}
                  className="rounded-full px-2.5 py-1 text-xs font-semibold text-winglove-red hover:underline"
                >
                  {showAllTags
                    ? "Thu gọn tag"
                    : `+${availableTags.length - 12} tag khác`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Summary & Reset Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200/80 pt-3 text-xs text-gray-600">
          <div>
            Hiển thị{" "}
            <strong className="text-gray-900">
              {totalItems === 0 ? 0 : startIndex + 1}–
              {Math.min(startIndex + pageSize, totalItems)}
            </strong>{" "}
            trong tổng số{" "}
            <strong className="text-gray-900">{totalItems}</strong> mẫu thiệp
            phù hợp
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 font-semibold text-winglove-red hover:underline"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Xóa bộ lọc
              </button>
            )}
            <div className="flex items-center gap-1.5">
              <span>Hiển thị:</span>
              {[12, 16, 24, 48].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setPageSize(sz)}
                  className={`rounded px-2 py-0.5 font-semibold transition-colors ${
                    pageSize === sz
                      ? "bg-stone-900 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {displayedTemplates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <p className="text-base font-medium text-gray-700 mb-2">
            Không tìm thấy mẫu thiệp nào khớp với bộ lọc hiện tại
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Hãy thử chọn chủ đề khác hoặc xóa bớt các tag đang lọc.
          </p>
          <Button
            variant="outline"
            onClick={resetAllFilters}
            className="rounded-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Xem lại toàn bộ {templates.length} mẫu thiệp
          </Button>
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {displayedTemplates.map((template, index) => {
            const priceInfo = resolveTemplatePrice({
              price: template.price,
              salePrice: template.salePrice,
              saleStartsAt: template.saleStartsAt
                ? new Date(template.saleStartsAt)
                : null,
              saleEndsAt: template.saleEndsAt
                ? new Date(template.saleEndsAt)
                : null,
            });

            const createHref = `/dashboard/weddings/new?template=${template.slug}`;

            const isBannerBuiltIn =
              template.slug === "classic-elegance" ||
              template.slug === "modern-cinematic";

            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(index * 0.025, 0.2),
                }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  {template.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl text-winglove-gold/60">
                      ♥
                    </div>
                  )}

                  {/* Top-left Badges (Mẫu Gốc / Hot / Mới) */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    {isBannerBuiltIn && (
                      <Badge className="gap-1 bg-amber-600 text-white shadow-md hover:bg-amber-600">
                        <Star className="h-3 w-3 fill-current" /> Mẫu Gốc
                      </Badge>
                    )}
                    {template.isHot && !isBannerBuiltIn && (
                      <Badge className="gap-1 bg-rose-600 text-white shadow-md hover:bg-rose-600">
                        <Flame className="h-3 w-3 fill-current" /> Hot
                      </Badge>
                    )}
                    {template.isNew && (
                      <Badge className="bg-emerald-600 text-white shadow-md hover:bg-emerald-600">
                        Mới
                      </Badge>
                    )}
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/60 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full max-w-[160px] bg-white/95 text-xs text-gray-900 shadow-md hover:bg-white"
                      onClick={() => setPreviewTemplate(template)}
                    >
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      Xem Nhanh
                    </Button>
                    <Link
                      href={`/templates/preview/${template.slug}`}
                      target="_blank"
                      className="w-full max-w-[160px]"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-stone-700 bg-stone-900/80 text-xs text-white shadow-md hover:bg-stone-900"
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Mở Tab Mới
                      </Button>
                    </Link>
                    <Link href={createHref} className="w-full max-w-[160px]">
                      <Button
                        size="sm"
                        className="w-full bg-winglove-red text-xs text-white shadow-md hover:bg-winglove-red-deep"
                      >
                        <Heart className="mr-1.5 h-3.5 w-3.5 fill-current" />
                        Dùng Mẫu Này
                      </Button>
                    </Link>
                  </div>

                  {priceInfo.isOnSale && (
                    <Badge className="absolute right-3 top-3 gap-1 bg-winglove-red text-white shadow-md hover:bg-winglove-red">
                      <Sparkles className="h-3 w-3" /> Khuyến mãi
                    </Badge>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <h3 className="truncate text-base font-semibold text-gray-900">
                        {template.name}
                      </h3>
                      <Badge variant="outline" className="shrink-0 text-[11px]">
                        {CATEGORY_LABELS[template.category]
                          ?.split("&")[0]
                          .trim() ?? template.category}
                      </Badge>
                    </div>
                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                      {template.description}
                    </p>

                    {/* Tags row on card */}
                    {template.tags && template.tags.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() =>
                              setSelectedTag(selectedTag === tag ? "all" : tag)
                            }
                            className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                              selectedTag === tag
                                ? "bg-winglove-red text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-gray-900">
                        {priceInfo.effectivePrice.toLocaleString("vi-VN")}đ
                      </span>
                      {priceInfo.isOnSale && (
                        <span className="text-xs text-gray-400 line-through">
                          {template.price.toLocaleString("vi-VN")}đ
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/templates/preview/${template.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded p-1 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-stone-900"
                        title="Mở tab mới toàn màn hình"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(template)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-winglove-red hover:text-winglove-red-deep"
                      >
                        <Eye className="h-3.5 w-3.5" /> Xem trước
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Numbered Pagination Bar */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
          <div className="text-sm text-gray-500">
            Trang <strong className="text-gray-900">{safePage}</strong> /{" "}
            <strong className="text-gray-900">{totalPages}</strong> ({totalItems}{" "}
            mẫu thiệp)
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={safePage <= 1}
              onClick={() => handlePageChange(safePage - 1)}
              className="rounded-lg px-3"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Trước
            </Button>

            {pageNumbers.map((item, idx) =>
              item === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-sm text-gray-400 select-none"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePageChange(item)}
                  className={`h-9 min-w-[36px] rounded-lg border px-2.5 text-sm font-semibold transition-all ${
                    safePage === item
                      ? "border-winglove-red bg-winglove-red text-white shadow-xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-winglove-red/50 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <Button
              variant="outline"
              size="sm"
              disabled={safePage >= totalPages}
              onClick={() => handlePageChange(safePage + 1)}
              className="rounded-lg px-3"
            >
              Sau
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-500">
          Đã sẵn sàng trọn bộ {templates.length} mẫu thiệp (2 mẫu gốc + 123 mẫu
          từ thieponline.app)
        </p>
        <Link href={ctaBaseHref}>
          <Button
            size="lg"
            className="rounded-full bg-winglove-red px-8 shadow-lg shadow-winglove-gold-soft hover:bg-winglove-red-deep"
          >
            <Heart className="mr-2 h-5 w-5" />
            Bắt Đầu Tạo Thiệp Cưới
          </Button>
        </Link>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          templateSlug={previewTemplate.slug}
          templateName={previewTemplate.name}
          category={
            CATEGORY_LABELS[previewTemplate.category] ?? previewTemplate.category
          }
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}
