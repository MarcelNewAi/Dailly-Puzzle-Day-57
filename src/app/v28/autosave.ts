const STORAGE_KEY = "v28_compose_draft";

export interface Draft {
  title: string;
  body: string;
  tags: string[];
  savedAt: number;
  wordCount: number;
  version: number;
}

export const EMPTY_DRAFT: Draft = {
  title: "",
  body: "",
  tags: [],
  savedAt: 0,
  wordCount: 0,
  version: 0,
};

export function saveDraft(draft: Draft): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...draft,
      savedAt: Date.now(),
      version: draft.version + 1,
    }),
  );
}

export function loadDraft(): Draft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Draft;
    if (
      typeof parsed.title !== "string" ||
      typeof parsed.body !== "string" ||
      !Array.isArray(parsed.tags) ||
      typeof parsed.savedAt !== "number" ||
      typeof parsed.wordCount !== "number" ||
      typeof parsed.version !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function formatSavedTime(timestamp: number): string {
  if (!timestamp) return "";
  const diff = Date.now() - timestamp;
  if (diff < 5000) return "just now";
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  return new Date(timestamp).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

