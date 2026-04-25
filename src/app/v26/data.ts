export interface Metric {
  id: string;
  label: string;
  unit: string;
  used: number;
  limit: number;
  resetLabel: string;
  description: string;
}

export interface Plan {
  name: string;
  tier: number;
  nextPlanName: string;
  nextPlanPrice: string;
  renewalDate: string;
}

export const plan: Plan = {
  name: "Growth",
  tier: 2,
  nextPlanName: "Scale",
  nextPlanPrice: "£299/mo",
  renewalDate: "2025-08-01",
};

export const metrics: Metric[] = [
  {
    id: "email-sends",
    label: "Email Sends",
    unit: "sends",
    used: 38400,
    limit: 50000,
    resetLabel: "Resets in 12d 4h",
    description: "Total outbound emails dispatched this billing cycle",
  },
  {
    id: "contacts",
    label: "Active Contacts",
    unit: "contacts",
    used: 8750,
    limit: 10000,
    resetLabel: "Persistent — upgrade to expand",
    description: "Unique contacts across all lists and segments",
  },
  {
    id: "automations",
    label: "Live Workflows",
    unit: "workflows",
    used: 12,
    limit: 15,
    resetLabel: "Persistent — upgrade to expand",
    description: "Active automation sequences currently running",
  },
  {
    id: "api-calls",
    label: "Api Calls",
    unit: "calls",
    used: 142000,
    limit: 500000,
    resetLabel: "Resets in 12d 4h",
    description: "External API requests made via integrations",
  },
  {
    id: "landing-pages",
    label: "Landing Pages",
    unit: "pages",
    used: 5,
    limit: 5,
    resetLabel: "Persistent — upgrade to expand",
    description: "Published landing pages hosted on Pulse// domains",
  },
  {
    id: "team-seats",
    label: "Team Seats",
    unit: "seats",
    used: 3,
    limit: 5,
    resetLabel: "Persistent — upgrade to expand",
    description: "Active user accounts with dashboard access",
  },
];

export const WARN_THRESHOLD = 0.8;
export const CRIT_THRESHOLD = 1;

export type MetricStatus = "ok" | "warn" | "crit";

export function getStatus(metric: Metric): MetricStatus {
  const pct = metric.used / metric.limit;
  if (pct >= CRIT_THRESHOLD) {
    return "crit";
  }
  if (pct >= WARN_THRESHOLD) {
    return "warn";
  }
  return "ok";
}

export function getPct(metric: Metric): number {
  return Math.min(1, metric.used / metric.limit);
}

export function buildAsciiBar(pct: number): string {
  const total = 20;
  const filled = Math.round(pct * total);
  const empty = total - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1)}K`;
  }
  return String(n);
}

export type AccountHealth = "NOMINAL" | "DEGRADED" | "CRITICAL";

export function getAccountHealth(metricList: Metric[]): AccountHealth {
  const statuses = metricList.map(getStatus);
  if (statuses.some((status) => status === "crit")) {
    return "CRITICAL";
  }
  if (statuses.some((status) => status === "warn")) {
    return "DEGRADED";
  }
  return "NOMINAL";
}
