import { formatZonedClock, formatZonedDateLong } from "../lib/timezone";

interface HoursHeaderProps {
  businessName: string;
  now: Date;
  timezone: string;
}

export default function HoursHeader({ businessName, now, timezone }: HoursHeaderProps) {
  return (
    <header className="v18-header">
      <div className="v18-header-inner">
        <p className="v18-label">V18 • BUSINESS HOURS CHECKER</p>
        <h1>{businessName}</h1>
        <p className="v18-header-subtitle">Design studio based in Ljubljana, serving clients across Europe</p>

        <div className="v18-clock-shell" aria-live="polite" aria-label="Current local time in Europe/Ljubljana">
          <p className="v18-clock">{formatZonedClock(now, timezone)}</p>
          <span className="v18-timezone-badge">{timezone}</span>
        </div>

        <p className="v18-date-label">{formatZonedDateLong(now, timezone)}</p>
      </div>
    </header>
  );
}
