// lib/helpers/shared.ts

// Format due date to "Due Mon DD, YYYY"
export function formatedDateString(dateStr: string | null) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `Due ${formatted}`;
}
