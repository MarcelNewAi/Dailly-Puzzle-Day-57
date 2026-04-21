interface CtaBlockProps {
  ctaHeadline: string;
  ctaBody: string;
  serviceName: string;
  locationName: string;
  ctaMeta: string;
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 4.8h4l1.2 4.3-2 1.8a16.5 16.5 0 0 0 4 4l1.8-2 4.2 1.2v4c0 .6-.4 1.1-1 1.2a14 14 0 0 1-13.4-13.4c.1-.6.6-1.1 1.2-1.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="14" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 3.8v3.2M16.5 3.8v3.2M4 9.5h16" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function CtaBlock({
  ctaHeadline,
  ctaBody,
  serviceName,
  locationName,
  ctaMeta,
}: CtaBlockProps) {
  return (
    <section className="v22-block v22-cta-block">
      <p className="v22-block-label v22-cta-label">Ready to book?</p>
      <h2 className="v22-cta-title">{ctaHeadline}</h2>
      <p className="v22-cta-body">{ctaBody}</p>
      <p className="v22-cta-context">
        <span>{serviceName}</span>
        <span className="v22-cta-dot" aria-hidden="true">
          |
        </span>
        <span>{locationName}</span>
      </p>

      <div className="v22-cta-actions">
        <button type="button" className="v22-btn-primary">
          <span className="v22-btn-icon">
            <CalendarIcon />
          </span>
          Book Now
        </button>
        <button type="button" className="v22-btn-secondary">
          <span className="v22-btn-icon">
            <PhoneIcon />
          </span>
          Call Us
        </button>
      </div>

      <p className="v22-cta-meta">{ctaMeta}</p>
    </section>
  );
}
