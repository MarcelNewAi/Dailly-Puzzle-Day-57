import { useEffect, type JSX, type RefObject } from "react";

type SectionPreviewItem = {
  id: string;
  Component: () => JSX.Element;
};

type LivePreviewProps = {
  sections: SectionPreviewItem[];
  previewRef: RefObject<HTMLDivElement | null>;
  previewPulsing: boolean;
  onPreviewScroll: (top: number) => void;
};

export default function LivePreview({
  sections,
  previewRef,
  previewPulsing,
  onPreviewScroll,
}: LivePreviewProps) {
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) {
      return;
    }

    onPreviewScroll(preview.scrollTop);
  }, [onPreviewScroll, previewRef]);

  return (
    <div
      ref={previewRef}
      className={`v7-live-preview ${previewPulsing ? "is-pulsing" : ""}`}
      onScroll={(event) => {
        onPreviewScroll(event.currentTarget.scrollTop);
      }}
    >
      <div className="v7-live-preview-inner">
        {sections.map((section) => {
          const SectionComponent = section.Component;

          return (
            <div key={section.id} className="v7-preview-section">
              <SectionComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
}