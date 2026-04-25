const STORAGE_KEY = "v27_keystone_apikey";

export interface ApiKey {
  id: string;
  full: string;
  createdAt: number;
  environment: "live" | "test";
  lastUsed: number | null;
  usageCount: number;
}

const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789";

function randomString(length: number): string {
  return Array.from({ length }, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join("");
}

export function generateKey(environment: "live" | "test"): ApiKey {
  const shortId = randomString(6);
  const body = randomString(32);
  const prefix = environment === "live" ? "ks_live" : "ks_test";

  return {
    id: `key_${shortId}`,
    full: `${prefix}_${body}`,
    createdAt: Date.now(),
    environment,
    lastUsed: null,
    usageCount: 0,
  };
}

export function maskKey(full: string): string {
  const prefix = full.split("_").slice(0, 2).join("_");
  const visible = full.slice(-4);
  const masked = "•".repeat(24);
  return `${prefix}_${masked}${visible}`;
}

export function formatKeyDisplay(full: string): string {
  return full;
}

export function saveKey(key: ApiKey): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(key));
}

export function loadKey(): ApiKey | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as ApiKey;
  } catch {
    return null;
  }
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (mins < 1) {
    return "Just now";
  }

  if (mins < 60) {
    return `${mins}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  return `${days}d ago`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

