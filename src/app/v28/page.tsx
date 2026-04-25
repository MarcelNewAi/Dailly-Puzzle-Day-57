"use client";

import type { CSSProperties } from "react";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import BodyEditor from "./components/BodyEditor";
import DraftRecoveryBanner from "./components/DraftRecoveryBanner";
import EditorToolbar from "./components/EditorToolbar";
import PublishPanel from "./components/PublishPanel";
import TagInput from "./components/TagInput";
import TitleInput from "./components/TitleInput";
import WordCount from "./components/WordCount";
import { EMPTY_DRAFT, clearDraft, countWords, debounce, loadDraft, saveDraft, type Draft } from "./autosave";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const DEFAULT_TAGS = ["writing", "draft"];

function hasDraftContent(draft: Draft): boolean {
  return draft.title.trim() !== "" || draft.body.trim() !== "" || draft.tags.length > 0;
}

function sameDraftContent(a: Draft, b: Draft): boolean {
  if (a.title !== b.title || a.body !== b.body || a.tags.length !== b.tags.length) {
    return false;
  }
  return a.tags.every((tag, index) => tag === b.tags[index]);
}

function V28Skeleton() {
  return (
    <main className="v28-page" aria-hidden="true">
      <div className="v28-toolbar">
        <div className="v28-shimmer v28-shimmer--toolbar" />
      </div>
      <div className="v28-editor-outer">
        <div className="v28-editor-center">
          <div className="v28-shimmer v28-shimmer--title" />
          <div className="v28-shimmer v28-shimmer--line" />
          <div className="v28-shimmer v28-shimmer--line" />
          <div className="v28-shimmer v28-shimmer--body" />
        </div>
      </div>
    </main>
  );
}

export default function V28Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<number | null>(null);
  const publishTimerRef = useRef<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [saveStatus, setSaveStatus] = useState<"idle" | "unsaved" | "saving" | "saved">("idle");
  const [hasPreviousDraft, setHasPreviousDraft] = useState(false);
  const [recoveryDismissed, setRecoveryDismissed] = useState(false);
  const [published, setPublished] = useState(false);

  const draftRef = useRef<Draft>(EMPTY_DRAFT);
  const debouncedSaveRef = useRef<((nextDraft: Draft) => void) | null>(null);
  if (debouncedSaveRef.current === null) {
    debouncedSaveRef.current = debounce((nextDraft: Draft) => {
      saveDraft(nextDraft);
      const persistedDraft = loadDraft();

      setDraft((current) => {
        if (!sameDraftContent(current, nextDraft)) {
          return current;
        }
        const savedDraft: Draft =
          persistedDraft && sameDraftContent(persistedDraft, nextDraft)
            ? persistedDraft
            : {
                ...current,
                version: current.version + 1,
              };
        return savedDraft;
      });

      setSaveStatus("saved");
    }, 800);
  }
  const debouncedSave = debouncedSaveRef.current;

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);

      const loaded = loadDraft();
      if (loaded && hasDraftContent(loaded)) {
        draftRef.current = loaded;
        setDraft(loaded);
        setHasPreviousDraft(true);
        setRecoveryDismissed(false);
        setSaveStatus("saved");
        return;
      }

      const initialDraft: Draft = {
        ...EMPTY_DRAFT,
        tags: DEFAULT_TAGS,
      };
      draftRef.current = initialDraft;
      setDraft(initialDraft);
      setHasPreviousDraft(false);
      setRecoveryDismissed(true);
      setSaveStatus("idle");
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
      }
      if (publishTimerRef.current !== null) {
        window.clearTimeout(publishTimerRef.current);
      }
    };
  }, []);

  const handleChange = (field: keyof Draft, value: string | string[]) => {
    const current = draftRef.current;
    const title = field === "title" && typeof value === "string" ? value : current.title;
    const body = field === "body" && typeof value === "string" ? value : current.body;
    const tags = field === "tags" && Array.isArray(value) ? value : current.tags;

    const updatedDraft: Draft = {
      ...current,
      title,
      body,
      tags,
      wordCount: countWords(body),
    };

    draftRef.current = updatedDraft;
    setDraft(updatedDraft);
    setSaveStatus("unsaved");
    setSaveStatus("saving");
    debouncedSave(updatedDraft);
  };

  const handleDismissRecovery = () => {
    setRecoveryDismissed(true);
  };

  const resetDraft = () => {
    const nextDraft: Draft = {
      ...EMPTY_DRAFT,
      tags: DEFAULT_TAGS,
    };
    draftRef.current = nextDraft;
    setDraft(nextDraft);
  };

  const handleDiscardDraft = () => {
    clearDraft();
    resetDraft();
    setHasPreviousDraft(false);
    setRecoveryDismissed(true);
    setSaveStatus("idle");
  };

  const handleManualSave = () => {
    const current = draftRef.current;
    setSaveStatus("saving");
    saveDraft(current);

    const savedDraft: Draft = {
      ...current,
      savedAt: Date.now(),
      version: current.version + 1,
    };
    draftRef.current = savedDraft;
    setDraft(savedDraft);

    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      setSaveStatus("saved");
    }, 400);
  };

  const handlePublish = () => {
    clearDraft();
    setPublished(true);
    resetDraft();
    setHasPreviousDraft(false);
    setRecoveryDismissed(true);
    setSaveStatus("idle");

    if (publishTimerRef.current !== null) {
      window.clearTimeout(publishTimerRef.current);
    }
    publishTimerRef.current = window.setTimeout(() => {
      setPublished(false);
    }, 2000);
  };

  const rootStyle = useMemo(
    () =>
      ({
        "--v28-font-title": poppins.style.fontFamily,
        "--v28-font-body": dmSans.style.fontFamily,
      }) as CSSProperties,
    [],
  );

  return (
    <>
      <div ref={scrollRef} className="v28-scroll-shell hide-native-scrollbar">
        <div className="v28-root" style={rootStyle}>
          {!mounted ? (
            <V28Skeleton />
          ) : (
            <main className="v28-page">
              <EditorToolbar
                saveStatus={saveStatus}
                draft={draft}
                onManualSave={handleManualSave}
                onPublish={handlePublish}
                published={published}
              />

              <div className="v28-editor-outer">
                {hasPreviousDraft && !recoveryDismissed ? (
                  <DraftRecoveryBanner draft={draft} onDismiss={handleDismissRecovery} onDiscard={handleDiscardDraft} />
                ) : null}

                <div className="v28-editor-center">
                  <TitleInput value={draft.title} onChange={(value) => handleChange("title", value)} />
                  <TagInput tags={draft.tags} onChange={(tags) => handleChange("tags", tags)} />
                  <WordCount body={draft.body} title={draft.title} />
                  <BodyEditor value={draft.body} onChange={(value) => handleChange("body", value)} />
                </div>

                <PublishPanel draft={draft} saveStatus={saveStatus} onPublish={handlePublish} published={published} />
              </div>

              <ExplanationTriggerButton versionId="v28" />
            </main>
          )}
        </div>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        className="v28-custom-scrollbar"
        thumbColor="#5b4af7"
        thumbHoverColor="#5b4af7"
        trackColorLight="rgba(91, 74, 247, 0.1)"
        trackColorDark="rgba(91, 74, 247, 0.1)"
      />
    </>
  );
}
