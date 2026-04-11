"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import { componentExplanations } from "@/data/componentExplanations";

interface ComponentExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  versionId: string;
}

const CLOSE_DURATION_MS = 200;

function resolveVersionHref(versionId: string): string {
  return versionId === "v1" ? "/" : `/${versionId}`;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter((element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      return false;
    }
    return !element.hasAttribute("disabled");
  });
}

function NotepadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m5 13 4 4L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 9 9 3h6l6 6-9 12L3 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ComponentExplanationModal({
  isOpen,
  onClose,
  versionId,
}: ComponentExplanationModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const titleId = useId();
  const purposeId = useId();

  const explanation = useMemo(() => {
    return componentExplanations[versionId] ?? componentExplanations.v1;
  }, [versionId]);

  const cleanupCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      cleanupCloseTimer();
      const frameId = window.requestAnimationFrame(() => {
        setShouldRender(true);
        setIsClosing(false);
        closeButtonRef.current?.focus();
      });
      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    if (!shouldRender) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setIsClosing(true);
      closeTimerRef.current = window.setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
        const previous = previousFocusRef.current;
        if (previous && document.contains(previous)) {
          previous.focus();
        }
      }, CLOSE_DURATION_MS);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      cleanupCloseTimer();
    };
  }, [cleanupCloseTimer, isOpen, shouldRender]);

  useEffect(() => {
    return () => cleanupCloseTimer();
  }, [cleanupCloseTimer]);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;
      if (!panel) {
        return;
      }

      const focusable = getFocusableElements(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) {
    return null;
  }

  const targetHref = resolveVersionHref(explanation.id);
  const animationClass = isClosing ? "is-closing" : "is-open";

  return (
    <div
      className={`v-explanation-modal-backdrop ${animationClass}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      aria-hidden={isOpen ? "false" : "true"}
    >
      <div className="relative">
        <div
          ref={panelRef}
          className={`v-explanation-modal hide-native-scrollbar ${animationClass}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={purposeId}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="v-explanation-close"
            onClick={onClose}
            aria-label="Close component explanation"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m18.3 7.1-1.4-1.4-4.9 4.9-4.9-4.9-1.4 1.4 4.9 4.9-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9 4.9-4.9Z" />
            </svg>
          </button>

          <header className="v-explanation-head v-explanation-section-0">
            <div className="v-explanation-badges">
              <span className="v-explanation-version-pill">{explanation.version}</span>
              <p className="v-explanation-label">COMPONENT EXPLANATION</p>
            </div>
            <h2 id={titleId}>{explanation.title}</h2>
            <p className="v-explanation-tagline">{explanation.tagline}</p>
          </header>

          <hr className="v-explanation-divider" />

          <section className="v-explanation-section v-explanation-section-1">
            <h3>PURPOSE</h3>
            <p id={purposeId}>{explanation.purpose}</p>
          </section>

          <section className="v-explanation-section v-explanation-section-2">
            <h3>KEY FEATURES</h3>
            <ul className="v-explanation-list v-explanation-list-features">
              {explanation.features.map((item) => (
                <li key={item}>
                  <span className="v-explanation-list-icon">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="v-explanation-section v-explanation-section-3">
            <h3>DESIGN NOTES</h3>
            <ul className="v-explanation-list v-explanation-list-notes">
              {explanation.designNotes.map((item) => (
                <li key={item}>
                  <span className="v-explanation-list-icon">
                    <DiamondIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="v-explanation-section v-explanation-section-4">
            <h3>TECH &amp; APPROACH</h3>
            <div className="v-explanation-tech-wrap">
              {explanation.techUsed.map((tech) => (
                <span key={tech} className="v-explanation-tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="v-explanation-section v-explanation-section-5">
            <h3>WHEN TO USE IT</h3>
            <p>{explanation.whenToUse}</p>
          </section>

          <footer className="v-explanation-footer">
            <button
              type="button"
              className="v-explanation-btn v-explanation-btn-primary"
              onClick={() => {
                onClose();
                if (pathname !== targetHref) {
                  router.push(targetHref);
                }
              }}
              aria-label={`View ${explanation.version} live component`}
            >
              <NotepadIcon />
              <span>View Live Component</span>
            </button>
            <button type="button" className="v-explanation-btn v-explanation-btn-outline" onClick={onClose}>
              Close
            </button>
          </footer>
        </div>
        <CustomScrollbar
          scrollContainerRef={panelRef}
          variant="card"
          thumbColor={explanation.accentColor ?? "#10B981"}
          thumbHoverColor={explanation.accentColor ?? "#10B981"}
          className={animationClass === "is-closing" ? "opacity-0" : ""}
        />
      </div>
    </div>
  );
}
