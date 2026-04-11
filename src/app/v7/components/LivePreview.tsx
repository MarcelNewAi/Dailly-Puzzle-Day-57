import { useEffect, type JSX, type RefObject } from "react";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";

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
    <div className="relative flex-1 min-h-0">
      <div
        ref={previewRef}
        className={`v7-live-preview h-full hide-native-scrollbar ${previewPulsing ? "is-pulsing" : ""}`}
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
      <CustomScrollbar scrollContainerRef={previewRef} variant="card" thumbColor="#C6F135" thumbHoverColor="#A8CC2A" />
    </div>
  );
}
