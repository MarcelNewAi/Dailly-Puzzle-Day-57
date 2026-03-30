export interface NodeData {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  cpu: number;
  memory: number;
  location: string;
  uptime: string;
}

export const nodes: NodeData[] = [
  { id: "NQ-001", name: "Alpha Prime", status: "online", cpu: 78, memory: 64, location: "US-East", uptime: "99.97%" },
  { id: "NQ-002", name: "Beta Cluster", status: "online", cpu: 45, memory: 82, location: "EU-West", uptime: "99.91%" },
  { id: "NQ-003", name: "Gamma Array", status: "maintenance", cpu: 0, memory: 12, location: "AP-South", uptime: "97.23%" },
  { id: "NQ-004", name: "Delta Node", status: "online", cpu: 92, memory: 71, location: "US-West", uptime: "99.99%" },
  { id: "NQ-005", name: "Epsilon Grid", status: "offline", cpu: 0, memory: 0, location: "EU-North", uptime: "0%" },
  { id: "NQ-006", name: "Zeta Core", status: "online", cpu: 61, memory: 55, location: "AP-East", uptime: "99.85%" },
];

export const systemStats = {
  activeNodes: 4,
  totalNodes: 6,
  qCreditsPerHour: 465,
  avgLatency: "12.4ms",
};

