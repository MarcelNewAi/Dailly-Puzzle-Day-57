"use client";

import type { DesignState } from "../types";

interface ExportButtonProps {
  design: DesignState;
  lightenedBg: string;
  accentHover: string;
  textMuted: string;
  border: string;
  shadowValue: string;
  onExported: () => void;
}

const intentByPreset: Record<string, string> = {
  brutalist:
    "Raw, high-contrast system with sharp corners, dramatic shadows, and monospace typography. Built for interfaces that prioritize visual impact and function over polish.",
  glass:
    "Layered, translucent feel with soft radii and geometric fonts. Ideal for SaaS dashboards and modern product interfaces.",
  editorial:
    "Restrained corners, subtle shadows, editorial font pairings. Perfect for portfolios and content-first experiences.",
  cyberpunk:
    "Sharp geometry, glowing accents, technical typefaces. Designed for high-energy futuristic interfaces.",
  custom: "A custom configuration blending elements outside the standard presets.",
};

function generateDesignMarkdown(
  design: DesignState,
  lightenedBg: string,
  accentHover: string,
  textMuted: string,
  border: string,
  shadowValue: string,
): string {
  const timestamp = new Date().toISOString().split("T")[0];
  const presetName = design.preset[0].toUpperCase() + design.preset.slice(1);
  const isModified = design.preset === "custom" ? "(modified)" : "";

  return `# Design System Specification

Generated from V17 Design Lab on ${timestamp}

## Preset
**${presetName}** ${isModified}

## Theme Mode
${design.mode}

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Background | \`${design.bgColor}\` | Primary background |
| Background elevated | \`${lightenedBg}\` | Cards, panels |
| Accent | \`${design.accentColor}\` | Buttons, links, highlights |
| Accent hover | \`${accentHover}\` | Hover states |
| Text primary | \`${design.textColor}\` | Headings and body |
| Text muted | \`${textMuted}\` | Secondary text |
| Border | \`${border}\` | Dividers, input borders |

## Typography

- **Display font**: \`${design.fontDisplay}\` — for headings, hero titles, display text
- **Body font**: \`${design.fontBody}\` — for paragraphs, UI labels, inputs
- **Base size**: \`${design.fontSize}px\`

## Shape & Depth

- **Border radius**: \`${design.borderRadius}px\`
- **Button style**: \`${design.buttonStyle}\`
- **Shadow intensity**: \`${design.shadowIntensity}\` (\`${shadowValue}\`)
- **Scrollbar width**: \`${design.scrollbarWidth}px\`

## CSS Variables

\`\`\`css
:root {
  --bg: ${design.bgColor};
  --bg-elevated: ${lightenedBg};
  --accent: ${design.accentColor};
  --accent-hover: ${accentHover};
  --text: ${design.textColor};
  --text-muted: ${textMuted};
  --border: ${border};
  --radius: ${design.borderRadius}px;
  --font-display: '${design.fontDisplay}', sans-serif;
  --font-body: '${design.fontBody}', sans-serif;
  --font-size: ${design.fontSize}px;
  --shadow: ${shadowValue};
  --scrollbar-width: ${design.scrollbarWidth}px;
}
\`\`\`

## Component Specifications

### Buttons
- Background: \`var(--accent)\`
- Border radius: \`var(--radius)\`
- Shadow: \`var(--shadow)\`
- Style variant: ${design.buttonStyle}
- Transition: \`all 200ms cubic-bezier(0.4, 0, 0.2, 1)\`

### Inputs
- Background: transparent over \`var(--bg)\`
- Border: 1px solid \`var(--border)\`
- Focus: border \`var(--accent)\` with subtle glow

### Typography Scale
- h1: 4rem, \`var(--font-display)\`, weight 700
- h2: 2.5rem, \`var(--font-display)\`, weight 700
- Body: \`var(--font-size)\`, \`var(--font-body)\`, weight 400, line-height 1.6

## Design Intent

${intentByPreset[design.preset]}

---

Exported from V17 Design Lab`;
}

export default function ExportButton({
  design,
  lightenedBg,
  accentHover,
  textMuted,
  border,
  shadowValue,
  onExported,
}: ExportButtonProps) {
  const handleExport = async () => {
    const markdown = generateDesignMarkdown(design, lightenedBg, accentHover, textMuted, border, shadowValue);
    await navigator.clipboard.writeText(markdown);
    onExported();
  };

  return (
    <button type="button" className="v17-export-btn" onClick={handleExport}>
      Export Design (.md)
    </button>
  );
}
