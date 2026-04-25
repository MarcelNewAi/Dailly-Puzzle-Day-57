"use client";

import type { Draft } from "../autosave";

interface PublishPanelProps {
  draft: Draft;
  saveStatus: "idle" | "unsaved" | "saving" | "saved";
  onPublish: () => void;
  published: boolean;
}

function formatTitle(value: string): string {
  if (!value.trim()) return "Untitled";
  if (value.length <= 18) return value;
  return `${value.slice(0, 18)}...`;
}

export default function PublishPanel({ draft, saveStatus, onPublish, published }: PublishPanelProps) {
  const publishDisabled = draft.title.trim() === "";

  return (
    <aside className="v28-publish-panel">
      <div className="v28-publish-panel-section">
        <p className="v28-publish-label">Status</p>
        <span className="v28-status-badge">{published ? "Published" : "Draft"}</span>
      </div>

      <div className="v28-publish-panel-section">
        <p className="v28-publish-label">Article details</p>

        <div className="v28-publish-detail-row">
          <span className="v28-publish-detail-key">Title</span>
          <span className="v28-publish-detail-val">{formatTitle(draft.title)}</span>
        </div>

        <div className="v28-publish-detail-row">
          <span className="v28-publish-detail-key">Tags</span>
          <span className="v28-publish-detail-val">
            {draft.tags.length} {draft.tags.length === 1 ? "tag" : "tags"}
          </span>
        </div>

        <div className="v28-publish-detail-row">
          <span className="v28-publish-detail-key">Words</span>
          <span className="v28-publish-detail-val">{draft.wordCount}</span>
        </div>

        <div className="v28-publish-detail-row">
          <span className="v28-publish-detail-key">Version</span>
          <span className="v28-publish-detail-val">v{draft.version}</span>
        </div>

        <div className="v28-publish-detail-row">
          <span className="v28-publish-detail-key">Save</span>
          <span className="v28-publish-detail-val">{saveStatus}</span>
        </div>
      </div>

      <button type="button" className="v28-publish-btn" disabled={publishDisabled} onClick={onPublish}>
        {published ? "Published!" : "Publish"}
      </button>

      <p className="v28-publish-note">Saving is automatic. Publish when ready.</p>
    </aside>
  );
}

