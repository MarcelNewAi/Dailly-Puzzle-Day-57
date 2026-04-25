interface EnvironmentBadgeProps {
  environment: "live" | "test";
}

export default function EnvironmentBadge({ environment }: EnvironmentBadgeProps) {
  const isLive = environment === "live";

  return (
    <span className={`v27-env-badge ${isLive ? "v27-env-badge--live" : "v27-env-badge--test"}`}>
      <span className={`v27-env-dot ${isLive ? "v27-env-dot--live" : ""}`} aria-hidden="true" />
      <span>{isLive ? "LIVE" : "TEST"}</span>
    </span>
  );
}

