import type { Step } from "../../data";

interface HowItWorksBlockProps {
  steps: Step[];
}

export default function HowItWorksBlock({ steps }: HowItWorksBlockProps) {
  return (
    <section className="v22-block">
      <p className="v22-block-label">How it works</p>
      <h2 className="v22-block-title">The process</h2>

      <ol className="v22-timeline">
        {steps.map((step) => (
          <li key={step.number} className="v22-timeline-item">
            <span className="v22-step-number">{step.number}</span>
            <div className="v22-step-copy">
              <h3 className="v22-step-title">{step.title}</h3>
              <p className="v22-step-description">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
