import { businessInfo } from "../data/businessHours";
import { getZonedDateParts, zonedPartsToDate } from "./timezone";

interface NextOpenTarget {
  day: string;
  time: string;
  daysAway: number;
}

export interface CountdownValue {
  hours: number;
  minutes: number;
  seconds: number;
}

export function getCountdown(nextOpen: NextOpenTarget, now: Date): CountdownValue {
  const nowParts = getZonedDateParts(now, businessInfo.timezone);
  const targetBase = zonedPartsToDate(
    {
      year: nowParts.year,
      month: nowParts.month,
      day: nowParts.day,
      hour: 12,
      minute: 0,
      second: 0,
    },
    businessInfo.timezone,
  );
  targetBase.setUTCDate(targetBase.getUTCDate() + nextOpen.daysAway);

  const targetDayParts = getZonedDateParts(targetBase, businessInfo.timezone);
  const [h, m] = nextOpen.time.split(":").map(Number);
  const target = zonedPartsToDate(
    {
      year: targetDayParts.year,
      month: targetDayParts.month,
      day: targetDayParts.day,
      hour: h,
      minute: m,
      second: 0,
    },
    businessInfo.timezone,
  );

  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    hours: Math.floor(diff / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}
