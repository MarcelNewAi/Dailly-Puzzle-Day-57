"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { DM_Sans, Inter, JetBrains_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import ThemeControls from "./components/ThemeControls";
import ThemeHeader from "./components/ThemeHeader";
import LivePreview from "./components/LivePreview";

export interface ThemeSettings {
  mode: "light" | "dark";
  accentColor: string;
  borderRadius: number;
  fontSize: number;
  fontFamily: string;
  spacing: number;
  animationSpeed: "off" | "normal" | "fast";
}

type FontOption = {
  label: string;
  value: string;
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const STORAGE_KEY = "v8_theme_settings";

const FONT_OPTIONS: FontOption[] = [
  { label: "DM Sans", value: "var(--font-dm-sans), sans-serif" },
  { label: "Inter", value: "var(--font-inter), sans-serif" },
  { label: "Playfair Display", value: "var(--font-playfair), serif" },
  { label: "JetBrains Mono", value: "var(--font-jetbrains), monospace" },
  { label: "Space Grotesk", value: "var(--font-space-grotesk), sans-serif" },
];

const ACCENT_PRESETS = ["#06B6D4", "#8B5CF6", "#EC4899", "#EF4444", "#10B981", "#F59E0B"];

const DEFAULT_THEME: ThemeSettings = {
  mode: "light",
  accentColor: "#10B981",
  borderRadius: 12,
  fontSize: 16,
  fontFamily: "var(--font-dm-sans), sans-serif",
  spacing: 1,
  animationSpeed: "normal",
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeHex(value: string): string {
  const trimmed = value.trim();
  const sixDigit = /^#([a-fA-F0-9]{6})$/;
  const threeDigit = /^#([a-fA-F0-9]{3})$/;

  if (sixDigit.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const threeMatch = trimmed.match(threeDigit);
  if (threeMatch) {
    const [r, g, b] = threeMatch[1].split("");
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  return DEFAULT_THEME.accentColor;
}

function darkenColor(hex: string, percent: number): string {
  const cleanHex = normalizeHex(hex).replace("#", "");
  const amount = clamp(percent, 0, 100) / 100;
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  const nextR = Math.round(r * (1 - amount));
  const nextG = Math.round(g * (1 - amount));
  const nextB = Math.round(b * (1 - amount));

  return `#${nextR.toString(16).padStart(2, "0")}${nextG.toString(16).padStart(2, "0")}${nextB
    .toString(16)
    .padStart(2, "0")}`.toUpperCase();
}

function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = normalizeHex(hex).replace("#", "");
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function isMode(value: unknown): value is ThemeSettings["mode"] {
  return value === "light" || value === "dark";
}

function isAnimationSpeed(value: unknown): value is ThemeSettings["animationSpeed"] {
  return value === "off" || value === "normal" || value === "fast";
}

function isValidFontFamily(value: unknown): value is string {
  return typeof value === "string" && FONT_OPTIONS.some((option) => option.value === value);
}

function sanitizeTheme(input: unknown): ThemeSettings {
  if (typeof input !== "object" || input === null) {
    return DEFAULT_THEME;
  }

  const candidate = input as Partial<ThemeSettings>;
  return {
    mode: isMode(candidate.mode) ? candidate.mode : DEFAULT_THEME.mode,
    accentColor: typeof candidate.accentColor === "string" ? normalizeHex(candidate.accentColor) : DEFAULT_THEME.accentColor,
    borderRadius:
      typeof candidate.borderRadius === "number"
        ? clamp(Math.round(candidate.borderRadius), 0, 24)
        : DEFAULT_THEME.borderRadius,
    fontSize: typeof candidate.fontSize === "number" ? clamp(Math.round(candidate.fontSize), 12, 20) : DEFAULT_THEME.fontSize,
    fontFamily: isValidFontFamily(candidate.fontFamily) ? candidate.fontFamily : DEFAULT_THEME.fontFamily,
    spacing: typeof candidate.spacing === "number" ? clamp(Number(candidate.spacing.toFixed(2)), 0.75, 1.5) : DEFAULT_THEME.spacing,
    animationSpeed: isAnimationSpeed(candidate.animationSpeed) ? candidate.animationSpeed : DEFAULT_THEME.animationSpeed,
  };
}

function readInitialTheme(): ThemeSettings {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return DEFAULT_THEME;
  }

  try {
    return sanitizeTheme(JSON.parse(saved));
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_THEME;
  }
}

export default function V8Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME);
  const [isThemeHydrated, setIsThemeHydrated] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [showResetToast, setShowResetToast] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setTheme(readInitialTheme());
    setIsThemeHydrated(true);
  }, []);

  useEffect(() => {
    if (!isThemeHydrated) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }, [isThemeHydrated, theme]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const themeVars = useMemo(() => {
    const accentLight = hexToRgba(theme.accentColor, 0.12);
    const animationDuration =
      theme.animationSpeed === "off" ? "0ms" : theme.animationSpeed === "fast" ? "100ms" : "250ms";

    return {
      "--v8-accent": theme.accentColor,
      "--v8-accent-light": accentLight,
      "--v8-accent-hover": darkenColor(theme.accentColor, 10),
      "--v8-radius": `${theme.borderRadius}px`,
      "--v8-font-size": `${theme.fontSize}px`,
      "--v8-font-family": theme.fontFamily,
      "--v8-spacing": `${theme.spacing}`,
      "--v8-animation-duration": animationDuration,
      "--v8-bg-primary": theme.mode === "light" ? "#FFFFFF" : "#0A0A0F",
      "--v8-bg-secondary": theme.mode === "light" ? "#F8F9FA" : "#141419",
      "--v8-bg-card": theme.mode === "light" ? "#FFFFFF" : "#1A1A22",
      "--v8-border": theme.mode === "light" ? "#E5E7EB" : "#2A2A35",
      "--v8-text-primary": theme.mode === "light" ? "#111111" : "#F5F5F5",
      "--v8-text-secondary": theme.mode === "light" ? "#6B7280" : "#9CA3AF",
      "--v8-text-muted": theme.mode === "light" ? "#9CA3AF" : "#6B7280",
      "--v8-shadow": theme.mode === "light" ? "0 1px 3px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.4)",
      "--v8-on-accent": "#FFFFFF",
      "--v8-success": "#10B981",
      "--v8-success-soft": hexToRgba("#10B981", 0.15),
      "--v8-warning": "#F59E0B",
      "--v8-warning-soft": hexToRgba("#F59E0B", 0.15),
    } as CSSProperties;
  }, [theme]);

  const handleReset = () => {
    setTheme(DEFAULT_THEME);
    setShowResetToast(true);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setShowResetToast(false);
    }, 1800);
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${dmSans.variable} ${inter.variable} ${playfair.variable} ${jetbrains.variable} ${spaceGrotesk.variable} v8-page`} style={themeVars}>
          <ThemeHeader />

          <div className="v8-main-shell">
            <div className="v8-mobile-toggle-wrap">
              <button
                type="button"
                className="v8-mobile-controls-toggle"
                onClick={() => setIsControlsOpen((open) => !open)}
                aria-expanded={isControlsOpen}
                aria-controls="v8-controls-panel"
              >
                {isControlsOpen ? "Hide Controls" : "Show Controls"}
              </button>
            </div>

            <div className="v8-main-grid" data-controls-open={isControlsOpen ? "true" : "false"}>
              <ThemeControls
                mode={theme.mode}
                accentColor={theme.accentColor}
                borderRadius={theme.borderRadius}
                fontSize={theme.fontSize}
                fontFamily={theme.fontFamily}
                spacing={theme.spacing}
                animationSpeed={theme.animationSpeed}
                accentPresets={ACCENT_PRESETS}
                fontOptions={FONT_OPTIONS}
                onModeChange={(mode) => setTheme((current) => ({ ...current, mode }))}
                onAccentColorChange={(accentColor) => setTheme((current) => ({ ...current, accentColor: normalizeHex(accentColor) }))}
                onBorderRadiusChange={(borderRadius) => setTheme((current) => ({ ...current, borderRadius }))}
                onFontSizeChange={(fontSize) => setTheme((current) => ({ ...current, fontSize }))}
                onFontFamilyChange={(fontFamily) => setTheme((current) => ({ ...current, fontFamily }))}
                onSpacingChange={(spacing) => setTheme((current) => ({ ...current, spacing }))}
                onAnimationSpeedChange={(animationSpeed) => setTheme((current) => ({ ...current, animationSpeed }))}
                onReset={handleReset}
              />
              <LivePreview />
            </div>
          </div>

          {!isControlsOpen ? (
            <button
              type="button"
              className="v8-mobile-fab"
              onClick={() => setIsControlsOpen(true)}
              aria-label="Show controls panel"
            >
              🎨
            </button>
          ) : null}

          <p className={`v8-reset-toast${showResetToast ? " is-visible" : ""}`} role="status" aria-live="polite">
            Theme reset to defaults ✅
          </p>

          <ExplanationTriggerButton versionId="v8" />
        </main>
      </div>
      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor={theme.accentColor}
        thumbHoverColor={darkenColor(theme.accentColor, 10)}
      />
    </>
  );
}
