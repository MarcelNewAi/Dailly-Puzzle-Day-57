"use client";

import type React from "react";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import ActivityLog from "./components/ActivityLog";
import KeyDisplayPanel from "./components/KeyDisplayPanel";
import KeyMetaPanel from "./components/KeyMetaPanel";
import PageHeader from "./components/PageHeader";
import RegeneratePanel from "./components/RegeneratePanel";
import { generateKey, loadKey, saveKey, type ApiKey } from "./keyGen";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

function V27Skeleton() {
  return (
    <main className="v27-page" aria-hidden="true">
      <div className="v27-header">
        <div className="v27-shimmer v27-shimmer--header" />
      </div>

      <div className="v27-content">
        <div className="v27-layout">
          <div className="v27-layout-main">
            <div className="v27-shimmer v27-shimmer--wide" />
          </div>
          <aside className="v27-layout-aside">
            <div className="v27-shimmer v27-shimmer--narrow" />
            <div className="v27-shimmer v27-shimmer--narrow" />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function V27Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const copyTimerRef = useRef<number | null>(null);
  const oldKeyTimerRef = useRef<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const [apiKey, setApiKey] = useState<ApiKey | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [environment, setEnvironment] = useState<"live" | "test">("live");
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [oldKeyId, setOldKeyId] = useState<string | null>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setMounted(true);

      const existing = loadKey();
      if (existing) {
        setApiKey(existing);
        setEnvironment(existing.environment);
        return;
      }

      const initial = generateKey("live");
      saveKey(initial);
      setApiKey(initial);
      setEnvironment("live");
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      if (oldKeyTimerRef.current !== null) {
        window.clearTimeout(oldKeyTimerRef.current);
      }
    };
  }, []);

  const handleReveal = () => {
    setRevealed((previous) => !previous);
  };

  const handleCopy = () => {
    if (!apiKey || !revealed) {
      return;
    }

    navigator.clipboard
      .writeText(apiKey.full)
      .then(() => {
        setCopied(true);

        if (copyTimerRef.current !== null) {
          window.clearTimeout(copyTimerRef.current);
        }

        copyTimerRef.current = window.setTimeout(() => {
          setCopied(false);
        }, 2000);

        setApiKey((current) => {
          if (!current) {
            return current;
          }

          const updated: ApiKey = {
            ...current,
            lastUsed: Date.now(),
            usageCount: current.usageCount + 1,
          };
          saveKey(updated);
          return updated;
        });
      })
      .catch(() => {
        setCopied(false);
      });
  };

  const handleRegenerate = () => {
    if (!apiKey) {
      return;
    }

    if (!regenerating) {
      setRegenerating(true);
      return;
    }

    const invalidatedId = apiKey.id;
    const nextKey = generateKey(environment);
    saveKey(nextKey);

    setOldKeyId(invalidatedId);
    setApiKey(nextKey);
    setRevealed(false);
    setCopied(false);
    setRegenerating(false);

    if (oldKeyTimerRef.current !== null) {
      window.clearTimeout(oldKeyTimerRef.current);
    }

    oldKeyTimerRef.current = window.setTimeout(() => {
      setOldKeyId(null);
    }, 3000);
  };

  const handleCancelRegenerate = () => {
    setRegenerating(false);
  };

  const handleEnvironmentSwitch = (env: "live" | "test") => {
    if (environment === env) {
      return;
    }

    if (oldKeyTimerRef.current !== null) {
      window.clearTimeout(oldKeyTimerRef.current);
      oldKeyTimerRef.current = null;
    }

    const nextKey = generateKey(env);
    saveKey(nextKey);
    setApiKey(nextKey);
    setEnvironment(env);
    setRevealed(false);
    setCopied(false);
    setRegenerating(false);
    setOldKeyId(null);
  };

  const rootStyle = {
    "--v27-font-title": poppins.style.fontFamily,
    "--v27-font-body": dmSans.style.fontFamily,
  } as React.CSSProperties;

  return (
    <>
      <div ref={scrollRef} className="v27-scroll-shell hide-native-scrollbar">
        <div className="v27-root" style={rootStyle}>
          {!mounted || !apiKey ? (
            <V27Skeleton />
          ) : (
            <main className="v27-page">
              <PageHeader />

              <div className="v27-content">
                <h1 className="v27-content-title">API Key Dashboard</h1>
                <p className="v27-content-subtitle">Manage your Keystone API credentials with secure reveal and regeneration controls.</p>

                <div className="v27-layout">
                  <div className="v27-layout-main">
                    <KeyDisplayPanel apiKey={apiKey} revealed={revealed} copied={copied} onReveal={handleReveal} onCopy={handleCopy} />
                    <RegeneratePanel
                      regenerating={regenerating}
                      oldKeyId={oldKeyId}
                      onRegenerate={handleRegenerate}
                      onCancel={handleCancelRegenerate}
                    />
                  </div>

                  <aside className="v27-layout-aside">
                    <KeyMetaPanel apiKey={apiKey} environment={environment} onEnvironmentSwitch={handleEnvironmentSwitch} />
                    <ActivityLog apiKey={apiKey} />
                  </aside>
                </div>
              </div>

              <ExplanationTriggerButton versionId="v27" />
            </main>
          )}
        </div>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        className="v27-custom-scrollbar"
        thumbColor="#5b4af7"
        thumbHoverColor="#5b4af7"
        trackColorLight="rgba(91, 74, 247, 0.1)"
        trackColorDark="rgba(91, 74, 247, 0.1)"
      />
    </>
  );
}
