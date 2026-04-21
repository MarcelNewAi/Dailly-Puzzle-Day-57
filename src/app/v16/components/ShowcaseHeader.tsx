import ComparisonSlider from "./ComparisonSlider";

export default function ShowcaseHeader() {
  return (
    <header className="v16-header">
      <div className="v16-header-shell">
        <p className="v16-badge">V16 - BEFORE / AFTER SLIDER</p>
        <h1 className="v16-title">See the Transformation</h1>
        <p className="v16-subtitle">
          Drag the slider to reveal the difference. Works on desktop and mobile.
        </p>

        <div className="v16-main-slider">
          <ComparisonSlider
            beforeImage="https://picsum.photos/seed/before1/1200/750?grayscale"
            afterImage="https://picsum.photos/seed/after1/1200/750"
            aspectRatio="16/10"
          />
        </div>
      </div>
    </header>
  );
}
