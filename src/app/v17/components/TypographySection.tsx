"use client";

import type { FontName } from "../types";

interface TypographySectionProps {
  displayFonts: FontName[];
  bodyFonts: FontName[];
  selectedDisplay: FontName;
  selectedBody: FontName;
  fontFamilyMap: Record<FontName, string>;
  fontSize: number;
  onDisplayChange: (font: FontName) => void;
  onBodyChange: (font: FontName) => void;
  onFontSizeChange: (value: number) => void;
}

function FontStrip({
  fonts,
  selected,
  onSelect,
  fontFamilyMap,
}: {
  fonts: FontName[];
  selected: FontName;
  onSelect: (font: FontName) => void;
  fontFamilyMap: Record<FontName, string>;
}) {
  return (
    <div className="v17-font-strip hide-native-scrollbar">
      {fonts.map((font) => (
        <button
          key={font}
          type="button"
          className={`v17-font-card ${selected === font ? "is-active" : ""}`}
          onClick={() => onSelect(font)}
          title={`Use ${font}`}
        >
          <span style={{ fontFamily: fontFamilyMap[font] }}>{font}</span>
          <span className="v17-font-sample" style={{ fontFamily: fontFamilyMap[font] }}>
            The quick brown fox jumps
          </span>
        </button>
      ))}
    </div>
  );
}

export default function TypographySection({
  displayFonts,
  bodyFonts,
  selectedDisplay,
  selectedBody,
  fontFamilyMap,
  fontSize,
  onDisplayChange,
  onBodyChange,
  onFontSizeChange,
}: TypographySectionProps) {
  return (
    <section className="v17-lab-section">
      <div className="v17-lab-label">TYPOGRAPHY</div>
      <div className="v17-lab-content v17-lab-content-block">
        <div>
          <p className="v17-sub-label">Display</p>
          <FontStrip fonts={displayFonts} selected={selectedDisplay} onSelect={onDisplayChange} fontFamilyMap={fontFamilyMap} />
        </div>
        <div>
          <p className="v17-sub-label">Body</p>
          <FontStrip fonts={bodyFonts} selected={selectedBody} onSelect={onBodyChange} fontFamilyMap={fontFamilyMap} />
        </div>
        <div className="v17-size-row">
          <span className="v17-sub-label">Size</span>
          <input
            type="range"
            className="v17-slider"
            min={14}
            max={22}
            value={fontSize}
            onChange={(event) => onFontSizeChange(Number(event.target.value))}
          />
          <span className="v17-inline-value">{fontSize}px</span>
        </div>
      </div>
    </section>
  );
}
