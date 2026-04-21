"use client";

import { useEffect, useMemo, useState } from "react";
import { pad } from "../countdown";

interface CountdownDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const COLON_FLASH_MS = 220;

function renderDigitPair(value: number, unit: string, colorClassName: string) {
  const digits = pad(value).split("");

  return digits.map((digit, index) => (
    <span
      key={`${unit}-${index}-${digit}`}
      className={`v25-digit v25-digit-flip ${colorClassName}`.trim()}
    >
      {digit}
    </span>
  ));
}

export default function CountdownDisplay({ hours, minutes, seconds }: CountdownDisplayProps) {
  const [isColonFlashing, setIsColonFlashing] = useState(false);

  useEffect(() => {
    if (seconds !== 0) {
      return;
    }

    setIsColonFlashing(true);
    const timer = window.setTimeout(() => {
      setIsColonFlashing(false);
    }, COLON_FLASH_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [seconds]);

  const digitColorClassName = useMemo(() => {
    if (hours === 0 && minutes < 10) {
      return "v25-digit--red";
    }

    if (hours < 1) {
      return "v25-digit--amber";
    }

    return "";
  }, [hours, minutes]);

  const separatorClassName = `v25-digit-separator ${isColonFlashing ? "v25-colon--flash" : ""}`.trim();

  return (
    <div className="v25-digits-row" role="timer" aria-live="polite" aria-atomic="true">
      <div className="v25-digit-group v25-digit-group--hours">
        <div className="v25-digit-pair">{renderDigitPair(hours, "h", digitColorClassName)}</div>
        <span className="v25-digit-label">HRS</span>
      </div>

      <span className={separatorClassName} aria-hidden="true">
        :
      </span>

      <div className="v25-digit-group v25-digit-group--minutes">
        <div className="v25-digit-pair">{renderDigitPair(minutes, "m", digitColorClassName)}</div>
        <span className="v25-digit-label">MIN</span>
      </div>

      <span className={separatorClassName} aria-hidden="true">
        :
      </span>

      <div className="v25-digit-group v25-digit-group--seconds">
        <div className="v25-digit-pair">{renderDigitPair(seconds, "s", digitColorClassName)}</div>
        <span className="v25-digit-label">SEC</span>
      </div>
    </div>
  );
}
