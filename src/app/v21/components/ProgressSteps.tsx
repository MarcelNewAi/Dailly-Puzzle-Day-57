import { questions } from "../data/diagnosticFlow";

interface ProgressStepsProps {
  history: string[];
  currentQuestionId: string;
  hasOutcome: boolean;
}

const TOTAL_STEPS = 3;

function getStepLabel(questionId: string): string {
  if (questionId.startsWith("q1")) {
    return "Main Issue";
  }

  if (questionId.includes("cause")) {
    return "Cause";
  }

  if (questionId.includes("when") || questionId.includes("how-long")) {
    return "Timing";
  }

  return "Assessment";
}

export default function ProgressSteps({ history, currentQuestionId, hasOutcome }: ProgressStepsProps) {
  const validHistory = history.filter((questionId) => Boolean(questions[questionId]));
  const fallbackQuestionId = validHistory[validHistory.length - 1] ?? currentQuestionId;
  const activeQuestionId = hasOutcome ? fallbackQuestionId : currentQuestionId;
  const activeStep = questions[activeQuestionId]?.step ?? 1;
  const activeLabel = getStepLabel(activeQuestionId);

  return (
    <section className="v21-progress-shell" aria-label="Diagnosis progress">
      <div className="v21-progress-headline">
        <p className="v21-progress-caption">Step {activeStep} of ~{TOTAL_STEPS}</p>
        <p className="v21-progress-label">{activeLabel}</p>
      </div>

      <div className="v21-progress-track" role="presentation" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }, (_, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < activeStep;
          const isCurrent = stepNumber === activeStep;
          return (
            <span
              key={stepNumber}
              className={`v21-progress-dot${isComplete ? " is-complete" : ""}${isCurrent ? " is-current" : ""}`}
            />
          );
        })}
      </div>

      <div className="v21-branch-dots" role="presentation" aria-hidden="true">
        {validHistory.map((questionId, index) => {
          const isCurrent = questionId === activeQuestionId && !hasOutcome;
          return (
            <span
              key={`${questionId}-${index}`}
              className={`v21-branch-dot${isCurrent ? " is-current" : ""}`}
              title={questions[questionId]?.title}
            />
          );
        })}
      </div>
    </section>
  );
}

