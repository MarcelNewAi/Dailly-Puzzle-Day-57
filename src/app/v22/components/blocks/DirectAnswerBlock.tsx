import type { Service } from "../../data";

interface DirectAnswerBlockProps {
  service: Service;
  locationContextLine: string;
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10.5v5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="7.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function DirectAnswerBlock({ service, locationContextLine }: DirectAnswerBlockProps) {
  return (
    <section className="v22-block v22-direct-answer-block">
      <div className="v22-block-top">
        <p className="v22-block-label">Direct answer</p>
        <span className="v22-ai-tag">
          <span className="v22-ai-tag-icon">
            <InfoIcon />
          </span>
          AI extractable answer
        </span>
      </div>

      <h2 className="v22-block-title">What is {service.name}?</h2>
      <p className="v22-direct-answer-text">{service.directAnswer}</p>
      <p className="v22-location-context">{locationContextLine}</p>
    </section>
  );
}
