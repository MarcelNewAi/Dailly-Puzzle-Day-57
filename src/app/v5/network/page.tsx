import NodeGrid from "../components/network/NodeGrid";

export default function V5NetworkPage() {
  return (
    <div className="nq-page">
      <section className="nq-network-header nq-anim-rise nq-anim-delay-1">
        <h1 className="nq-page-title">Quantum Network Grid</h1>
        <p className="nq-page-subtitle">Real-time status of all Nexus-Q compute nodes</p>
      </section>
      <NodeGrid />
    </div>
  );
}

