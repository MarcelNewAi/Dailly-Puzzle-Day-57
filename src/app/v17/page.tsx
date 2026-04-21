"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type Dispatch, type SetStateAction } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import ControlBar from "./components/ControlBar";
import LivePreview from "./components/LivePreview";
import PreviewToggle from "./components/PreviewToggle";
import type {
  ButtonStyle,
  DesignMode,
  DesignState,
  FontName,
  PresetKey,
  PresetName,
  ShadowIntensity,
} from "./types";

const STORAGE_KEY = "v17_design_state";

const DISPLAY_FONTS: FontName[] = [
  "Syne",
  "Space Grotesk",
  "Fraunces",
  "Instrument Serif",
  "Orbitron",
  "Playfair Display",
  "Bebas Neue",
  "Archivo",
];

const BODY_FONTS: FontName[] = [
  "Inter",
  "JetBrains Mono",
  "DM Sans",
  "Outfit",
  "IBM Plex Sans",
  "Lora",
  "Manrope",
  "Space Mono",
];

const FONT_OPTIONS: FontName[] = [...DISPLAY_FONTS, ...BODY_FONTS];

const shadowMap: Record<ShadowIntensity, string> = {
  none: "none",
  subtle: "0 1px 3px rgba(0,0,0,0.1)",
  medium: "0 10px 30px rgba(0,0,0,0.15)",
  dramatic: "0 25px 60px rgba(0,0,0,0.3)",
};

const DEFAULT: DesignState = {
  mode: "dark",
  preset: "editorial",
  bgColor: "#0A0A0A",
  accentColor: "#F59E0B",
  textColor: "#FAFAFA",
  fontDisplay: "Syne",
  fontBody: "Inter",
  fontSize: 16,
  borderRadius: 12,
  buttonStyle: "solid",
  shadowIntensity: "subtle",
  scrollbarWidth: 9,
};

const MODE_DEFAULTS: Record<DesignMode, Pick<DesignState, "bgColor" | "textColor">> = {
  dark: { bgColor: "#0A0A0A", textColor: "#FAFAFA" },
  light: { bgColor: "#F8FAFC", textColor: "#0F172A" },
};

const presets: Record<PresetKey, Omit<DesignState, "preset" | "fontSize" | "scrollbarWidth">> = {
  brutalist: {
    mode: "light",
    bgColor: "#FFFFFF",
    accentColor: "#000000",
    textColor: "#000000",
    fontDisplay: "Space Grotesk",
    fontBody: "JetBrains Mono",
    borderRadius: 0,
    buttonStyle: "solid",
    shadowIntensity: "dramatic",
  },
  glass: {
    mode: "dark",
    bgColor: "#0F172A",
    accentColor: "#06B6D4",
    textColor: "#F0F9FF",
    fontDisplay: "Outfit",
    fontBody: "Inter",
    borderRadius: 20,
    buttonStyle: "outline",
    shadowIntensity: "medium",
  },
  editorial: {
    mode: "dark",
    bgColor: "#0A0A0A",
    accentColor: "#F59E0B",
    textColor: "#FAFAFA",
    fontDisplay: "Syne",
    fontBody: "Inter",
    borderRadius: 8,
    buttonStyle: "solid",
    shadowIntensity: "subtle",
  },
  cyberpunk: {
    mode: "dark",
    bgColor: "#0B0F1A",
    accentColor: "#00F0FF",
    textColor: "#F0FDFF",
    fontDisplay: "Orbitron",
    fontBody: "Space Grotesk",
    borderRadius: 2,
    buttonStyle: "gradient",
    shadowIntensity: "dramatic",
  },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeHex(input: string): string {
  const value = input.trim();
  const sixDigit = /^#([a-fA-F0-9]{6})$/;
  const threeDigit = /^#([a-fA-F0-9]{3})$/;
  if (sixDigit.test(value)) {
    return value.toUpperCase();
  }
  const match = value.match(threeDigit);
  if (match) {
    const [r, g, b] = match[1].split("");
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return "#000000";
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const safeHex = normalizeHex(hex).slice(1);
  return {
    r: parseInt(safeHex.slice(0, 2), 16),
    g: parseInt(safeHex.slice(2, 4), 16),
    b: parseInt(safeHex.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
        break;
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rn = 0;
  let gn = 0;
  let bn = 0;

  if (h >= 0 && h < 60) {
    rn = c;
    gn = x;
  } else if (h < 120) {
    rn = x;
    gn = c;
  } else if (h < 180) {
    gn = c;
    bn = x;
  } else if (h < 240) {
    gn = x;
    bn = c;
  } else if (h < 300) {
    rn = x;
    bn = c;
  } else {
    rn = c;
    bn = x;
  }

  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  };
}

function lighten(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const nextL = clamp(l + percent / 100, 0, 1);
  const nextRgb = hslToRgb(h, s, nextL);
  return rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b);
}

function darken(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const nextL = clamp(l - percent / 100, 0, 1);
  const nextRgb = hslToRgb(h, s, nextL);
  return rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b);
}

function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function isMode(value: unknown): value is DesignMode {
  return value === "dark" || value === "light";
}

function isPreset(value: unknown): value is PresetName {
  return value === "custom" || value === "brutalist" || value === "glass" || value === "editorial" || value === "cyberpunk";
}

function isFontName(value: unknown): value is FontName {
  return typeof value === "string" && FONT_OPTIONS.includes(value as FontName);
}

function isButtonStyle(value: unknown): value is ButtonStyle {
  return value === "solid" || value === "outline" || value === "ghost" || value === "gradient";
}

function isShadowIntensity(value: unknown): value is ShadowIntensity {
  return value === "none" || value === "subtle" || value === "medium" || value === "dramatic";
}

function sanitizeColorArray(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return [];
  }
  const normalized = input
    .filter((item): item is string => typeof item === "string")
    .map((item) => normalizeHex(item))
    .filter((item, index, arr) => arr.indexOf(item) === index);
  return normalized.slice(0, 24);
}

function sanitizeState(input: unknown): DesignState {
  if (typeof input !== "object" || input === null) {
    return DEFAULT;
  }
  const candidate = input as Partial<DesignState>;
  return {
    mode: isMode(candidate.mode) ? candidate.mode : DEFAULT.mode,
    preset: isPreset(candidate.preset) ? candidate.preset : DEFAULT.preset,
    bgColor: typeof candidate.bgColor === "string" ? normalizeHex(candidate.bgColor) : DEFAULT.bgColor,
    accentColor: typeof candidate.accentColor === "string" ? normalizeHex(candidate.accentColor) : DEFAULT.accentColor,
    textColor: typeof candidate.textColor === "string" ? normalizeHex(candidate.textColor) : DEFAULT.textColor,
    fontDisplay: isFontName(candidate.fontDisplay) ? candidate.fontDisplay : DEFAULT.fontDisplay,
    fontBody: isFontName(candidate.fontBody) ? candidate.fontBody : DEFAULT.fontBody,
    fontSize: typeof candidate.fontSize === "number" ? clamp(Math.round(candidate.fontSize), 14, 22) : DEFAULT.fontSize,
    borderRadius:
      typeof candidate.borderRadius === "number" ? clamp(Math.round(candidate.borderRadius), 0, 24) : DEFAULT.borderRadius,
    buttonStyle: isButtonStyle(candidate.buttonStyle) ? candidate.buttonStyle : DEFAULT.buttonStyle,
    shadowIntensity: isShadowIntensity(candidate.shadowIntensity) ? candidate.shadowIntensity : DEFAULT.shadowIntensity,
    scrollbarWidth:
      typeof candidate.scrollbarWidth === "number"
        ? clamp(Math.round(candidate.scrollbarWidth), 6, 14)
        : DEFAULT.scrollbarWidth,
  };
}

function resolveFontVariable(name: FontName): string {
  switch (name) {
    case "Syne":
      return "var(--font-v17-syne)";
    case "Space Grotesk":
      return "var(--font-v17-space-grotesk)";
    case "Fraunces":
      return "var(--font-v17-fraunces)";
    case "Instrument Serif":
      return "var(--font-v17-instrument-serif)";
    case "Orbitron":
      return "var(--font-v17-orbitron)";
    case "Playfair Display":
      return "var(--font-v17-playfair-display)";
    case "Bebas Neue":
      return "var(--font-v17-bebas-neue)";
    case "Archivo":
      return "var(--font-v17-archivo)";
    case "Inter":
      return "var(--font-v17-inter)";
    case "JetBrains Mono":
      return "var(--font-v17-jetbrains-mono)";
    case "DM Sans":
      return "var(--font-v17-dm-sans)";
    case "Outfit":
      return "var(--font-v17-outfit)";
    case "IBM Plex Sans":
      return "var(--font-v17-ibm-plex-sans)";
    case "Lora":
      return "var(--font-v17-lora)";
    case "Manrope":
      return "var(--font-v17-manrope)";
    case "Space Mono":
      return "var(--font-v17-space-mono)";
    default:
      return "var(--font-v17-inter)";
  }
}

interface PersistedV17State {
  design: DesignState;
  customBg: string[];
  customAccent: string[];
  customText: string[];
  isPreviewMode: boolean;
}

function readInitial(): PersistedV17State {
  if (typeof window === "undefined") {
    return { design: DEFAULT, customBg: [], customAccent: [], customText: [], isPreviewMode: false };
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { design: DEFAULT, customBg: [], customAccent: [], customText: [], isPreviewMode: false };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<PersistedV17State> | Partial<DesignState>;
    if ("design" in parsed || "customBg" in parsed || "customAccent" in parsed || "customText" in parsed || "isPreviewMode" in parsed) {
      return {
        design: sanitizeState((parsed as Partial<PersistedV17State>).design ?? DEFAULT),
        customBg: sanitizeColorArray((parsed as Partial<PersistedV17State>).customBg),
        customAccent: sanitizeColorArray((parsed as Partial<PersistedV17State>).customAccent),
        customText: sanitizeColorArray((parsed as Partial<PersistedV17State>).customText),
        isPreviewMode: Boolean((parsed as Partial<PersistedV17State>).isPreviewMode),
      };
    }
    return { design: sanitizeState(parsed), customBg: [], customAccent: [], customText: [], isPreviewMode: false };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return { design: DEFAULT, customBg: [], customAccent: [], customText: [], isPreviewMode: false };
  }
}

export default function V17Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [design, setDesign] = useState<DesignState>(DEFAULT);
  const [customBg, setCustomBg] = useState<string[]>([]);
  const [customAccent, setCustomAccent] = useState<string[]>([]);
  const [customText, setCustomText] = useState<string[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const restored = readInitial();
    const frame = window.requestAnimationFrame(() => {
      setDesign(restored.design);
      setCustomBg(restored.customBg);
      setCustomAccent(restored.customAccent);
      setCustomText(restored.customText);
      setIsPreviewMode(restored.isPreviewMode);
      setIsHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    const payload: PersistedV17State = {
      design,
      customBg,
      customAccent,
      customText,
      isPreviewMode,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [customAccent, customBg, customText, design, isHydrated, isPreviewMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement) {
        const tag = event.target.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || tag === "select" || event.target.isContentEditable) {
          return;
        }
      }
      if (event.key.toLowerCase() === "p" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setIsPreviewMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(null), 1700);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const accentHoverColor = useMemo(() => darken(design.accentColor, 10), [design.accentColor]);
  const lightenedBg = useMemo(() => lighten(design.bgColor, 5), [design.bgColor]);
  const textMuted = useMemo(() => withAlpha(design.textColor, 0.6), [design.textColor]);
  const border = useMemo(() => withAlpha(design.textColor, 0.1), [design.textColor]);

  const cssVars = useMemo(() => {
    return {
      "--v17-bg": design.bgColor,
      "--v17-bg-2": lightenedBg,
      "--v17-accent": design.accentColor,
      "--v17-accent-hover": accentHoverColor,
      "--v17-text": design.textColor,
      "--v17-text-muted": textMuted,
      "--v17-border": border,
      "--v17-radius": `${design.borderRadius}px`,
      "--v17-font-display": `${resolveFontVariable(design.fontDisplay)}, '${design.fontDisplay}', sans-serif`,
      "--v17-font-body": `${resolveFontVariable(design.fontBody)}, '${design.fontBody}', sans-serif`,
      "--v17-font-size": `${design.fontSize}px`,
      "--v17-shadow": shadowMap[design.shadowIntensity],
      "--v17-scrollbar-width": `${design.scrollbarWidth}px`,
      "--v17-accent-soft": withAlpha(design.accentColor, 0.2),
      "--v17-control-bg": withAlpha(design.bgColor, 0.74),
    } as CSSProperties;
  }, [accentHoverColor, border, design, lightenedBg, textMuted]);

  const fontFamilyMap = useMemo(() => {
    return Object.fromEntries(
      FONT_OPTIONS.map((font) => [font, `${resolveFontVariable(font)}, '${font}', sans-serif`]),
    ) as Record<FontName, string>;
  }, []);

  const markCustom = <K extends keyof DesignState>(key: K, value: DesignState[K]) => {
    setDesign((current) => ({
      ...current,
      [key]: value,
      preset: "custom",
    }));
  };

  const handlePresetClick = (preset: PresetKey) => {
    const presetValues = presets[preset];
    setDesign((current) => ({
      ...current,
      ...presetValues,
      preset,
    }));
  };

  const handleModeToggle = (mode: DesignMode) => {
    setDesign((current) => ({
      ...current,
      mode,
      bgColor: MODE_DEFAULTS[mode].bgColor,
      textColor: MODE_DEFAULTS[mode].textColor,
      preset: "custom",
    }));
  };

  const addColor = (setter: Dispatch<SetStateAction<string[]>>, value: string) => {
    const normalized = normalizeHex(value);
    setter((current) => {
      if (current.includes(normalized)) {
        return current;
      }
      return [...current, normalized].slice(-24);
    });
  };

  const resetAll = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setDesign(DEFAULT);
    setCustomBg([]);
    setCustomAccent([]);
    setCustomText([]);
    setIsPreviewMode(false);
  };

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main
          className="v17-page"
          style={cssVars}
          data-v17-button-style={design.buttonStyle}
          data-v17-mode={design.mode}
        >
          <section className={`v17-mode-layer ${isPreviewMode ? "is-hidden" : "is-visible"}`}>
            <ControlBar
              design={design}
              displayFonts={DISPLAY_FONTS}
              bodyFonts={BODY_FONTS}
              fontFamilyMap={fontFamilyMap}
              customBg={customBg}
              customAccent={customAccent}
              customText={customText}
              lightenedBg={lightenedBg}
              accentHover={accentHoverColor}
              textMuted={textMuted}
              border={border}
              shadowValue={shadowMap[design.shadowIntensity]}
              onPresetClick={handlePresetClick}
              onModeToggle={handleModeToggle}
              onColorChange={(field, value) => markCustom(field, normalizeHex(value))}
              onAddCustomBg={(value) => addColor(setCustomBg, value)}
              onAddCustomAccent={(value) => addColor(setCustomAccent, value)}
              onAddCustomText={(value) => addColor(setCustomText, value)}
              onFontDisplayChange={(value) => markCustom("fontDisplay", value)}
              onFontBodyChange={(value) => markCustom("fontBody", value)}
              onFontSizeChange={(value) => markCustom("fontSize", clamp(Math.round(value), 14, 22))}
              onBorderRadiusChange={(value) => markCustom("borderRadius", clamp(Math.round(value), 0, 24))}
              onButtonStyleChange={(value) => markCustom("buttonStyle", value)}
              onShadowIntensityChange={(value) => markCustom("shadowIntensity", value)}
              onScrollbarWidthChange={(value) => markCustom("scrollbarWidth", clamp(Math.round(value), 6, 14))}
              onReset={resetAll}
              onExported={() => setToast("Design exported to clipboard ✓")}
            />
          </section>

          <section className={`v17-mode-layer ${isPreviewMode ? "is-visible" : "is-hidden"} v17-preview-mode`}>
            <LivePreview
              accentColor={design.accentColor}
              accentHoverColor={accentHoverColor}
              scrollbarWidth={design.scrollbarWidth}
            />
          </section>

          <ExplanationTriggerButton versionId="v17" />
          <PreviewToggle isPreviewMode={isPreviewMode} onToggle={() => setIsPreviewMode((prev) => !prev)} />
          {toast ? <p className="v17-toast">{toast}</p> : null}
        </main>
      </div>
      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor={design.accentColor}
        thumbHoverColor={accentHoverColor}
        thumbWidth={design.scrollbarWidth}
      />
    </>
  );
}
