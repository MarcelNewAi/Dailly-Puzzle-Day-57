import type { BuiltPageData } from "../data";
import CtaBlock from "./blocks/CtaBlock";
import DirectAnswerBlock from "./blocks/DirectAnswerBlock";
import FaqBlock from "./blocks/FaqBlock";
import HowItWorksBlock from "./blocks/HowItWorksBlock";
import KeyFactsBlock from "./blocks/KeyFactsBlock";
import PricingBlock from "./blocks/PricingBlock";
import TrustSignalsBlock from "./blocks/TrustSignalsBlock";

interface PagePreviewProps {
  pageData: BuiltPageData;
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.5 10.5V8.5a3.5 3.5 0 1 1 7 0v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PagePreview({ pageData }: PagePreviewProps) {
  return (
    <div className="v22-preview-content">
      <div className="v22-url-bar" aria-label="Generated page URL">
        <span className="v22-url-icon">
          <LockIcon />
        </span>
        <code className="v22-url-value">{pageData.urlSlug}</code>
      </div>

      <header className="v22-page-header">
        <div>
          <h1 className="v22-page-title">{pageData.title}</h1>
          <p className="v22-page-meta">{pageData.metaDescription}</p>
        </div>
        <span className="v22-live-badge">Live Preview</span>
      </header>

      <DirectAnswerBlock service={pageData.service} locationContextLine={pageData.directAnswerContext} />
      <hr className="v22-divider" />

      <KeyFactsBlock keyFacts={pageData.service.keyFacts} />
      <hr className="v22-divider" />

      <HowItWorksBlock steps={pageData.service.howItWorks} />
      <hr className="v22-divider" />

      <PricingBlock pricing={pageData.service.pricing} heading={pageData.pricingHeading} />
      <hr className="v22-divider" />

      <TrustSignalsBlock trustSignals={pageData.service.trustSignals} />
      <hr className="v22-divider" />

      <FaqBlock serviceName={pageData.service.name} faqs={pageData.service.faqs} />
      <hr className="v22-divider" />

      <CtaBlock
        ctaHeadline={pageData.ctaHeadline}
        ctaBody={pageData.ctaBody}
        serviceName={pageData.service.name}
        locationName={pageData.location.name}
        ctaMeta={pageData.ctaMeta}
      />
    </div>
  );
}
