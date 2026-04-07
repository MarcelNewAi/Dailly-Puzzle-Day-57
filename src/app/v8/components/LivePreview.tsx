"use client";

import PreviewBadges from "./preview/PreviewBadges";
import PreviewButtons from "./preview/PreviewButtons";
import PreviewCards from "./preview/PreviewCards";
import PreviewForm from "./preview/PreviewForm";
import PreviewTypography from "./preview/PreviewTypography";

export default function LivePreview() {
  return (
    <section className="v8-panel v8-preview-panel v8-panel-animated v8-panel-delay" aria-label="Live preview">
      <header className="v8-panel-header">
        <h2 className="v8-panel-title">Live Preview</h2>
        <p className="v8-panel-subtitle">
          Watch your theme changes come to life instantly. Every adjustment reflects across all elements.
        </p>
      </header>

      <div className="v8-preview-stack">
        <PreviewButtons />
        <PreviewCards />
        <PreviewTypography />
        <PreviewForm />
        <PreviewBadges />
      </div>
    </section>
  );
}

