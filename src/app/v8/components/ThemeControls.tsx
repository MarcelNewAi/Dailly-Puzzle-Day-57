"use client";

import AccentColorPicker from "./controls/AccentColorPicker";
import AnimationSpeedToggle from "./controls/AnimationSpeedToggle";
import BorderRadiusSlider from "./controls/BorderRadiusSlider";
import FontFamilyPicker from "./controls/FontFamilyPicker";
import FontSizeSlider from "./controls/FontSizeSlider";
import SpacingSlider from "./controls/SpacingSlider";
import ThemeModeToggle from "./controls/ThemeModeToggle";
import ResetButton from "./ResetButton";

type FontOption = {
  label: string;
  value: string;
};

type ThemeControlsProps = {
  mode: "light" | "dark";
  accentColor: string;
  borderRadius: number;
  fontSize: number;
  fontFamily: string;
  spacing: number;
  animationSpeed: "off" | "normal" | "fast";
  accentPresets: string[];
  fontOptions: FontOption[];
  onModeChange: (mode: "light" | "dark") => void;
  onAccentColorChange: (value: string) => void;
  onBorderRadiusChange: (value: number) => void;
  onFontSizeChange: (value: number) => void;
  onFontFamilyChange: (value: string) => void;
  onSpacingChange: (value: number) => void;
  onAnimationSpeedChange: (value: "off" | "normal" | "fast") => void;
  onReset: () => void;
};

export default function ThemeControls({
  mode,
  accentColor,
  borderRadius,
  fontSize,
  fontFamily,
  spacing,
  animationSpeed,
  accentPresets,
  fontOptions,
  onModeChange,
  onAccentColorChange,
  onBorderRadiusChange,
  onFontSizeChange,
  onFontFamilyChange,
  onSpacingChange,
  onAnimationSpeedChange,
  onReset,
}: ThemeControlsProps) {
  return (
    <section id="v8-controls-panel" className="v8-panel v8-controls-panel v8-panel-animated" aria-label="Theme controls">
      <header className="v8-panel-header">
        <h2 className="v8-panel-title">ThemeForge</h2>
        <p className="v8-panel-subtitle">Customize your perfect theme</p>
      </header>

      <div className="v8-controls-stack">
        <ThemeModeToggle value={mode} onChange={onModeChange} />
        <AccentColorPicker value={accentColor} presets={accentPresets} onChange={onAccentColorChange} />
        <BorderRadiusSlider value={borderRadius} onChange={onBorderRadiusChange} />
        <FontSizeSlider value={fontSize} onChange={onFontSizeChange} />
        <FontFamilyPicker value={fontFamily} options={fontOptions} onChange={onFontFamilyChange} />
        <SpacingSlider value={spacing} onChange={onSpacingChange} />
        <AnimationSpeedToggle value={animationSpeed} onChange={onAnimationSpeedChange} />
      </div>

      <ResetButton onReset={onReset} />
    </section>
  );
}

