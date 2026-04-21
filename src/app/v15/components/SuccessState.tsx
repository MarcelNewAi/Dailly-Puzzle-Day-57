interface SuccessStateProps {
  fullName: string;
  email: string;
  projectType: string;
  photoCount: number;
  onReset: () => void;
}

export default function SuccessState({ fullName, email, projectType, photoCount, onReset }: SuccessStateProps) {
  return (
    <section className="v15-success-wrap" aria-live="polite">
      <div className="v15-success-icon-wrap" aria-hidden="true">
        <svg viewBox="0 0 80 80" className="v15-success-icon">
          <circle cx="40" cy="40" r="34" className="v15-success-ring" />
          <path d="M24 41.5 35.5 53 56 31.5" className="v15-success-check" />
        </svg>
        <span className="v15-confetti-dot v15-confetti-dot-1" />
        <span className="v15-confetti-dot v15-confetti-dot-2" />
        <span className="v15-confetti-dot v15-confetti-dot-3" />
        <span className="v15-confetti-dot v15-confetti-dot-4" />
        <span className="v15-confetti-dot v15-confetti-dot-5" />
      </div>

      <h2 className="v15-success-title">Quote Request Sent!</h2>
      <p className="v15-success-subtitle">
        We&apos;ve received your {photoCount} photos and project details. Expect a personalized quote within 24 hours.
      </p>

      <div className="v15-success-summary">
        <p>
          <span>Name</span>
          <strong>{fullName}</strong>
        </p>
        <p>
          <span>Email</span>
          <strong>{email}</strong>
        </p>
        <p>
          <span>Project Type</span>
          <strong>{projectType}</strong>
        </p>
        <p>
          <span>Photo Count</span>
          <strong>{photoCount}</strong>
        </p>
      </div>

      <button type="button" className="v15-reset-button" onClick={onReset}>
        Submit Another Request
      </button>
    </section>
  );
}

