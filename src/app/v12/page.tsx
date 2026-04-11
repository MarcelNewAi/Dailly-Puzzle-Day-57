"use client";

import { Inter, Space_Grotesk } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import AnswerSummary, { type AnswerSummaryItem } from "./components/AnswerSummary";
import NavigationButtons from "./components/NavigationButtons";
import QuestionCard from "./components/QuestionCard";
import QuizHeader from "./components/QuizHeader";
import ResultCard from "./components/ResultCard";
import { questions, type Question } from "./components/data/questions";
import {
  getAlternativeServices,
  routeToService,
  type QuizAnswers,
  type Service,
} from "./components/data/services";

const STORAGE_KEY = "v12_quiz_answers";

type QuestionId = Question["id"];
type QuizAnswerKey = keyof QuizAnswers;

const questionToAnswerKey: Record<QuestionId, QuizAnswerKey> = {
  "business-type": "businessType",
  "project-goal": "projectGoal",
  timeline: "timeline",
  budget: "budget",
  features: "features",
};

const summaryLabels: Record<QuestionId, string> = {
  "business-type": "Business Type",
  "project-goal": "Main Goal",
  timeline: "Timeline",
  budget: "Budget",
  features: "Features",
};

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-v12-heading",
  weight: ["500", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-v12-body",
  weight: ["400", "500", "600", "700"],
});

function clampStep(value: number, total: number) {
  if (!Number.isFinite(value)) {
    return 1;
  }
  return Math.min(Math.max(Math.trunc(value), 1), total);
}

function sanitizeAnswers(input: unknown): Partial<QuizAnswers> {
  if (typeof input !== "object" || input === null) {
    return {};
  }

  const candidate = input as Record<string, unknown>;
  const next: Partial<QuizAnswers> = {};

  if (typeof candidate.businessType === "string") {
    next.businessType = candidate.businessType;
  }

  if (typeof candidate.projectGoal === "string") {
    next.projectGoal = candidate.projectGoal;
  }

  if (typeof candidate.timeline === "string") {
    next.timeline = candidate.timeline;
  }

  if (typeof candidate.budget === "string") {
    next.budget = candidate.budget;
  }

  if (Array.isArray(candidate.features)) {
    next.features = candidate.features.filter((item): item is string => typeof item === "string");
  }

  return next;
}

function toQuizAnswers(answers: Partial<QuizAnswers>): QuizAnswers {
  return {
    businessType: answers.businessType ?? "",
    projectGoal: answers.projectGoal ?? "",
    timeline: answers.timeline ?? "",
    budget: answers.budget ?? "",
    features: Array.isArray(answers.features) ? answers.features : [],
  };
}

function readStoredState(totalSteps: number): { currentStep: number; answers: Partial<QuizAnswers> } {
  if (typeof window === "undefined") {
    return { currentStep: 1, answers: {} };
  }

  const saved = sessionStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return { currentStep: 1, answers: {} };
  }

  try {
    const parsed = JSON.parse(saved) as { currentStep?: number; answers?: unknown };
    return {
      currentStep: clampStep(parsed.currentStep ?? 1, totalSteps),
      answers: sanitizeAnswers(parsed.answers),
    };
  } catch {
    return { currentStep: 1, answers: {} };
  }
}

export default function V12Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalSteps = questions.length;
  const [isStateHydrated, setIsStateHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [displayStep, setDisplayStep] = useState(1);
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "backward">("forward");
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [recommendedService, setRecommendedService] = useState<Service | null>(null);
  const [alternativeServices, setAlternativeServices] = useState<Service[]>([]);

  const focusRegionRef = useRef<HTMLDivElement | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const enterTimerRef = useRef<number | null>(null);

  const clearTransitionTimers = useCallback(() => {
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
    if (enterTimerRef.current !== null) {
      window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const storedState = readStoredState(totalSteps);
    setCurrentStep(storedState.currentStep);
    setDisplayStep(storedState.currentStep);
    setAnswers(storedState.answers);
    setIsStateHydrated(true);
  }, [totalSteps]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (!isStateHydrated) {
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStep, answers }));
  }, [answers, currentStep, isStateHydrated]);

  useEffect(() => {
    return () => {
      clearTransitionTimers();
    };
  }, [clearTransitionTimers]);

  useEffect(() => {
    if (isComplete) {
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      focusRegionRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [displayStep, isComplete]);

  const displayedQuestion = questions[displayStep - 1];
  const isTransitioning = transitionPhase !== "idle";

  const getQuestionValue = useCallback(
    (question: Question): string | string[] | undefined => {
      const key = questionToAnswerKey[question.id];
      return answers[key];
    },
    [answers],
  );

  const isStepAnswered = useCallback(
    (step: number): boolean => {
      const question = questions[step - 1];
      const value = getQuestionValue(question);

      if (question.type === "multi-select") {
        return Array.isArray(value) && value.length > 0;
      }

      return typeof value === "string" && value.length > 0;
    },
    [getQuestionValue],
  );

  const isCurrentStepValid = useMemo(() => {
    return isStepAnswered(currentStep);
  }, [currentStep, isStepAnswered]);

  const handleAnswer = useCallback((questionId: QuestionId, value: string | string[]) => {
    const mappedKey = questionToAnswerKey[questionId];

    setAnswers((previous) => {
      if (mappedKey === "features") {
        const featureValues = Array.isArray(value) ? value : [value];
        return {
          ...previous,
          features: Array.from(new Set(featureValues)),
        };
      }

      return {
        ...previous,
        [mappedKey]: Array.isArray(value) ? value[0] ?? "" : value,
      };
    });
  }, []);

  const animateToStep = useCallback(
    (nextStep: number, direction: "forward" | "backward") => {
      const boundedStep = clampStep(nextStep, totalSteps);

      if (boundedStep === currentStep && boundedStep === displayStep) {
        return;
      }

      clearTransitionTimers();

      setTransitionDirection(direction);
      setCurrentStep(boundedStep);
      setTransitionPhase("exiting");

      exitTimerRef.current = window.setTimeout(() => {
        setDisplayStep(boundedStep);
        setTransitionPhase("entering");

        enterTimerRef.current = window.setTimeout(() => {
          setTransitionPhase("idle");
        }, 300);
      }, 200);
    },
    [clearTransitionTimers, currentStep, displayStep, totalSteps],
  );

  const handleNext = useCallback(() => {
    if (!isCurrentStepValid || isTransitioning) {
      return;
    }

    if (currentStep < totalSteps) {
      animateToStep(currentStep + 1, "forward");
      return;
    }

    const normalizedAnswers = toQuizAnswers(answers);
    const recommendation = routeToService(normalizedAnswers);
    const alternatives = getAlternativeServices(normalizedAnswers, recommendation.id, 2);

    setRecommendedService(recommendation);
    setAlternativeServices(alternatives);
    setIsComplete(true);
    setTransitionPhase("idle");
  }, [answers, animateToStep, currentStep, isCurrentStepValid, isTransitioning, totalSteps]);

  const handleBack = useCallback(() => {
    if (currentStep <= 1 || isTransitioning) {
      return;
    }

    animateToStep(currentStep - 1, "backward");
  }, [animateToStep, currentStep, isTransitioning]);

  const handleEditStep = useCallback(
    (step: number) => {
      const boundedStep = clampStep(step, totalSteps);
      setIsComplete(false);
      setRecommendedService(null);
      setAlternativeServices([]);
      animateToStep(boundedStep, boundedStep >= currentStep ? "forward" : "backward");
    },
    [animateToStep, currentStep, totalSteps],
  );

  const handleRestart = useCallback(() => {
    clearTransitionTimers();
    setCurrentStep(1);
    setDisplayStep(1);
    setTransitionPhase("idle");
    setTransitionDirection("forward");
    setAnswers({});
    setIsComplete(false);
    setRecommendedService(null);
    setAlternativeServices([]);
    sessionStorage.removeItem(STORAGE_KEY);
  }, [clearTransitionTimers]);

  const handleReviewAnswers = useCallback(() => {
    clearTransitionTimers();
    setIsComplete(false);
    setRecommendedService(null);
    setAlternativeServices([]);
    setTransitionDirection("backward");
    setCurrentStep(totalSteps);
    setDisplayStep(totalSteps);
    setTransitionPhase("idle");
  }, [clearTransitionTimers, totalSteps]);

  const getAnswerText = useCallback(
    (question: Question): string | null => {
      const value = getQuestionValue(question);
      if (!value) {
        return null;
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return null;
        }
        const labels = value.map((entry) => {
          return question.options.find((option) => option.value === entry)?.label ?? entry;
        });
        return labels.join(", ");
      }

      return question.options.find((option) => option.value === value)?.label ?? value;
    },
    [getQuestionValue],
  );

  const summaryItems = useMemo<AnswerSummaryItem[]>(() => {
    return questions.map((question) => {
      const answerText = getAnswerText(question);
      const hasAnswer = Boolean(answerText);

      let state: AnswerSummaryItem["state"] = "upcoming";
      if (!isComplete && question.step === currentStep) {
        state = "current";
      } else if (hasAnswer && (isComplete || question.step < currentStep)) {
        state = "completed";
      }

      return {
        step: question.step,
        label: summaryLabels[question.id],
        value: answerText,
        state,
        editable: hasAnswer && (isComplete || question.step < currentStep),
      };
    });
  }, [currentStep, getAnswerText, isComplete]);

  const reasoningText = useMemo(() => {
    if (!recommendedService) {
      return "";
    }

    const business = getAnswerText(questions[0]) ?? "business";
    const goal = (getAnswerText(questions[1]) ?? "growth").toLowerCase();
    const budget = getAnswerText(questions[3]) ?? "current";

    return `Based on your ${business} profile, ${goal} goal, and ${budget} budget range, ${recommendedService.name} is the strongest fit for your needs.`;
  }, [getAnswerText, recommendedService]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isComplete || isTransitioning) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable === true;

      if (isTypingTarget) {
        return;
      }

      if (event.key === "Escape" || (event.key === "Enter" && event.shiftKey)) {
        event.preventDefault();
        handleBack();
        return;
      }

      if (event.key === "Enter" && !event.shiftKey) {
        if (target?.dataset.v12Option === "true") {
          return;
        }

        if (!isCurrentStepValid) {
          return;
        }

        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleBack, handleNext, isComplete, isCurrentStepValid, isTransitioning]);

  const activeStep = isComplete ? totalSteps : currentStep;

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${headingFont.variable} ${bodyFont.variable} v12-page`}>
          <QuizHeader currentStep={activeStep} totalSteps={totalSteps} />

          <section className="v12-main-shell">
            <div className="v12-layout-grid">
              <div className="v12-left-panel">
                {isComplete && recommendedService ? (
                  <ResultCard
                    service={recommendedService}
                    reasoningText={reasoningText}
                    alternatives={alternativeServices}
                    onReview={handleReviewAnswers}
                    onRestart={handleRestart}
                  />
                ) : (
                  <div
                    className={`v12-question-motion is-${transitionPhase} is-${transitionDirection}`}
                    ref={focusRegionRef}
                    tabIndex={-1}
                  >
                    <QuestionCard
                      question={displayedQuestion}
                      selectedValue={getQuestionValue(displayedQuestion)}
                      onSelect={(value) => handleAnswer(displayedQuestion.id, value)}
                      disabled={isTransitioning}
                      totalSteps={totalSteps}
                    />

                    <NavigationButtons
                      canGoBack={currentStep > 1 && !isTransitioning}
                      canGoNext={isCurrentStepValid && !isTransitioning}
                      isLastStep={currentStep === totalSteps}
                      onBack={handleBack}
                      onNext={handleNext}
                    />
                  </div>
                )}
              </div>

              <div className="v12-right-panel">
                <AnswerSummary items={summaryItems} onEdit={handleEditStep} />
              </div>
            </div>
          </section>

          <ExplanationTriggerButton versionId="v12" />
        </main>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#10B981" thumbHoverColor="#34D399" />
    </>
  );
}
