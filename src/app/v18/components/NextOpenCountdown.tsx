import { getCountdown } from "../lib/countdown";

interface NextOpenCountdownProps {
  nextOpen: { day: string; time: string; daysAway: number };
  now: Date;
}

export default function NextOpenCountdown({ nextOpen, now }: NextOpenCountdownProps) {
  const countdown = getCountdown(nextOpen, now);

  return (
    <section className="v18-countdown-card" aria-live="polite">
      <p className="v18-countdown-label">OPENS IN</p>
      <p className="v18-countdown-time">
        {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
      </p>
      <p className="v18-countdown-meta">
        {nextOpen.day} at {nextOpen.time}
      </p>
    </section>
  );
}
