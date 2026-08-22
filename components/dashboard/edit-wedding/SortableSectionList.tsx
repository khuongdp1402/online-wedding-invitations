"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import type { SectionConfig } from "@/lib/section-config";
import { getSectionDef } from "@/lib/section-registry";

type SortableItemProps = {
  item: SectionConfig;
  isActive: boolean;
  onClick: () => void;
  onToggle: () => void;
};

function SortableItem({
  item,
  isActive,
  onClick,
  onToggle,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.key });
  const def = getSectionDef(item.key);
  const required = def.required === true;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const dimmed = !item.visible;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 px-3 py-2 border-b last:border-b-0 cursor-pointer transition-colors ${
        isActive
          ? "bg-rose-50 border-l-4 border-l-rose-500"
          : "bg-white hover:bg-gray-50 border-l-4 border-l-transparent"
      } ${
        isDragging
          ? "bg-gray-100 shadow-md ring-1 ring-gray-200 rounded-md border-l-transparent"
          : ""
      }`}
      onClick={onClick}
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 focus:outline-none p-1 shrink-0"
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()} // Prevent click from triggering li onClick when dragging
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <div className={`min-w-0 flex-1 ${dimmed ? "opacity-50" : ""}`}>
        <div className="flex items-center gap-1.5">
          <span
            className={`text-sm font-medium truncate ${
              isActive ? "text-rose-700" : "text-gray-700"
            }`}
          >
            {def.label}
          </span>
        </div>
        {def.description && (
          <div className="text-[11px] text-gray-400 truncate mt-0.5">
            {def.description}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        disabled={required}
        title={
          required
            ? "Khối bắt buộc, không thể ẩn"
            : item.visible
              ? "Ẩn khối này"
              : "Hiện khối này"
        }
        className={`p-1.5 rounded shrink-0 transition-colors ${
          required
            ? "text-gray-300 cursor-not-allowed"
            : item.visible
              ? "text-rose-600 hover:bg-rose-50"
              : "text-gray-400 hover:bg-gray-100"
        }`}
      >
        {item.visible ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </button>
    </li>
  );
}

type Props = {
  items: SectionConfig[];
  onChange: (items: SectionConfig[]) => void;
  activeSection?: string;
  onSelect?: (section: string) => void;
  /** Khối có ở mẫu khác nhưng mẫu hiện tại chưa hỗ trợ. */
  unsupported?: string[];
};

/**
 * Mọi khối của template đều bật/tắt/kéo-thả được tự do — không còn khoá theo
 * gói. Giá xuất bản là giá cố định của template, không phụ thuộc section nào
 * đang bật.
 */
export function SortableSectionList({
  items,
  onChange,
  activeSection,
  onSelect,
  unsupported = [],
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.key === active.id);
      const newIndex = items.findIndex((i) => i.key === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        onChange(arrayMove(items, oldIndex, newIndex));
      }
    }
  }

  function toggle(key: string) {
    onChange(
      items.map((item) =>
        item.key === key ? { ...item, visible: !item.visible } : item
      )
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="border rounded-md bg-white overflow-hidden">
            {items.map((item) => (
              <SortableItem
                key={item.key}
                item={item}
                isActive={activeSection === item.key}
                onClick={() => onSelect?.(item.key)}
                onToggle={() => toggle(item.key)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {unsupported.length > 0 && (
        <div className="mt-4">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Chưa hỗ trợ ở mẫu này
          </div>
          <ul className="border border-dashed rounded-md bg-gray-50/60 overflow-hidden">
            {unsupported.map((key) => {
              const def = getSectionDef(key);
              return (
                <li
                  key={key}
                  className="flex items-center gap-2 px-3 py-2 border-b last:border-b-0 opacity-60"
                >
                  <span className="text-sm text-gray-500 truncate flex-1">
                    {def.label}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="text-[11px] text-gray-400 mt-2 px-1">
            Đổi sang mẫu khác để dùng các khối này, hoặc liên hệ chúng tôi để
            thiết kế riêng.
          </p>
        </div>
      )}
    </>
  );
}
