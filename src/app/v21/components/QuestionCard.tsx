import type { Question } from "../data/diagnosticFlow";
import AnswerOption from "./AnswerOption";

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onAnswer: (optionId: string) => void;
  onBack: () => void;
  canGoBack: boolean;
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  selectedOptionId,
  onAnswer,
  onBack,
  canGoBack,
  disabled = false,
}: QuestionCardProps) {
  return (
    <article className="v21-question-card" aria-live="polite">
      <p className="v21-question-step">QUESTION {question.step}</p>
      <h2>{question.title}</h2>
      <p className="v21-question-subtitle">{question.subtitle}</p>

      <div className="v21-options-grid" role="list" aria-label={question.title}>
        {question.options.map((option) => (
          <AnswerOption
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            onSelect={onAnswer}
            disabled={disabled}
          />
        ))}
      </div>

      <div className="v21-question-footer">
        <button
          type="button"
          className="v21-back-button"
          onClick={onBack}
          disabled={!canGoBack || disabled}
          aria-label="Go back to previous question"
        >
          {"<- Back"}
        </button>
      </div>
    </article>
  );
}

