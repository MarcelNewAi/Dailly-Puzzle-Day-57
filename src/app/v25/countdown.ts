const STORAGE_KEY = "v25_quanta_launch";
const OFFER_DURATION_MS = 48 * 60 * 60 * 1000;
const TOTAL_SPOTS = 5;

export interface OfferState {
  startedAt: number;
  spotsRemaining: number;
}

export function initOfferState(): OfferState {
  if (typeof window === "undefined") {
    return { startedAt: Date.now(), spotsRemaining: TOTAL_SPOTS };
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as OfferState;
      if (parsed.startedAt && typeof parsed.spotsRemaining === "number") {
        return parsed;
      }
    } catch {
      // Fall through and create fresh state.
    }
  }

  const fresh: OfferState = { startedAt: Date.now(), spotsRemaining: TOTAL_SPOTS };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

export function saveOfferState(state: OfferState): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function getTimeRemaining(startedAt: number): {
  total: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
} {
  const elapsed = Date.now() - startedAt;
  const total = Math.max(0, OFFER_DURATION_MS - elapsed);
  const expired = total === 0;
  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);
  return { total, hours, minutes, seconds, expired };
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export { TOTAL_SPOTS, OFFER_DURATION_MS };
