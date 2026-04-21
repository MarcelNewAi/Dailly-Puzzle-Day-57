"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import DiagnosticResult from "./components/DiagnosticResult";
import QuestionCard from "./components/QuestionCard";
import WizardHeader from "./components/WizardHeader";
import {
  FIRST_QUESTION_ID,
  questions,
  type DiagnosticOutcome,
  validateDiagnosticFlow,
} from "./data/diagnosticFlow";

interface WizardState {
  answers: Record<string, string>;
  history: string[];
  currentQuestionId: string;
  outcome: DiagnosticOutcome | null;
}

const STORAGE_KEY = "v21_wizard_state";
const EXIT_DURATION_MS = 200;
const ENTER_DURATION_MS = 300;

const headingFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-v21-heading",
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-v21-body",
  weight: ["400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-v21-mono",
  weight: ["400", "500", "600"],
});

function createInitialState(): WizardState {
  return {
    answers: {},
    history: [FIRST_QUESTION_ID],
    currentQuestionId: FIRST_QUESTION_ID,
    outcome: null,
  };
}

function sanitizeState(input: unknown): WizardState {
  const fallback = createInitialState();
  if (typeof input !== "object" || input === null) {
    return fallback;
  }

  const value = input as Partial<WizardState>;
  const safeCurrentQuestionId =
    typeof value.currentQuestionId === "string" && questions[value.currentQuestionId]
      ? value.currentQuestionId
      : FIRST_QUESTION_ID;

  const safeHistory = Array.isArray(value.history)
    ? value.history.filter((questionId): questionId is string => typeof questionId === "string" && Boolean(questions[questionId]))
    : [];

  if (safeHistory.length === 0) {
    safeHistory.push(FIRST_QUESTION_ID);
  }

  if (!safeHistory.includes(safeCurrentQuestionId)) {
    safeHistory.push(safeCurrentQuestionId);
  }

  const safeAnswers: Record<string, string> = {};
  if (value.answers && typeof value.answers === "object") {
    for (const [questionId, answerId] of Object.entries(value.answers)) {
      if (typeof answerId !== "string") {
        continue;
      }
      const question = questions[questionId];
      if (!question) {
        continue;
      }
      const isKnownAnswer = question.options.some((option) => option.id === answerId);
      if (isKnownAnswer) {
        safeAnswers[questionId] = answerId;
      }
    }
  }

  let safeOutcome: DiagnosticOutcome | null = null;
  if (value.outcome && typeof value.outcome === "object") {
    const candidate = value.outcome as DiagnosticOutcome;
    if (
      typeof candidate.serviceId === "string" &&
      (candidate.urgency === "critical" ||
        candidate.urgency === "high" ||
        candidate.urgency === "medium" ||
        candidate.urgency === "low") &&
      typeof candidate.title === "string" &&
      typeof candidate.description === "string" &&
      typeof candidate.estimatedTimeframe === "string" &&
      Array.isArray(candidate.nextSteps)
    ) {
      safeOutcome = {
        ...candidate,
        nextSteps: candidate.nextSteps.filter((step): step is string => typeof step === "string"),
      };
    }
  }

  return {
    answers: safeAnswers,
    history: safeHistory,
    currentQuestionId: safeCurrentQuestionId,
    outcome: safeOutcome,
  };
}

export default function V21Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<WizardState>(() => createInitialState());
  const [displayQuestionId, setDisplayQuestionId] = useState(FIRST_QUESTION_ID);
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "backward">("forward");
  const [isHydrated, setIsHydrated] = useState(false);
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
    if (process.env.NODE_ENV === "production") {
      return;
    }
    validateDiagnosticFlow();
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setIsHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      const safeState = sanitizeState(parsed);
      setState(safeState);
      setDisplayQuestionId(safeState.currentQuestionId);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isHydrated, state]);

  useEffect(() => {
    return () => clearTransitionTimers();
  }, [clearTransitionTimers]);

  const displayedQuestion = useMemo(() => {
    return questions[displayQuestionId] ?? questions[state.currentQuestionId] ?? questions[FIRST_QUESTION_ID];
  }, [displayQuestionId, state.currentQuestionId]);

  const transitionToQuestion = useCallback(
    (nextQuestionId: string, direction: "forward" | "backward") => {
      clearTransitionTimers();
      setTransitionDirection(direction);
      setTransitionPhase("exiting");

      exitTimerRef.current = window.setTimeout(() => {
        setDisplayQuestionId(nextQuestionId);
        setTransitionPhase("entering");

        enterTimerRef.current = window.setTimeout(() => {
          setTransitionPhase("idle");
        }, ENTER_DURATION_MS);
      }, EXIT_DURATION_MS);
    },
    [clearTransitionTimers],
  );

  const handleAnswer = useCallback(
    (optionId: string) => {
      if (transitionPhase !== "idle") {
        return;
      }

      const currentQuestion = questions[state.currentQuestionId];
      if (!currentQuestion) {
        return;
      }

      const selectedOption = currentQuestion.options.find((option) => option.id === optionId);
      if (!selectedOption) {
        return;
      }

      const nextAnswers = { ...state.answers, [state.currentQuestionId]: optionId };

      if ("terminal" in selectedOption && selectedOption.terminal) {
        setState((previous) => ({
          ...previous,
          answers: nextAnswers,
          outcome: selectedOption.terminal,
        }));
        return;
      }

      if ("nextQuestion" in selectedOption && selectedOption.nextQuestion) {
        const nextQuestionId = selectedOption.nextQuestion;
        transitionToQuestion(nextQuestionId, "forward");
        setState((previous) => ({
          ...previous,
          answers: nextAnswers,
          currentQuestionId: nextQuestionId,
          history: [...previous.history, nextQuestionId],
          outcome: null,
        }));
      }
    },
    [state.answers, state.currentQuestionId, transitionPhase, transitionToQuestion],
  );

  const handleBack = useCallback(() => {
    if (transitionPhase !== "idle" || state.history.length <= 1) {
      return;
    }

    const newHistory = state.history.slice(0, -1);
    const newCurrentId = newHistory[newHistory.length - 1];
    const nextAnswers = { ...state.answers };
    delete nextAnswers[state.currentQuestionId];

    transitionToQuestion(newCurrentId, "backward");

    setState((previous) => ({
      ...previous,
      answers: nextAnswers,
      history: newHistory,
      currentQuestionId: newCurrentId,
      outcome: null,
    }));
  }, [state.answers, state.currentQuestionId, state.history, transitionPhase, transitionToQuestion]);

  const handleRestart = useCallback(() => {
    clearTransitionTimers();
    setTransitionPhase("idle");
    setTransitionDirection("forward");
    setDisplayQuestionId(FIRST_QUESTION_ID);
    setState(createInitialState());
    sessionStorage.removeItem(STORAGE_KEY);
  }, [clearTransitionTimers]);

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} v21-page`}>
          <WizardHeader
            history={state.history}
            currentQuestionId={state.currentQuestionId}
            hasOutcome={Boolean(state.outcome)}
          />

          <section className="v21-main-shell">
            {state.outcome ? (
              <DiagnosticResult
                answers={state.answers}
                history={state.history}
                outcome={state.outcome}
                onRestart={handleRestart}
              />
            ) : (
              <div
                key={displayQuestionId}
                className={`v21-question-motion is-${transitionPhase} is-${transitionDirection}`}
              >
                <QuestionCard
                  question={displayedQuestion}
                  selectedOptionId={state.answers[displayedQuestion.id]}
                  onAnswer={handleAnswer}
                  onBack={handleBack}
                  canGoBack={state.history.length > 1}
                  disabled={transitionPhase !== "idle"}
                />
              </div>
            )}
          </section>

          <ExplanationTriggerButton versionId="v21" />
        </main>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#3B82F6"
        thumbHoverColor="#2563EB"
      />
    </>
  );
}

