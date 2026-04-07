"use client";

import { useEffect, useMemo, useRef, type KeyboardEvent } from "react";
import { useCommandPalette } from "./CommandPaletteProvider";
import { useCommands, type Command, type CommandActionHandlers } from "./useCommands";

type CommandPaletteProps = {
  actions: CommandActionHandlers;
};

const CATEGORY_ORDER = ["Builder", "Navigation", "View", "Data"];

function CommandIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "reset":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4a8 8 0 1 1-7.7 10.2h2.1A6 6 0 1 0 8 7.7V11H2V5h2.3v1.4A9.9 9.9 0 0 1 12 4Z" />
        </svg>
      );
    case "up":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 5 7 7-1.4 1.4-4.6-4.6V19h-2V8.8l-4.6 4.6L5 12l7-7Z" />
        </svg>
      );
    case "down":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 19-7-7 1.4-1.4 4.6 4.6V5h2v10.2l4.6-4.6L19 12l-7 7Z" />
        </svg>
      );
    case "shuffle":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17 3h4v4h-2V6.4l-4.4 4.4-1.4-1.4L17.6 5H17V3Zm2 14h2v4h-4v-2h.6l-3.3-3.3 1.4-1.4L19 17.6V17ZM3 6h5.6l9.8 9.8-1.4 1.4L7.8 8H3V6Zm0 10v-2h4l2 2H3Z" />
        </svg>
      );
    case "reverse":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m7 7 5-5v3h7v4h-7v3L7 7Zm10 10-5 5v-3H5v-4h7v-3l5 5Z" />
        </svg>
      );
    case "scroll-top":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16v2H4V4Zm8 3 6 6-1.4 1.4-3.6-3.6V20h-2v-9.2l-3.6 3.6L6 13l6-6Z" />
        </svg>
      );
    case "scroll-bottom":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 18h16v2H4v-2Zm8-14h2v9.2l3.6-3.6L19 11l-6 6-6-6 1.4-1.4 3.6 3.6V4Z" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 2 11h3v9h6v-6h2v6h6v-9h3L12 3Z" />
        </svg>
      );
    case "gallery":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16v16H4V4Zm2 2v8.5l2.8-2.8 2.5 2.5 4.2-4.2L18 12.5V6H6Zm0 11v1h12v-1l-2.5-2.5-4.2 4.2-2.5-2.5L6 17Z" />
        </svg>
      );
    case "sidebar":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 4h18v16H3V4Zm2 2v12h5V6H5Zm7 0v12h7V6h-7Z" />
        </svg>
      );
    case "theme":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 9 9c0-.3 0-.7-.1-1A7 7 0 1 1 13 3.1c-.3-.1-.7-.1-1-.1Z" />
        </svg>
      );
    case "export":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 7 8h3v6h4V8h3l-5-5Zm-7 12h2v4h10v-4h2v6H5v-6Z" />
        </svg>
      );
    case "clear":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 3h6l1 2h5v2H3V5h5l1-2Zm1 6h2v8h-2V9Zm4 0h2v8h-2V9ZM7 9h2v8H7V9Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z" />
        </svg>
      );
  }
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.5 3a7.5 7.5 0 0 1 6 12l4 4-1.4 1.4-4-4a7.5 7.5 0 1 1-4.6-13.4Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z" />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v8h18V8H3Zm2 2h2v2H5v-2Zm3 0h2v2H8v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2ZM5 13h6v2H5v-2Zm7 0h7v2h-7v-2Z" />
    </svg>
  );
}

function ToastIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1 14-4-4 1.4-1.4 2.6 2.6 4.6-4.6L17 10l-6 6Z" />
    </svg>
  );
}

export default function CommandPalette({ actions }: CommandPaletteProps) {
  const {
    isOpen,
    openPalette,
    closePalette,
    query,
    setQuery,
    activeIndex,
    setActiveIndex,
    registerCommands,
    executeCommand,
    toast,
    isMac,
  } = useCommandPalette();

  const commands = useCommands(actions);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    registerCommands(commands.map((command) => ({ id: command.id, action: command.action })));
  }, [commands, registerCommands]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isOpen]);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleCommands = useMemo(() => {
    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) => {
      const searchTargets = [command.name, command.description, ...command.keywords];
      return searchTargets.some((target) => target.toLowerCase().includes(normalizedQuery));
    });
  }, [commands, normalizedQuery]);

  const commandIndexById = useMemo(
    () => new Map(visibleCommands.map((command, index) => [command.id, index])),
    [visibleCommands],
  );

  const groupedCommands = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        commands: commands.filter((command) => command.category === category),
      })).filter((group) => group.commands.length > 0),
    [commands],
  );

  const resolvedActiveIndex = visibleCommands.length === 0 ? 0 : Math.min(activeIndex, visibleCommands.length - 1);

  const moveSelection = (direction: -1 | 1) => {
    if (visibleCommands.length === 0) {
      return;
    }

    setActiveIndex((previousIndex) => {
      const boundedIndex = Math.min(previousIndex, visibleCommands.length - 1);
      const nextIndex = boundedIndex + direction;
      if (nextIndex < 0) {
        return visibleCommands.length - 1;
      }
      if (nextIndex >= visibleCommands.length) {
        return 0;
      }
      return nextIndex;
    });

    inputRef.current?.focus();
  };

  const executeActiveCommand = () => {
    const selectedCommand = visibleCommands[resolvedActiveIndex];
    if (!selectedCommand) {
      return;
    }

    executeCommand(selectedCommand.id);
  };

  const trapTabFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.offsetParent !== null);

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (activeElement === firstElement || !container.contains(activeElement)) {
        event.preventDefault();
        lastElement.focus();
      }
      return;
    }

    if (activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleModalKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveSelection(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveSelection(-1);
      return;
    }

    if (event.key === "Tab") {
      trapTabFocus(event);
      return;
    }

    if (event.key === "Enter" && !(event.target instanceof HTMLButtonElement)) {
      event.preventDefault();
      executeActiveCommand();
    }
  };

  const renderCommandItem = (command: Command, index: number) => {
    const isActive = index === resolvedActiveIndex;

    return (
      <button
        key={command.id}
        type="button"
        role="option"
        id={`v7-cmd-option-${command.id}`}
        className={`v7-cmd-item ${isActive ? "is-active" : ""}`}
        aria-selected={isActive}
        onMouseEnter={() => {
          setActiveIndex(index);
        }}
        onClick={() => {
          executeCommand(command.id);
        }}
      >
        <span className="v7-cmd-item-icon" aria-hidden="true">
          <CommandIcon icon={command.icon} />
        </span>

        <span className="v7-cmd-item-main">
          <span className="v7-cmd-item-name">{command.name}</span>
          <span className="v7-cmd-item-description">{command.description}</span>
        </span>

        {command.shortcut ? <span className="v7-cmd-item-shortcut">{command.shortcut}</span> : null}
      </button>
    );
  };

  return (
    <>
      <button
        type="button"
        className="v7-cmd-trigger"
        onClick={openPalette}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open command palette"
      >
        <span className="v7-cmd-trigger-icon" aria-hidden="true">
          <KeyboardIcon />
        </span>
        <span>{isMac ? "Cmd+K" : "Ctrl+K"}</span>
      </button>

      <div
        className={`v7-cmd-backdrop ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
        onMouseDown={(event) => {
          if (isOpen && event.target === event.currentTarget) {
            closePalette();
          }
        }}
      >
        <div
          className="v7-cmd-modal"
          role="dialog"
          aria-modal="true"
          aria-hidden={!isOpen}
          aria-label="Command palette"
          onKeyDown={handleModalKeyDown}
        >
          <div className="v7-cmd-search-shell">
            <span className="v7-cmd-search-icon" aria-hidden="true">
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              className="v7-cmd-search-input"
              placeholder="Type a command..."
              aria-label="Search commands"
              aria-autocomplete="list"
              aria-controls="v7-cmd-options"
            />
            <span className="v7-cmd-esc">ESC</span>
          </div>

          <div
            id="v7-cmd-options"
            className="v7-cmd-list"
            role="listbox"
            aria-activedescendant={
              visibleCommands[resolvedActiveIndex]
                ? `v7-cmd-option-${visibleCommands[resolvedActiveIndex].id}`
                : undefined
            }
          >
            {visibleCommands.length === 0 ? (
              <p className="v7-cmd-empty">{`No commands found for "${query}"`}</p>
            ) : normalizedQuery ? (
              visibleCommands.map((command, index) => renderCommandItem(command, index))
            ) : (
              groupedCommands.map((group) => (
                <div key={group.category} className="v7-cmd-group">
                  <p className="v7-cmd-group-label">{group.category.toUpperCase()}</p>
                  {group.commands.map((command) => {
                    const index = commandIndexById.get(command.id);
                    if (index === undefined) {
                      return null;
                    }
                    return renderCommandItem(command, index);
                  })}
                </div>
              ))
            )}
          </div>

          <footer className="v7-cmd-footer">Up/Down Navigate | Enter Execute | Esc Close</footer>
        </div>
      </div>

      {toast ? (
        <div className="v7-cmd-toast-wrap" aria-live="polite">
          <div className={`v7-cmd-toast ${toast.isVisible ? "is-visible" : "is-hiding"}`}>
            <span className="v7-cmd-toast-icon" aria-hidden="true">
              <ToastIcon />
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
