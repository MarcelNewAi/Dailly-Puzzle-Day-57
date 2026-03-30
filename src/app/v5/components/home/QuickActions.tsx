import Button from "../ui/Button";

function RocketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3c4 0 7 3 7 7 0 4-2 8-8 11-3-6-3-9-3-10 0-4 3-8 4-8z" />
      <path d="M9 13 3 19" />
      <path d="M5 21h4" />
      <circle cx="15.5" cy="8.5" r="1.4" />
    </svg>
  );
}

function LogsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v4h4" />
      <path d="M10 11h6" />
      <path d="M10 15h6" />
      <path d="M10 19h4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

const quickActions = [
  { label: "Deploy Model", href: "/v5/allocator", icon: <RocketIcon /> },
  { label: "View Logs", href: "/v5/network", icon: <LogsIcon /> },
  { label: "Network Map", href: "/v5/network", icon: <GlobeIcon /> },
];

export default function QuickActions() {
  return (
    <section className="nq-quick-actions" aria-label="Quick actions">
      <h2 className="nq-section-title">Quick Actions</h2>
      <div className="nq-quick-grid">
        {quickActions.map((action, index) => (
          <div key={action.label} className="nq-anim-rise" style={{ animationDelay: `${920 + index * 100}ms` }}>
            <Button href={action.href} variant="outlined" ariaLabel={action.label} className="nq-quick-button">
              <span aria-hidden="true">{action.icon}</span>
              <span>{action.label}</span>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
