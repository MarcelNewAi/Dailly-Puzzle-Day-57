import ProgressSteps from "./ProgressSteps";

interface WizardHeaderProps {
  history: string[];
  currentQuestionId: string;
  hasOutcome: boolean;
}

export default function WizardHeader({ history, currentQuestionId, hasOutcome }: WizardHeaderProps) {
  return (
    <header className="v21-header">
      <div className="v21-header-inner">
        <p className="v21-header-badge">V21 - ISSUE DIAGNOSIS</p>
        <h1>Let us Diagnose Your Issue</h1>
        <p className="v21-header-subtitle">
          Answer a few questions and we will recommend the right service, urgency level, and next steps.
        </p>

        <ProgressSteps history={history} currentQuestionId={currentQuestionId} hasOutcome={hasOutcome} />
      </div>
    </header>
  );
}

