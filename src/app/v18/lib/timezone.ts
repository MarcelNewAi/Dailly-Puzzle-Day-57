export interface ZonedDateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  dayIndexMon0: number;
}

function readPart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  const part = parts.find((entry) => entry.type === type)?.value;
  if (!part) {
    throw new Error(`Missing datetime part: ${type}`);
  }
  return part;
}

function toMonIndexedDay(weekdayShort: string): number {
  const map: Record<string, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  return map[weekdayShort] ?? 0;
}

export function getZonedDateParts(date: Date, timeZone: string): ZonedDateParts {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  });
  const parts = formatter.formatToParts(date);

  return {
    year: Number(readPart(parts, "year")),
    month: Number(readPart(parts, "month")),
    day: Number(readPart(parts, "day")),
    hour: Number(readPart(parts, "hour")),
    minute: Number(readPart(parts, "minute")),
    second: Number(readPart(parts, "second")),
    dayIndexMon0: toMonIndexedDay(readPart(parts, "weekday")),
  };
}

function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const parts = getZonedDateParts(date, timeZone);
  const asUTC = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return asUTC - date.getTime();
}

export function zonedPartsToDate(
  parts: Pick<ZonedDateParts, "year" | "month" | "day" | "hour" | "minute" | "second">,
  timeZone: string,
): Date {
  const utcGuess = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  let timestamp = utcGuess;

  for (let i = 0; i < 3; i += 1) {
    const offset = getTimeZoneOffsetMs(new Date(timestamp), timeZone);
    const next = utcGuess - offset;
    if (next === timestamp) {
      break;
    }
    timestamp = next;
  }

  return new Date(timestamp);
}

export function formatZonedClock(date: Date, timeZone: string): string {
  const parts = getZonedDateParts(date, timeZone);
  return [parts.hour, parts.minute, parts.second].map((value) => value.toString().padStart(2, "0")).join(":");
}

export function formatZonedDateLong(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getDateForCurrentWeekDay(
  referenceDate: Date,
  timeZone: string,
  dayIndexMon0: number,
  hour: number,
  minute: number,
): Date {
  const nowParts = getZonedDateParts(referenceDate, timeZone);
  const todayNoon = zonedPartsToDate(
    { year: nowParts.year, month: nowParts.month, day: nowParts.day, hour: 12, minute: 0, second: 0 },
    timeZone,
  );

  const targetNoon = new Date(todayNoon);
  targetNoon.setUTCDate(targetNoon.getUTCDate() - nowParts.dayIndexMon0 + dayIndexMon0);
  const targetParts = getZonedDateParts(targetNoon, timeZone);

  return zonedPartsToDate(
    { year: targetParts.year, month: targetParts.month, day: targetParts.day, hour, minute, second: 0 },
    timeZone,
  );
}
