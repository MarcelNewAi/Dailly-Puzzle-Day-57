"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type RegisteredCommand = {
  id: string;
  action: () => void;
};

type ToastState = {
  message: string;
  isVisible: boolean;
} | null;

type ExecuteOptions = {
  closePalette?: boolean;
};

type CommandPaletteContextValue = {
  isOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  registerCommands: (commands: RegisteredCommand[]) => void;
  executeCommand: (id: string, options?: ExecuteOptions) => void;
  showToast: (message: string) => void;
  toast: ToastState;
  isMac: boolean;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState<ToastState>(null);

  const commandMapRef = useRef<Map<string, () => void>>(new Map());
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const toastFadeRef = useRef<number | null>(null);
  const toastClearRef = useRef<number | null>(null);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform);

  const registerCommands = useCallback((commands: RegisteredCommand[]) => {
    const nextMap = new Map<string, () => void>();
    commands.forEach((command) => {
      nextMap.set(command.id, command.action);
    });
    commandMapRef.current = nextMap;
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);

    const previousFocus = previousFocusRef.current;
    if (previousFocus && document.contains(previousFocus)) {
      window.setTimeout(() => {
        previousFocus.focus();
      }, 0);
    }
  }, []);

  const openPalette = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    } else {
      previousFocusRef.current = null;
    }
    setIsOpen(true);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const executeCommand = useCallback(
    (id: string, options?: ExecuteOptions) => {
      const command = commandMapRef.current.get(id);
      if (!command) {
        return;
      }

      command();
      if (options?.closePalette ?? true) {
        closePalette();
      }
    },
    [closePalette],
  );

  const showToast = useCallback((message: string) => {
    if (toastFadeRef.current !== null) {
      window.clearTimeout(toastFadeRef.current);
    }
    if (toastClearRef.current !== null) {
      window.clearTimeout(toastClearRef.current);
    }

    setToast({ message, isVisible: true });

    toastFadeRef.current = window.setTimeout(() => {
      setToast((currentToast) => (currentToast ? { ...currentToast, isVisible: false } : currentToast));
    }, 1800);

    toastClearRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isModifierPressed = event.ctrlKey || event.metaKey;

      if (isModifierPressed && key === "k") {
        event.preventDefault();
        openPalette();
        return;
      }

      if (isModifierPressed && key === "r") {
        event.preventDefault();
        executeCommand("reset-layout", { closePalette: false });
        return;
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        closePalette();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [closePalette, executeCommand, isOpen, openPalette]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (toastFadeRef.current !== null) {
        window.clearTimeout(toastFadeRef.current);
      }
      if (toastClearRef.current !== null) {
        window.clearTimeout(toastClearRef.current);
      }
    };
  }, []);

  const value = useMemo<CommandPaletteContextValue>(
    () => ({
      isOpen,
      openPalette,
      closePalette,
      query,
      setQuery,
      activeIndex,
      setActiveIndex,
      registerCommands,
      executeCommand,
      showToast,
      toast,
      isMac,
    }),
    [activeIndex, closePalette, executeCommand, isOpen, openPalette, query, registerCommands, showToast, toast, isMac],
  );

  return <CommandPaletteContext.Provider value={value}>{children}</CommandPaletteContext.Provider>;
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  }
  return context;
}




