import type { DaySchedule } from "../data/businessHours";
import type { BusinessStatus } from "../lib/businessStatus";

interface HoursScheduleProps {
  schedule: DaySchedule[];
  currentDayIndex: number;
  status: BusinessStatus;
}

function formatRange(range: DaySchedule["regular"] | DaySchedule["emergency"], fallback: string): string {
  if (!range) {
    return fallback;
  }
  return `${range.open} - ${range.close}`;
}

function getIndicatorState(rowIndex: number, currentDayIndex: number, status: BusinessStatus): "regular" | "emergency" | "closed" {
  if (rowIndex !== currentDayIndex) {
    return "closed";
  }
  if (status.state === "open-regular") {
    return "regular";
  }
  if (status.state === "open-emergency") {
    return "emergency";
  }
  return "closed";
}

export default function HoursSchedule({ schedule, currentDayIndex, status }: HoursScheduleProps) {
  return (
    <section className="v18-schedule" id="schedule">
      <h2>This Week&apos;s Schedule</h2>
      <div className="v18-schedule-head" aria-hidden="true">
        <span>Day</span>
        <span>Regular Hours</span>
        <span>Emergency Hours</span>
        <span>Status</span>
      </div>

      <div className="v18-schedule-body">
        {schedule.map((day, index) => {
          const indicator = getIndicatorState(index, currentDayIndex, status);
          const isToday = index === currentDayIndex;

          return (
            <article key={day.day} className={`v18-schedule-row ${isToday ? "is-today" : ""}`}>
              <p className="v18-schedule-day">{day.day}</p>
              <p className="v18-schedule-hours">
                <span className="v18-mobile-label">Regular</span>
                {formatRange(day.regular, "Closed")}
              </p>
              <p className="v18-schedule-hours">
                <span className="v18-mobile-label">Emergency</span>
                {formatRange(day.emergency, "-")}
              </p>
              <p className="v18-schedule-indicator">
                <span className={`v18-schedule-dot is-${indicator}`} aria-hidden="true" />
                <span className="v18-mobile-label">
                  {indicator === "regular" ? "Regular Open" : indicator === "emergency" ? "Emergency Open" : "Closed"}
                </span>
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
