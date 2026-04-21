import type { ReactNode, RefObject } from "react";
import CustomSelect from "./CustomSelect";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description?: string;
}

interface ProjectDetailsFormProps {
  formData: FormData;
  errors: FormErrors;
  onFieldChange: (field: keyof FormData, value: string) => void;
  refs: {
    fullName: RefObject<HTMLInputElement | null>;
    email: RefObject<HTMLInputElement | null>;
    projectType: RefObject<HTMLButtonElement | null>;
    budget: RefObject<HTMLButtonElement | null>;
    timeline: RefObject<HTMLButtonElement | null>;
    description: RefObject<HTMLTextAreaElement | null>;
  };
}

interface FieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

function Field({ label, id, required = false, error, children }: FieldProps) {
  return (
    <div className="v15-field-group">
      <label htmlFor={id} className="v15-field-label">
        {label}
        {required ? <span className="v15-required">*</span> : null}
      </label>
      {children}
      {error ? <p className="v15-field-error">{error}</p> : null}
    </div>
  );
}

export default function ProjectDetailsForm({ formData, errors, onFieldChange, refs }: ProjectDetailsFormProps) {
  return (
    <div className="v15-fields-grid">
      <Field label="Full Name" id="v15-full-name" required error={errors.fullName}>
        <input
          ref={refs.fullName}
          id="v15-full-name"
          type="text"
          className={`v15-input ${errors.fullName ? "has-error" : ""}`}
          placeholder="Jane Doe"
          value={formData.fullName}
          onChange={(event) => onFieldChange("fullName", event.target.value)}
        />
      </Field>

      <Field label="Email" id="v15-email" required error={errors.email}>
        <input
          ref={refs.email}
          id="v15-email"
          type="email"
          className={`v15-input ${errors.email ? "has-error" : ""}`}
          placeholder="jane@example.com"
          value={formData.email}
          onChange={(event) => onFieldChange("email", event.target.value)}
        />
      </Field>

      <Field label="Phone" id="v15-phone">
        <input
          id="v15-phone"
          type="tel"
          className="v15-input"
          placeholder="+386..."
          value={formData.phone}
          onChange={(event) => onFieldChange("phone", event.target.value)}
        />
      </Field>

      <Field label="Project Type" id="v15-project-type" required error={errors.projectType}>
        <CustomSelect
          ref={refs.projectType}
          id="v15-project-type"
          value={formData.projectType}
          hasError={Boolean(errors.projectType)}
          placeholder="Select project type"
          onChange={(value) => onFieldChange("projectType", value)}
          options={[
            { value: "Kitchen Renovation", label: "Kitchen Renovation" },
            { value: "Bathroom Renovation", label: "Bathroom Renovation" },
            { value: "Full Home", label: "Full Home" },
            { value: "Commercial Space", label: "Commercial Space" },
            { value: "Other", label: "Other" },
          ]}
        />
      </Field>

      <Field label="Budget Range" id="v15-budget" required error={errors.budget}>
        <CustomSelect
          ref={refs.budget}
          id="v15-budget"
          value={formData.budget}
          hasError={Boolean(errors.budget)}
          placeholder="Select budget range"
          onChange={(value) => onFieldChange("budget", value)}
          options={[
            { value: "Under EUR 5,000", label: "Under EUR 5,000" },
            { value: "EUR 5,000-EUR 15,000", label: "EUR 5,000-EUR 15,000" },
            { value: "EUR 15,000-EUR 50,000", label: "EUR 15,000-EUR 50,000" },
            { value: "EUR 50,000+", label: "EUR 50,000+" },
          ]}
        />
      </Field>

      <Field label="Timeline" id="v15-timeline" required error={errors.timeline}>
        <CustomSelect
          ref={refs.timeline}
          id="v15-timeline"
          value={formData.timeline}
          hasError={Boolean(errors.timeline)}
          placeholder="Select timeline"
          onChange={(value) => onFieldChange("timeline", value)}
          options={[
            { value: "ASAP", label: "ASAP" },
            { value: "Within 1 month", label: "Within 1 month" },
            { value: "1-3 months", label: "1-3 months" },
            { value: "Flexible", label: "Flexible" },
          ]}
        />
      </Field>

      <Field label="Project Description" id="v15-description" required error={errors.description}>
        <textarea
          ref={refs.description}
          id="v15-description"
          rows={4}
          className={`v15-input v15-textarea ${errors.description ? "has-error" : ""}`}
          placeholder="Tell us about your space, vision, and any specific requirements..."
          value={formData.description}
          onChange={(event) => onFieldChange("description", event.target.value)}
        />
      </Field>
    </div>
  );
}
