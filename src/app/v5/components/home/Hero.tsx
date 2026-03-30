import Button from "../ui/Button";

function HeroTopIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
      <path d="M10 7h4" />
      <path d="M7 10v4" />
      <path d="M17 10v4" />
      <path d="M10 17h4" />
    </svg>
  );
}

function CircuitAccent() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 5h7v5h4v4h5" />
      <path d="M4 19h5v-4h4" />
      <circle cx="4" cy="5" r="1.2" fill="#00F0FF" />
      <circle cx="20" cy="14" r="1.2" fill="#00F0FF" />
      <circle cx="4" cy="19" r="1.2" fill="#00F0FF" />
      <circle cx="13" cy="10" r="1.2" fill="#00F0FF" />
    </svg>
  );
}

function PulseAccent() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12h4l2.5-5 4 10 2.5-5H22" />
      <path d="M4 6a10 10 0 0 1 16 0" opacity="0.55" />
      <path d="M4 18a10 10 0 0 0 16 0" opacity="0.55" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 5 13h6l-1 9 9-13h-6z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="nq-hero">
      <div className="nq-hero-icon nq-anim-hero-top" aria-hidden="true">
        <HeroTopIcon />
      </div>

      <div className="nq-hero-title-wrap">
        <span className="nq-hero-accent nq-anim-hero-title" aria-hidden="true">
          <CircuitAccent />
        </span>
        <h1 className="nq-hero-title nq-anim-hero-title">Nexus-Q</h1>
        <span className="nq-hero-accent nq-anim-hero-title" aria-hidden="true">
          <PulseAccent />
        </span>
      </div>

      <p className="nq-hero-subtitle nq-anim-hero-subtitle">Advanced Quantum Compute Allocation Dashboard</p>
      <p className="nq-hero-description nq-anim-hero-subtitle">
        Monitor server nodes, calculate computational costs, and deploy AI models with quantum-level precision.
      </p>

      <div className="nq-hero-ctas nq-anim-hero-buttons">
        <Button href="/v5/allocator" variant="filled" ariaLabel="Start computing in the allocator page">
          <span>Start Computing</span>
          <span aria-hidden="true">→</span>
        </Button>
        <Button href="/v5/network" variant="outlined" ariaLabel="View the network overview page">
          <BoltIcon />
          <span>View Network</span>
        </Button>
      </div>
    </section>
  );
}
