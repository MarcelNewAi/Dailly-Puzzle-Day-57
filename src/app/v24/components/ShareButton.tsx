"use client";

import { useEffect, useRef, useState } from "react";

interface ShareButtonProps {
  shareUrl: string;
  isValid: boolean;
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m5.2 12.6 4.1 4.1 9.5-9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ShareButton({ shareUrl, isValid }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const className = [
    "v24-share-btn",
    copied ? "v24-share-btn--copied" : "",
    !isValid ? "v24-share-btn--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      disabled={!isValid}
      onClick={async () => {
        if (!isValid) {
          return;
        }

        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);

        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
      <span className="v24-share-btn-icon" aria-hidden="true">
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
      <span>{copied ? "Copied!" : "Copy share link"}</span>
    </button>
  );
}
