"use client";

import { IUseDragAndDropOptions, IUseDragAndDropReturn } from "@/types";
import { useRef, useState } from "react";

export function useDragAndDrop<T>(
  options: IUseDragAndDropOptions<T>
): IUseDragAndDropReturn {
  const { items, onItemsChange } = options;

  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // ref to track the index of the item being dragged
  const dragItem = useRef<number | null>(null);

  // helper function to reorder the list
  const reorder = (list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // handlers for drag and drop events
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    dragItem.current = index;
    setDraggedIndex(index);
    setDragOverIndex(null);
    e.dataTransfer.effectAllowed = "move";
  };

  // handler for drag enter event
  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (dragItem.current !== index) {
      setDragOverIndex(index);
    }
  };

  // handler for drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // handler for drag leave event
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setDragOverIndex(null);
    }
  };

  // handler for drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    const sourceIndex = dragItem.current;
    const destinationIndex = index;

    // proceed if drop is on a different item
    if (
      sourceIndex === null ||
      destinationIndex === null ||
      sourceIndex === destinationIndex
    ) {
      dragItem.current = null;
      setDragOverIndex(null);
      setDraggedIndex(null);
      return;
    }

    // reorder the list
    const reorderedItems = reorder(items, sourceIndex, destinationIndex);

    // call the callback with the new order
    onItemsChange(reorderedItems);

    // Clear state
    dragItem.current = null;
    setDragOverIndex(null);
    setDraggedIndex(null);
  };

  // handler for drag end event
  const handleDragEnd = () => {
    dragItem.current = null;
    setDragOverIndex(null);
    setDraggedIndex(null);
  };

  return {
    dragOverIndex,
    draggedIndex,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
}
