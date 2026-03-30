import type { ReactNode } from "react";

type BuilderLayoutProps = {
  sidebar: ReactNode;
  toolbar: ReactNode;
  preview: ReactNode;
  isSectionListOpen: boolean;
  onToggleSectionList: () => void;
};

export default function BuilderLayout({
  sidebar,
  toolbar,
  preview,
  isSectionListOpen,
  onToggleSectionList,
}: BuilderLayoutProps) {
  return (
    <main className="v7-page">
      <div className="v7-mobile-toggle-wrap">
        <button
          type="button"
          className="v7-mobile-toggle"
          onClick={onToggleSectionList}
          aria-expanded={isSectionListOpen}
          aria-controls="v7-sidebar"
        >
          {isSectionListOpen ? "Hide Section List" : "Show Section List"}
        </button>
      </div>

      <div className="v7-layout" data-sidebar-open={isSectionListOpen}>
        <aside id="v7-sidebar" className="v7-sidebar" aria-label="Section builder sidebar">
          {sidebar}
        </aside>

        <section className="v7-preview-panel" aria-label="Live website preview panel">
          {toolbar}
          {preview}
        </section>
      </div>
    </main>
  );
}