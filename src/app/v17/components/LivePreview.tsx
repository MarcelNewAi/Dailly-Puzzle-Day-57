import PreviewButtons from "./PreviewButtons";
import PreviewForm from "./PreviewForm";
import PreviewHero from "./PreviewHero";
import PreviewScrollArea from "./PreviewScrollArea";
import PreviewStats from "./PreviewStats";

interface LivePreviewProps {
  accentColor: string;
  accentHoverColor: string;
  scrollbarWidth: number;
}

export default function LivePreview({ accentColor, accentHoverColor, scrollbarWidth }: LivePreviewProps) {
  return (
    <section className="v17-preview">
      <PreviewHero />
      <PreviewButtons />
      <PreviewForm />
      <PreviewStats />
      <PreviewScrollArea
        accentColor={accentColor}
        accentHoverColor={accentHoverColor}
        scrollbarWidth={scrollbarWidth}
      />
    </section>
  );
}
