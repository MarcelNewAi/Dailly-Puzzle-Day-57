"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

interface ColorControlsProps {
  bgColor: string;
  accentColor: string;
  textColor: string;
  customBg: string[];
  customAccent: string[];
  customText: string[];
  onColorChange: (field: "bgColor" | "accentColor" | "textColor", value: string) => void;
  onAddCustomBg: (value: string) => void;
  onAddCustomAccent: (value: string) => void;
  onAddCustomText: (value: string) => void;
}

type ColorField = "bgColor" | "accentColor" | "textColor";

const BASE_SWATCHES = [
  "#0A0A0A",
  "#FFFFFF",
  "#0F172A",
  "#0B0F1A",
  "#F59E0B",
  "#06B6D4",
  "#00F0FF",
  "#10B981",
  "#FAFAFA",
  "#000000",
  "#F0F9FF",
  "#F0FDFF",
];

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

function Popover({
  field,
  currentColor,
  onApply,
  onClose,
}: {
  field: ColorField;
  currentColor: string;
  onApply: (value: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState(currentColor);

  useEffect(() => {
    setDraft(currentColor);
  }, [currentColor]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClose();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="v17-color-popover" ref={ref} role="dialog" aria-label={`${field} color picker`}>
      <input type="color" value={normalizeHex(draft)} onChange={(event) => setDraft(event.target.value)} />
      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="#AABBCC"
        className="v17-color-hex-input"
      />
      <button
        type="button"
        className="v17-color-apply-btn"
        onClick={() => {
          onApply(normalizeHex(draft));
          onClose();
        }}
      >
        Apply
      </button>
    </div>
  );
}

function ColorRow({
  label,
  field,
  currentColor,
  customColors,
  onColorChange,
  onAddCustomColor,
}: {
  label: string;
  field: ColorField;
  currentColor: string;
  customColors: string[];
  onColorChange: (field: ColorField, value: string) => void;
  onAddCustomColor: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const allColors = [...BASE_SWATCHES, ...customColors];

  return (
    <div className="v17-color-row">
      <span className="v17-sub-label">{label}</span>
      <div className="v17-swatch-row">
        {allColors.map((color) => (
          <button
            key={`${field}-${color}`}
            type="button"
            className={`v17-swatch ${currentColor.toUpperCase() === color.toUpperCase() ? "is-active" : ""}`}
            style={{ "--v17-swatch-color": color } as CSSProperties}
            onClick={() => onColorChange(field, color)}
            title={color}
            aria-label={`${label} ${color}`}
          />
        ))}
        <div className="v17-swatch-plus-wrap">
          <button type="button" className="v17-swatch v17-swatch-plus" onClick={() => setOpen((prev) => !prev)} title="Add custom color">
            +
          </button>
          {open ? (
            <Popover
              field={field}
              currentColor={currentColor}
              onApply={(value) => {
                onColorChange(field, value);
                onAddCustomColor(value);
              }}
              onClose={() => setOpen(false)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ColorControls({
  bgColor,
  accentColor,
  textColor,
  customBg,
  customAccent,
  customText,
  onColorChange,
  onAddCustomBg,
  onAddCustomAccent,
  onAddCustomText,
}: ColorControlsProps) {
  return (
    <section className="v17-lab-section">
      <div className="v17-lab-label">COLORS</div>
      <div className="v17-lab-content v17-lab-content-block">
        <ColorRow
          label="Background"
          field="bgColor"
          currentColor={bgColor}
          customColors={customBg}
          onColorChange={onColorChange}
          onAddCustomColor={onAddCustomBg}
        />
        <ColorRow
          label="Accent"
          field="accentColor"
          currentColor={accentColor}
          customColors={customAccent}
          onColorChange={onColorChange}
          onAddCustomColor={onAddCustomAccent}
        />
        <ColorRow
          label="Text"
          field="textColor"
          currentColor={textColor}
          customColors={customText}
          onColorChange={onColorChange}
          onAddCustomColor={onAddCustomText}
        />
      </div>
    </section>
  );
}
