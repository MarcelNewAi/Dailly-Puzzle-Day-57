function KeystoneMark() {
  return (
    <svg viewBox="0 0 28 28" className="v27-header-mark" aria-hidden="true">
      <path d="M14 2 24 12 14 22 4 12Z" fill="currentColor" />
      <path d="M14 7.4 18.6 12 14 16.6 9.4 12Z" fill="var(--v27-surface)" />
      <path d="M19.6 17.2h4.4v1.6h-4.4z" fill="currentColor" />
    </svg>
  );
}

export default function PageHeader() {
  return (
    <header className="v27-header">
      <div className="v27-header-logo">
        <KeystoneMark />
        <div>
          <div className="v27-header-brand">Keystone</div>
          <div className="v27-header-tagline">Developer Platform</div>
        </div>
      </div>

      <div className="v27-header-right">
        <p className="v27-breadcrumb">Settings / API Keys</p>
        <span className="v27-avatar" aria-label="Account initials">
          JD
        </span>
      </div>
    </header>
  );
}

