import { nodes } from "../../data";

function statusLabel(status: "online" | "offline" | "maintenance") {
  if (status === "online") return "ONLINE";
  if (status === "offline") return "OFFLINE";
  return "MAINTENANCE";
}

export default function NodeGrid() {
  return (
    <section className="nq-node-grid" aria-label="Nexus-Q node grid">
      {nodes.map((node, index) => {
        const cpuWidth = node.status === "offline" ? 0 : node.cpu;
        const memoryWidth = node.status === "offline" ? 0 : node.memory;

        return (
          <article
            key={node.id}
            className={`nq-card nq-node-card nq-anim-network ${node.status === "offline" ? "is-offline" : ""}`}
            style={{ animationDelay: `${220 + index * 80}ms` }}
          >
            <div className="nq-node-top">
              <p className="nq-node-id nq-mono">{node.id}</p>
              <span className={`nq-status-badge is-${node.status}`}>
                <span className="nq-status-dot" aria-hidden="true" />
                {statusLabel(node.status)}
              </span>
            </div>

            <h2 className="nq-node-name">{node.name}</h2>

            <div className="nq-meter-block">
              <div className="nq-meter-head">
                <span>CPU Usage</span>
                <span className="nq-mono">{node.cpu}%</span>
              </div>
              <div className="nq-meter-track" aria-hidden="true">
                <span className="nq-meter-fill" style={{ width: `${cpuWidth}%` }} />
              </div>
            </div>

            <div className="nq-meter-block">
              <div className="nq-meter-head">
                <span>Memory Usage</span>
                <span className="nq-mono">{node.memory}%</span>
              </div>
              <div className="nq-meter-track" aria-hidden="true">
                <span className="nq-meter-fill" style={{ width: `${memoryWidth}%` }} />
              </div>
            </div>

            <div className="nq-node-meta">
              <p>{node.location}</p>
              <p className="nq-mono">{node.uptime}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
