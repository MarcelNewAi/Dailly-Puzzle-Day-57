"use client";

import { forwardRef, useEffect, useId, useRef, useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  hasError?: boolean;
  onChange: (value: string) => void;
}

const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(function CustomSelect(
  { id, value, placeholder, options, hasError = false, onChange },
  ref,
) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current) {
        return;
      }
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} className={`v15-custom-select ${isOpen ? "is-open" : ""}`}>
      <button
        ref={ref}
        id={id}
        type="button"
        className={`v15-input v15-select-trigger ${hasError ? "has-error" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <span className={`v15-select-value ${selected ? "is-selected" : ""}`}>{selected?.label ?? placeholder}</span>
        <svg className="v15-select-chevron" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M5.2 7.8 10 12.5l4.8-4.7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <div className="v15-select-menu-wrap" aria-hidden={!isOpen}>
        <ul id={listboxId} role="listbox" className="v15-select-menu">
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`v15-select-option ${active ? "is-active" : ""}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {active ? (
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path
                        d="m4.5 10 3.1 3.1L15.5 5.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});

export default CustomSelect;
