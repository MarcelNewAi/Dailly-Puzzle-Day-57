"use client";

import { useEffect, useRef, useState } from "react";

type OfferPhase = "active" | "expired" | "sold-out";

interface ClaimButtonProps {
  onClaim: () => void;
  spotsRemaining: number;
  phase: OfferPhase;
}

type ClaimState = "idle" | "claiming" | "claimed";

export default function ClaimButton({ onClaim, spotsRemaining, phase }: ClaimButtonProps) {
  const [claimState, setClaimState] = useState<ClaimState>("idle");
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const isExpired = phase === "expired";
  const isSoldOut = phase === "sold-out" || spotsRemaining === 0;
  const isActive = phase === "active" && spotsRemaining > 0;
  const isDisabled = !isActive || claimState !== "idle";

  const handleClick = () => {
    if (!isActive || claimState !== "idle") {
      return;
    }

    setClaimState("claiming");
    onClaim();

    const claimingTimer = window.setTimeout(() => {
      setClaimState("claimed");
    }, 200);

    const resetTimer = window.setTimeout(() => {
      setClaimState("idle");
    }, 1700);

    timersRef.current.push(claimingTimer, resetTimer);
  };

  let label = "CLAIM YOUR SPOT";
  if (isExpired) {
    label = "OFFER EXPIRED";
  } else if (isSoldOut) {
    label = "ALL SPOTS TAKEN";
  } else if (claimState === "claiming") {
    label = "CLAIMING...";
  } else if (claimState === "claimed") {
    label = "SPOT CLAIMED";
  }

  return (
    <button
      type="button"
      className={`v25-claim-btn ${isDisabled ? "v25-claim-btn--disabled" : ""}`.trim()}
      onClick={handleClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      <span>{label}</span>
      {isActive && claimState === "idle" ? (
        <svg className="v25-claim-arrow" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 12h15m0 0-5-5m5 5-5 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </button>
  );
}
