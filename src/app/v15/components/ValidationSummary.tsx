interface FormErrors {
  photos?: string;
  fullName?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description?: string;
}

interface ValidationSummaryProps {
  errors: FormErrors;
  onJumpToField: (field: keyof FormErrors) => void;
}

const FIELD_ORDER: (keyof FormErrors)[] = ["photos", "fullName", "email", "projectType", "budget", "timeline", "description"];

export default function ValidationSummary({ errors, onJumpToField }: ValidationSummaryProps) {
  const orderedErrors = FIELD_ORDER.filter((field) => Boolean(errors[field])).map((field) => ({
    field,
    message: errors[field] as string,
  }));

  if (orderedErrors.length === 0) {
    return null;
  }

  return (
    <aside className="v15-validation-summary" aria-live="polite">
      <p className="v15-validation-title">Please fix the following:</p>
      <ul>
        {orderedErrors.map((entry) => (
          <li key={entry.field}>
            <button type="button" onClick={() => onJumpToField(entry.field)}>
              <span className="v15-validation-icon" aria-hidden="true">
                ?
              </span>
              <span>{entry.message}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

