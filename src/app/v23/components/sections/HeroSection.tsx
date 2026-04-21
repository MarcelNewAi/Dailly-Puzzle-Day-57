interface HeroSectionProps {
  isVisible: boolean;
  isActive: boolean;
}

export default function HeroSection({ isVisible, isActive }: HeroSectionProps) {
  const revealClass = isVisible ? "v23-reveal v23-revealed" : "v23-reveal";

  return (
    <section
      id="hero"
      data-section="hero"
      data-active={isActive ? "true" : "false"}
      className={`v23-section v23-hero ${isActive ? "v23-section-active" : ""}`}
    >
      <div className="v23-section-inner v23-hero-content v23-stagger">
        <p className={`v23-hero-eyebrow v23-child ${revealClass}`}>VARRO STUDIO - EST. 2009</p>

        <h1 className={`v23-hero-heading v23-child ${revealClass}`}>
          Architecture
          <br />
          as Language.
        </h1>

        <p className={`v23-hero-subheading v23-child ${revealClass}`}>
          We design spaces that articulate ideas. Based in Ljubljana, working worldwide.
        </p>

        <span className={`v23-hero-rule v23-child ${revealClass}`} aria-hidden="true" />
      </div>

      <div className={`v23-scroll-indicator ${revealClass}`} aria-hidden="true">
        <span className="v23-scroll-indicator-line" />
        <svg className="v23-scroll-indicator-chevron" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="v23-scroll-indicator-label">Scroll</span>
      </div>
    </section>
  );
}

