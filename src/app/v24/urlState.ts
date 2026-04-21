import type { OptionId } from "./data";

export function encodeSelections(selections: Record<string, OptionId[]>): string {
  const parts = Object.entries(selections)
    .filter(([, ids]) => ids.length > 0)
    .map(([categoryId, ids]) => `${categoryId}:${ids.join(",")}`)
    .join("|");

  return parts ? `?pkg=${encodeURIComponent(parts)}` : "";
}

export function decodeSelections(search: string): Record<string, OptionId[]> {
  const params = new URLSearchParams(search);
  const pkg = params.get("pkg");
  if (!pkg) {
    return {};
  }

  const result: Record<string, OptionId[]> = {};

  try {
    decodeURIComponent(pkg)
      .split("|")
      .forEach((part) => {
        const [categoryId, ids] = part.split(":");
        if (categoryId && ids) {
          result[categoryId] = ids.split(",");
        }
      });
  } catch {
    return {};
  }

  return result;
}
