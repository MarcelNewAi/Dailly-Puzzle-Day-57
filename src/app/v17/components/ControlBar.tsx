"use client";

import ColorControls from "./ColorControls";
import ExportButton from "./ExportButton";
import TypographySection from "./TypographySection";
import type { ButtonStyle, DesignMode, DesignState, FontName, PresetKey, ShadowIntensity } from "../types";

interface ControlBarProps {
  design: DesignState;
  displayFonts: FontName[];
  bodyFonts: FontName[];
  fontFamilyMap: Record<FontName, string>;
  customBg: string[];
  customAccent: string[];
  customText: string[];
  lightenedBg: string;
  accentHover: string;
  textMuted: string;
  border: string;
  shadowValue: string;
  onPresetClick: (preset: PresetKey) => void;
  onModeToggle: (mode: DesignMode) => void;
  onColorChange: (field: "bgColor" | "accentColor" | "textColor", value: string) => void;
  onAddCustomBg: (value: string) => void;
  onAddCustomAccent: (value: string) => void;
  onAddCustomText: (value: string) => void;
  onFontDisplayChange: (font: FontName) => void;
  onFontBodyChange: (font: FontName) => void;
  onFontSizeChange: (value: number) => void;
  onBorderRadiusChange: (value: number) => void;
  onButtonStyleChange: (style: ButtonStyle) => void;
  onShadowIntensityChange: (intensity: ShadowIntensity) => void;
  onScrollbarWidthChange: (value: number) => void;
  onReset: () => void;
  onExported: () => void;
}

const PRESETS: Array<{ key: PresetKey; label: string; icon: string }> = [
  { key: "brutalist", label: "Brutalist", icon: "◆" },
  { key: "glass", label: "Glass", icon: "◌" },
  { key: "editorial", label: "Editorial", icon: "✦" },
  { key: "cyberpunk", label: "Cyberpunk", icon: "⬣" },
];

const BUTTON_STYLES: ButtonStyle[] = ["solid", "outline", "ghost", "gradient"];
const SHADOW_LEVELS: ShadowIntensity[] = ["none", "subtle", "medium", "dramatic"];

function PillGroup<T extends string>({
  values,
  selected,
  onSelect,
}: {
  values: T[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div className="v17-pill-group">
      {values.map((value) => (
        <button
          key={value}
          type="button"
          className={`v17-pill ${selected === value ? "is-active" : ""}`}
          onClick={() => onSelect(value)}
          title={value}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default function ControlBar({
  design,
  displayFonts,
  bodyFonts,
  fontFamilyMap,
  customBg,
  customAccent,
  customText,
  lightenedBg,
  accentHover,
  textMuted,
  border,
  shadowValue,
  onPresetClick,
  onModeToggle,
  onColorChange,
  onAddCustomBg,
  onAddCustomAccent,
  onAddCustomText,
  onFontDisplayChange,
  onFontBodyChange,
  onFontSizeChange,
  onBorderRadiusChange,
  onButtonStyleChange,
  onShadowIntensityChange,
  onScrollbarWidthChange,
  onReset,
  onExported,
}: ControlBarProps) {
  return (
    <section className="v17-design-lab">
      <header className="v17-lab-header">
        <h1>Design Lab</h1>
        <p>Customize every design token, preview live, and export as a spec</p>
      </header>

      <section className="v17-lab-section">
        <div className="v17-lab-label">VIBES</div>
        <div className="v17-lab-content">
          <div className="v17-preset-row">
            {PRESETS.map((preset) => (
              <button
                key={preset.key}
                type="button"
                className={`v17-preset-btn ${design.preset === preset.key ? "is-active" : ""}`}
                onClick={() => onPresetClick(preset.key)}
                title={`Apply ${preset.label} preset`}
              >
                <span aria-hidden="true">{preset.icon}</span>
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
          <div className="v17-pill-group">
            <button
              type="button"
              className={`v17-pill ${design.mode === "dark" ? "is-active" : ""}`}
              onClick={() => onModeToggle("dark")}
              title="Dark mode"
            >
              Dark
            </button>
            <button
              type="button"
              className={`v17-pill ${design.mode === "light" ? "is-active" : ""}`}
              onClick={() => onModeToggle("light")}
              title="Light mode"
            >
              Light
            </button>
          </div>
        </div>
      </section>

      <ColorControls
        bgColor={design.bgColor}
        accentColor={design.accentColor}
        textColor={design.textColor}
        customBg={customBg}
        customAccent={customAccent}
        customText={customText}
        onColorChange={onColorChange}
        onAddCustomBg={onAddCustomBg}
        onAddCustomAccent={onAddCustomAccent}
        onAddCustomText={onAddCustomText}
      />

      <TypographySection
        displayFonts={displayFonts}
        bodyFonts={bodyFonts}
        selectedDisplay={design.fontDisplay}
        selectedBody={design.fontBody}
        fontFamilyMap={fontFamilyMap}
        fontSize={design.fontSize}
        onDisplayChange={onFontDisplayChange}
        onBodyChange={onFontBodyChange}
        onFontSizeChange={onFontSizeChange}
      />

      <section className="v17-lab-section">
        <div className="v17-lab-label">SHAPE &amp; DEPTH</div>
        <div className="v17-lab-content v17-shape-row">
          <div className="v17-control-inline" title={`Border radius ${design.borderRadius}px`}>
            <span className="v17-sub-label">Radius</span>
            <input
              type="range"
              className="v17-slider"
              min={0}
              max={24}
              value={design.borderRadius}
              onChange={(event) => onBorderRadiusChange(Number(event.target.value))}
            />
            <span className="v17-inline-value">{design.borderRadius}</span>
          </div>

          <div className="v17-control-inline" title="Button style">
            <span className="v17-sub-label">Buttons</span>
            <PillGroup values={BUTTON_STYLES} selected={design.buttonStyle} onSelect={onButtonStyleChange} />
          </div>

          <div className="v17-control-inline" title="Shadow intensity">
            <span className="v17-sub-label">Shadow</span>
            <PillGroup values={SHADOW_LEVELS} selected={design.shadowIntensity} onSelect={onShadowIntensityChange} />
          </div>

          <div className="v17-control-inline" title={`Scrollbar width ${design.scrollbarWidth}px`}>
            <span className="v17-sub-label">Scrollbar</span>
            <input
              type="range"
              className="v17-slider"
              min={6}
              max={14}
              value={design.scrollbarWidth}
              onChange={(event) => onScrollbarWidthChange(Number(event.target.value))}
            />
            <span className="v17-inline-value">{design.scrollbarWidth}</span>
          </div>

          <div className="v17-action-row">
            <ExportButton
              design={design}
              lightenedBg={lightenedBg}
              accentHover={accentHover}
              textMuted={textMuted}
              border={border}
              shadowValue={shadowValue}
              onExported={onExported}
            />
            <button type="button" className="v17-reset-btn" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
