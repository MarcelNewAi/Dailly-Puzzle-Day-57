"use client";

import { FormEvent, useCallback, useEffect, useId, useRef, useState } from "react";

type DismissReason = "closed" | "submitted";

interface ExitIntentModalProps {
  isOpen: boolean;
  onDismiss: (reason: DismissReason) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
  );
}

export default function ExitIntentModal({ isOpen, onDismiss }: ExitIntentModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const titleId = useId();
  const descId = useId();

  const requestClose = useCallback(
    (reason: DismissReason) => {
      setEmail("");
      setError("");
      setIsSubmitting(false);
      setIsSuccess(false);
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
      }
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
      onDismiss(reason);
    },
    [onDismiss],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose("closed");
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const modal = modalRef.current;
      if (!modal) {
        return;
      }

      const focusable = getFocusableElements(modal);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, requestClose]);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
      }
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || isSuccess) {
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
    }
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }

    submitTimerRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      autoCloseTimerRef.current = setTimeout(() => {
        requestClose("submitted");
      }, 3000);
    }, 200);
  };

  return (
    <div
      className={`v11-modal-backdrop${isOpen ? " is-open" : " is-closed"}`}
      onClick={(event) => {
        if (isOpen && event.target === event.currentTarget) {
          requestClose("closed");
        }
      }}
      aria-hidden={isOpen ? "false" : "true"}
    >
      <div
        ref={modalRef}
        className={`v11-modal${isOpen ? " is-open" : " is-closed"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <button className="v11-modal-close" type="button" onClick={() => requestClose("closed")} aria-label="Close modal">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m18.3 7.1-1.4-1.4-4.9 4.9-4.9-4.9-1.4 1.4 4.9 4.9-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9 4.9-4.9Z" />
          </svg>
        </button>

        <div className="v11-modal-decoration" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <path d="M34 8 17 30l12 1-5 25 23-29-12-1 6-18h-7Z" />
            <circle cx="49" cy="14" r="3" />
            <circle cx="16" cy="15" r="2.5" />
          </svg>
        </div>

        <h2 id={titleId}>Wait! Don&apos;t Leave Empty-Handed</h2>
        <p id={descId} className="v11-modal-subtitle">
          Get our exclusive guide and unlock 15% off your first month.
        </p>

        {!isSuccess ? (
          <form className="v11-lead-form" onSubmit={handleSubmit} noValidate>
            <label className="v11-sr-only" htmlFor="v11-email-input">
              Email address
            </label>
            <input
              id="v11-email-input"
              ref={inputRef}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "v11-email-error" : undefined}
            />
            {error ? (
              <p id="v11-email-error" className="v11-modal-error" role="alert">
                {error}
              </p>
            ) : null}

            <button className="v11-submit-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="v11-btn-loading" aria-hidden="true">
                  <span />
                </span>
              ) : null}
              {isSubmitting ? "Claiming..." : "Claim My Discount"}
            </button>

            <div className="v11-trust-row" aria-label="Trust guarantees">
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9.3 16.2-3.5-3.5 1.4-1.4 2.1 2.1 6-6 1.4 1.4-7.4 7.4Z" />
                </svg>
                No spam, ever
              </span>
              <span>Unsubscribe anytime</span>
              <span>10,000+ subscribers</span>
            </div>

            <button className="v11-dismiss-link" type="button" onClick={() => requestClose("closed")}>
              No thanks, I&apos;ll pass
            </button>
          </form>
        ) : (
          <div className="v11-success-state" role="status" aria-live="polite">
            <svg className="v11-success-check" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="30" />
              <path className="v11-success-check-path" d="m18 33 10 10 18-20" />
            </svg>
            <h3>You&apos;re In!</h3>
            <p>Check your inbox for your discount code.</p>
            <button className="v11-submit-btn" type="button" onClick={() => requestClose("submitted")}>
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
