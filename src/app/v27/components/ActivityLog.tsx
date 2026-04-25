import type { ApiKey } from "../keyGen";

interface ActivityLogProps {
  apiKey: ApiKey;
}

const mockLog = [
  { method: "POST", endpoint: "/v1/campaigns/send", status: 200, time: "2m ago" },
  { method: "GET", endpoint: "/v1/contacts/list", status: 200, time: "14m ago" },
  { method: "POST", endpoint: "/v1/segments/create", status: 201, time: "1h ago" },
  { method: "GET", endpoint: "/v1/analytics/open-rate", status: 200, time: "3h ago" },
  { method: "DELETE", endpoint: "/v1/campaigns/47", status: 403, time: "5h ago" },
] as const;

function methodClass(method: string): string {
  if (method === "GET") {
    return "v27-log-method--get";
  }
  if (method === "POST") {
    return "v27-log-method--post";
  }
  return "v27-log-method--delete";
}

function statusClass(status: number): string {
  return status >= 200 && status < 300 ? "v27-log-status--ok" : "v27-log-status--err";
}

export default function ActivityLog({ apiKey }: ActivityLogProps) {
  return (
    <section className="v27-panel">
      <p className="v27-panel-label">RECENT ACTIVITY</p>

      {apiKey.usageCount > 0 ? (
        <p className="v27-log-notice">Key has been used {apiKey.usageCount} time(s) this session.</p>
      ) : null}

      <div className="v27-log-list">
        {mockLog.map((entry) => (
          <div key={`${entry.method}-${entry.endpoint}-${entry.time}`} className="v27-log-row">
            <span className={`v27-log-method ${methodClass(entry.method)}`}>{entry.method}</span>
            <span className="v27-log-endpoint" title={entry.endpoint}>
              {entry.endpoint}
            </span>
            <span className={`v27-log-status ${statusClass(entry.status)}`}>{entry.status}</span>
            <span className="v27-log-time">{entry.time}</span>
          </div>
        ))}
      </div>

      <p className="v27-log-footnote">Showing activity for key {apiKey.id}</p>
    </section>
  );
}

