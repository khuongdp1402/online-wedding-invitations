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
import { GripVertical } from "lucide-react";

type SortableItemProps = {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function SortableItem({ id, label, isActive, onClick }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-3 py-2 border-b last:border-b-0 cursor-pointer transition-colors ${
        isActive ? "bg-rose-50 border-l-4 border-l-rose-500" : "bg-white hover:bg-gray-50 border-l-4 border-l-transparent"
      } ${
        isDragging ? "bg-gray-100 shadow-md ring-1 ring-gray-200 rounded-md border-l-transparent" : ""
      }`}
      onClick={onClick}
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 focus:outline-none p-1"
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()} // Prevent click from triggering li onClick when dragging
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <span className={`text-sm font-medium ${isActive ? "text-rose-700" : "text-gray-700"}`}>
        {label}
      </span>
    </li>
  );
}

type Props = {
  items: string[];
  onChange: (items: string[]) => void;
  labels: Record<string, string>;
  activeSection?: string;
  onSelect?: (section: string) => void;
};

export function SortableSectionList({ items, onChange, labels, activeSection, onSelect }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="border rounded-md bg-white overflow-hidden">
          {items.map((id) => (
            <SortableItem
              key={id}
              id={id}
              label={labels[id] ?? id}
              isActive={activeSection === id}
              onClick={() => onSelect?.(id)}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
