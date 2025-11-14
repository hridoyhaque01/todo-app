import { RefObject, useEffect } from "react";

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      // If no element or the event happened inside the element, do nothing
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    // pointerdown covers mouse/touch/pen on modern browsers
    document.addEventListener("pointerdown", listener);
    // touchstart as a fallback for some environments
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("pointerdown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);

  // Optional: close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler(e);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handler]);
}
