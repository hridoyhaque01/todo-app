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

// custom debounce function
export function debounce<Func extends (...args: any[]) => void>(
  func: Func,
  delay: number
): (...args: Parameters<Func>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null;
  return (...args: Parameters<Func>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// Generate query string from selectors object
export const getQuery = (selectors: any) => {
  if (!selectors || Object.keys(selectors).length === 0) return "";

  const params = new URLSearchParams();

  Object.entries(selectors).forEach(([key, value]) => {
    if (selectors[key] || typeof selectors[key] === "boolean") {
      params.append(key, String(value));
    }
  });

  return params.toString();
};

// Format date to "YYYY-MM-DD"
export function formatLocalDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
