"use client";

import { useEffect, useRef, useState } from "react";
import { Bebas_Neue, DM_Sans, Oswald, Source_Sans_3 } from "next/font/google";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";

interface UserData {
  fullName: string;
  email: string;
  company: string;
  message: string;
  lastVisit: string;
  visitCount: number;
}

type FormFields = Pick<UserData, "fullName" | "email" | "company" | "message">;
type FormFieldKey = keyof FormFields;
type CacheNotice = "idle" | "saved" | "purged";

const STORAGE_KEY = "puzzle62_userData";

const emptyFields: FormFields = {
  fullName: "",
  email: "",
  company: "",
  message: "",
};

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function sanitizeStoredData(raw: unknown): UserData | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Partial<UserData>;
  if (
    typeof value.fullName !== "string" ||
    typeof value.email !== "string" ||
    typeof value.company !== "string" ||
    typeof value.message !== "string"
  ) {
    return null;
  }

  return {
    fullName: value.fullName,
    email: value.email,
    company: value.company,
    message: value.message,
    lastVisit: typeof value.lastVisit === "string" ? value.lastVisit : new Date().toISOString(),
    visitCount:
      typeof value.visitCount === "number" && Number.isFinite(value.visitCount) && value.visitCount > 0
        ? Math.floor(value.visitCount)
        : 1,
  };
}

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "First session";
  const stamp = new Date(iso).getTime();
  if (Number.isNaN(stamp)) return "Unknown";

  const deltaMs = Date.now() - stamp;
  if (deltaMs < 60_000) return "Just now";

  const minutes = Math.floor(deltaMs / 60_000);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function useLocalFormData(key: string) {
  const [fields, setFields] = useState<FormFields>(emptyFields);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [visitCount, setVisitCount] = useState(1);
  const [lastVisit, setLastVisit] = useState(() => new Date().toISOString());
  const [previousLastVisit, setPreviousLastVisit] = useState<string | null>(null);
  const [hasStoredData, setHasStoredData] = useState(false);
  const [notice, setNotice] = useState<CacheNotice>("idle");
  const noticeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const nowIso = new Date().toISOString();
    const raw = localStorage.getItem(key);

    if (!raw) {
      setVisitCount(1);
      setLastVisit(nowIso);
      return;
    }

    try {
      const parsed = sanitizeStoredData(JSON.parse(raw));
      if (!parsed) {
        localStorage.removeItem(key);
        setVisitCount(1);
        setLastVisit(nowIso);
        return;
      }

      const nextVisitCount = parsed.visitCount + 1;
      const updated: UserData = {
        ...parsed,
        visitCount: nextVisitCount,
        lastVisit: nowIso,
      };

      localStorage.setItem(key, JSON.stringify(updated));
      setFields({
        fullName: parsed.fullName,
        email: parsed.email,
        company: parsed.company,
        message: parsed.message,
      });
      setVisitCount(nextVisitCount);
      setPreviousLastVisit(parsed.lastVisit);
      setLastVisit(nowIso);
      setIsReturningUser(true);
      setHasStoredData(true);
    } catch {
      localStorage.removeItem(key);
      setVisitCount(1);
      setLastVisit(nowIso);
    }
  }, [key]);

  useEffect(() => {
    return () => {
      if (noticeTimeoutRef.current !== null) {
        window.clearTimeout(noticeTimeoutRef.current);
      }
    };
  }, []);

  const scheduleNoticeReset = () => {
    if (noticeTimeoutRef.current !== null) {
      window.clearTimeout(noticeTimeoutRef.current);
    }
    noticeTimeoutRef.current = window.setTimeout(() => setNotice("idle"), 1800);
  };

  const persist = (nextFields: FormFields, noticeType: CacheNotice = "idle") => {
    const payload: UserData = {
      ...nextFields,
      visitCount,
      lastVisit,
    };
    localStorage.setItem(key, JSON.stringify(payload));
    setHasStoredData(true);

    if (noticeType !== "idle") {
      setNotice(noticeType);
      scheduleNoticeReset();
    }
  };

  const setField = (field: FormFieldKey, value: string) => {
    setFields((prev) => {
      const next = { ...prev, [field]: value };
      persist(next);
      return next;
    });
  };

  const submit = () => {
    persist(fields, "saved");
  };

  const clear = () => {
    localStorage.removeItem(key);
    const nowIso = new Date().toISOString();
    setFields(emptyFields);
    setIsReturningUser(false);
    setHasStoredData(false);
    setVisitCount(1);
    setLastVisit(nowIso);
    setPreviousLastVisit(null);
    setNotice("purged");
    scheduleNoticeReset();
  };

  return {
    fields,
    setField,
    submit,
    clear,
    isReturningUser,
    visitCount,
    hasStoredData,
    notice,
    previousLastVisit,
  };
}

export default function V4Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [flashCard, setFlashCard] = useState(false);
  const {
    fields,
    setField,
    submit,
    clear,
    isReturningUser,
    visitCount,
    hasStoredData,
    notice,
    previousLastVisit,
  } = useLocalFormData(STORAGE_KEY);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
    setFlashCard(true);
    window.setTimeout(() => setFlashCard(false), 550);
  };

  const displayName = fields.fullName.trim() || "USER";

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main
          className="v4-page"
          style={
            {
              "--v4-font-display-primary": bebasNeue.style.fontFamily,
              "--v4-font-display-fallback": oswald.style.fontFamily,
              "--v4-font-body-primary": dmSans.style.fontFamily,
              "--v4-font-body-fallback": sourceSans.style.fontFamily,
            } as React.CSSProperties
          }
        >
          <div className="v4-shell">
            {isReturningUser ? <div className="v4-banner">WELCOME BACK, {displayName.toUpperCase()}</div> : null}

            <h1 className="v4-title">SYSTEM // CONTACT</h1>
            <p className="v4-subtitle">Your data is cached locally. We remember you.</p>

            <div ref={cardRef} className={`v4-card ${flashCard ? "v4-card-flash" : ""}`}>
              <form onSubmit={handleSubmit} className="v4-form">
                {(
                  [
                    { id: "fullName", label: "Full Name", type: "text", value: fields.fullName },
                    { id: "email", label: "Email", type: "email", value: fields.email },
                    { id: "company", label: "Company", type: "text", value: fields.company },
                  ] as const
                ).map((field, index) => (
                  <label key={field.id} className="v4-field-wrap" style={{ animationDelay: `${index * 80 + 280}ms` }}>
                    <span className="v4-label">{field.label}</span>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      value={field.value}
                      onChange={(event) => setField(field.id, event.target.value)}
                      className="v4-input"
                    />
                  </label>
                ))}

                <label className="v4-field-wrap" style={{ animationDelay: "520ms" }}>
                  <span className="v4-label">Message</span>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={fields.message}
                    onChange={(event) => setField("message", event.target.value)}
                    className="v4-input v4-textarea"
                  />
                </label>

                <button type="submit" className="v4-submit">
                  TRANSMIT DATA
                </button>
              </form>

              <button type="button" className="v4-clear" onClick={clear} aria-label="Clear local cached form data">
                CLEAR LOCAL DATA
              </button>

              <div className="v4-meta">
                {hasStoredData ? (
                  <>
                    <span className="v4-cache-status">
                      <span className="v4-cache-dot" aria-hidden="true" />
                      LOCAL CACHE: ACTIVE
                    </span>
                    <span className="v4-visit">
                      Visit #{visitCount} | Last seen: {formatRelativeTime(previousLastVisit)}
                    </span>
                  </>
                ) : (
                  <span className="v4-visit">Cache not initialized</span>
                )}
              </div>

              {notice === "saved" ? <p className="v4-notice v4-notice-ok">DATA CACHED SUCCESSFULLY</p> : null}
              {notice === "purged" ? <p className="v4-notice v4-notice-warn">CACHE PURGED</p> : null}
            </div>
          </div>

          <ExplanationTriggerButton versionId="v4" />
        </main>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#00F0FF" thumbHoverColor="#00D4E0" />
    </>
  );
}

