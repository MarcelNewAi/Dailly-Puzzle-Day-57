"use client";

import { Fraunces, Inter } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import FormHeader from "./components/FormHeader";
import PhotoPreviewGrid from "./components/PhotoPreviewGrid";
import PhotoUploadZone from "./components/PhotoUploadZone";
import ProjectDetailsForm from "./components/ProjectDetailsForm";
import SuccessState from "./components/SuccessState";
import ValidationSummary from "./components/ValidationSummary";

interface UploadedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  error?: string;
}

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
  photos?: string;
  fullName?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description?: string;
}

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-v15-heading",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-v15-body",
  weight: ["400", "500", "600", "700"],
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_PHOTOS = 10;
const MIN_PHOTOS = 3;

const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
};

function validateForm(data: FormData, photos: UploadedPhoto[]): FormErrors {
  const errors: FormErrors = {};

  if (photos.length < MIN_PHOTOS) {
    errors.photos = "Please upload at least 3 photos";
  }

  if (!data.fullName.trim()) {
    errors.fullName = "Name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.projectType) {
    errors.projectType = "Select a project type";
  }

  if (!data.budget) {
    errors.budget = "Select a budget range";
  }

  if (!data.timeline) {
    errors.timeline = "Select a timeline";
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
  } else if (data.description.trim().length < 20) {
    errors.description = "Please provide at least 20 characters";
  }

  return errors;
}

function generatePhotoId(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function V15Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const photosFieldRef = useRef<HTMLDivElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const projectTypeRef = useRef<HTMLButtonElement>(null);
  const budgetRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<HTMLButtonElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const photosRef = useRef<UploadedPhoto[]>([]);

  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl);
      });
    };
  }, []);

  const isFormCurrentlyValid = useMemo(() => {
    return Object.keys(validateForm(formData, photos)).length === 0;
  }, [formData, photos]);

  const hasVisibleErrors = hasAttemptedSubmit && Object.keys(errors).length > 0;

  const setFieldValue = useCallback(
    (field: keyof FormData, value: string) => {
      const nextData = {
        ...formData,
        [field]: value,
      };
      setFormData(nextData);

      if (hasAttemptedSubmit) {
        setErrors(validateForm(nextData, photos));
      }
    },
    [formData, hasAttemptedSubmit, photos],
  );

  const processFiles = useCallback(
    (incomingFiles: File[]) => {
      if (incomingFiles.length === 0) {
        return;
      }

      const nextPhotos = [...photos];
      let uploadError = "";

      for (const file of incomingFiles) {
        if (!file.type.startsWith("image/")) {
          uploadError = "Only image files are allowed";
          continue;
        }

        if (file.size > MAX_FILE_SIZE) {
          uploadError = `\"${file.name}\" is larger than 10MB`;
          continue;
        }

        if (nextPhotos.length >= MAX_PHOTOS) {
          uploadError = "Maximum 10 photos allowed";
          break;
        }

        nextPhotos.push({
          id: generatePhotoId(file),
          file,
          previewUrl: URL.createObjectURL(file),
        });
      }

      setPhotos(nextPhotos);

      if (hasAttemptedSubmit) {
        setErrors(validateForm(formData, nextPhotos));
        return;
      }

      setErrors((prev) => {
        const next = { ...prev };
        if (uploadError) {
          next.photos = uploadError;
        } else {
          delete next.photos;
        }
        return next;
      });
    },
    [formData, hasAttemptedSubmit, photos],
  );

  const removePhoto = useCallback(
    (photoId: string) => {
      const target = photos.find((photo) => photo.id === photoId);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }

      const nextPhotos = photos.filter((photo) => photo.id !== photoId);
      setPhotos(nextPhotos);

      if (hasAttemptedSubmit) {
        setErrors(validateForm(formData, nextPhotos));
      }
    },
    [formData, hasAttemptedSubmit, photos],
  );

  const resetForm = useCallback(() => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    setPhotos([]);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setHasAttemptedSubmit(false);
    setIsSubmitting(false);
    setIsSuccess(false);
  }, [photos]);

  const focusFieldFromError = useCallback(
    (field: keyof FormErrors) => {
      const focusMap: Partial<Record<keyof FormErrors, HTMLElement | null>> = {
        photos: photosFieldRef.current,
        fullName: fullNameRef.current,
        email: emailRef.current,
        projectType: projectTypeRef.current,
        budget: budgetRef.current,
        timeline: timelineRef.current,
        description: descriptionRef.current,
      };

      const element = focusMap[field];
      if (!element) {
        return;
      }

      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    [],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);

    const currentErrors = validateForm(formData, photos);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${headingFont.variable} ${bodyFont.variable} v15-page`}>
          <FormHeader />

          <section className="v15-main">
            {isSuccess ? (
              <div className="v15-success-shell">
                <SuccessState
                  fullName={formData.fullName}
                  email={formData.email}
                  projectType={formData.projectType}
                  photoCount={photos.length}
                  onReset={resetForm}
                />
              </div>
            ) : (
              <form className="v15-form v15-form-grid" onSubmit={handleSubmit} noValidate>
                <ValidationSummary errors={hasVisibleErrors ? errors : {}} onJumpToField={focusFieldFromError} />

                <section className="v15-section v15-column-surface">
                  <h2 className="v15-section-title">Upload Your Photos</h2>
                  <PhotoUploadZone
                    ref={photosFieldRef}
                    photoCount={photos.length}
                    minPhotos={MIN_PHOTOS}
                    error={hasVisibleErrors ? errors.photos : undefined}
                    onFilesSelected={processFiles}
                  />
                  <PhotoPreviewGrid photos={photos} onRemove={removePhoto} />
                </section>

                <section className="v15-section v15-column-surface">
                  <h2 className="v15-section-title">Project Details</h2>
                  <ProjectDetailsForm
                    formData={formData}
                    errors={hasVisibleErrors ? errors : {}}
                    onFieldChange={setFieldValue}
                    refs={{
                      fullName: fullNameRef,
                      email: emailRef,
                      projectType: projectTypeRef,
                      budget: budgetRef,
                      timeline: timelineRef,
                      description: descriptionRef,
                    }}
                  />

                  <button
                    type="submit"
                    className={`v15-submit-button ${
                      !isFormCurrentlyValid || photos.length < MIN_PHOTOS ? "is-disabled-visual" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="v15-spinner" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      "Request My Quote ->"
                    )}
                  </button>
                </section>
              </form>
            )}
          </section>

          <ExplanationTriggerButton versionId="v15" />
        </main>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#DC2626"
        thumbHoverColor="#B91C1C"
        trackColorLight="rgba(0, 0, 0, 0.05)"
      />
    </>
  );
}

