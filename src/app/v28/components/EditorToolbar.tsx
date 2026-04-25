"use client";

import type { Draft } from "../autosave";
import SaveStatusIndicator from "./SaveStatusIndicator";

interface EditorToolbarProps {
  saveStatus: "idle" | "unsaved" | "saving" | "saved";
  draft: Draft;
  onManualSave: () => void;
  onPublish: () => void;
  published: boolean;
}

function PenNibIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M12 3 4.8 10.2a2.4 2.4 0 0 0 0 3.4l5.6 5.6a2.4 2.4 0 0 0 3.4 0L21 12l-9-9Zm0 3.2 5.8 5.8-4 4-5.8-5.8 4-4Zm-2 11.6-2.2 3.2 3.2-2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EditorToolbar({ saveStatus, draft, onManualSave, onPublish, published }: EditorToolbarProps) {
  const saveDisabled = saveStatus === "saved" || saveStatus === "idle";

  return (
    <header className="v28-toolbar">
      <div className="v28-toolbar-left">
        <span className="v28-toolbar-mark" aria-hidden="true">
          <PenNibIcon />
        </span>
        <div>
          <p className="v28-toolbar-brand">Compose</p>
          <p className="v28-toolbar-breadcrumb">Draft</p>
        </div>
      </div>

      <div className="v28-toolbar-center">
        <SaveStatusIndicator saveStatus={saveStatus} savedAt={draft.savedAt} />
      </div>

      <div className="v28-toolbar-right">
        <button type="button" className="v28-btn v28-btn--outline" onClick={onManualSave} disabled={saveDisabled}>
          Save
        </button>
        <button type="button" className="v28-btn v28-btn--accent" onClick={onPublish}>
          {published ? "Published!" : "Publish ->"}
        </button>
      </div>
    </header>
  );
}

