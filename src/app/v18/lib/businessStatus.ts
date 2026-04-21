import { businessHours, businessInfo, type DaySchedule } from "../data/businessHours";
import { getZonedDateParts } from "./timezone";

export type BusinessStatus =
  | { state: "open-regular"; closesAt: string; minutesUntilClose: number }
  | { state: "open-emergency"; closesAt: string; minutesUntilClose: number }
  | { state: "closed"; nextOpen: { day: string; time: string; daysAway: number; type: "regular" | "emergency" } };

interface OpeningWindow {
  type: "regular" | "emergency";
  time: string;
  openMinutes: number;
}

function parseTime(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function getWindows(day: DaySchedule): OpeningWindow[] {
  const windows: OpeningWindow[] = [];
  if (day.regular) {
    windows.push({ type: "regular", time: day.regular.open, openMinutes: parseTime(day.regular.open) });
  }
  if (day.emergency) {
    windows.push({ type: "emergency", time: day.emergency.open, openMinutes: parseTime(day.emergency.open) });
  }
  return windows.sort((a, b) => a.openMinutes - b.openMinutes);
}

function toRelativeDayLabel(offset: number, absoluteDayName: string): string {
  if (offset === 0) {
    return "Today";
  }
  if (offset === 1) {
    return "Tomorrow";
  }
  return absoluteDayName;
}

export function getBusinessStatus(now: Date = new Date()): BusinessStatus {
  const zoned = getZonedDateParts(now, businessInfo.timezone);
  const dayOfWeek = zoned.dayIndexMon0;
  const currentMinutes = zoned.hour * 60 + zoned.minute;
  const today = businessHours[dayOfWeek];

  if (today.regular) {
    const openMin = parseTime(today.regular.open);
    const closeMin = parseTime(today.regular.close);
    if (currentMinutes >= openMin && currentMinutes < closeMin) {
      return {
        state: "open-regular",
        closesAt: today.regular.close,
        minutesUntilClose: closeMin - currentMinutes,
      };
    }
  }

  if (today.emergency) {
    const openMin = parseTime(today.emergency.open);
    const closeMin = parseTime(today.emergency.close);
    if (currentMinutes >= openMin && currentMinutes < closeMin) {
      return {
        state: "open-emergency",
        closesAt: today.emergency.close,
        minutesUntilClose: closeMin - currentMinutes,
      };
    }
  }

  for (let offset = 0; offset < 8; offset += 1) {
    const dayIndex = (dayOfWeek + offset) % 7;
    const daySchedule = businessHours[dayIndex];
    const windows = getWindows(daySchedule);

    for (const window of windows) {
      if (offset === 0 && currentMinutes >= window.openMinutes) {
        continue;
      }
      return {
        state: "closed",
        nextOpen: {
          day: toRelativeDayLabel(offset, daySchedule.day),
          time: window.time,
          daysAway: offset,
          type: window.type,
        },
      };
    }
  }

  return {
    state: "closed",
    nextOpen: { day: "Monday", time: "08:00", daysAway: 7, type: "regular" },
  };
}
