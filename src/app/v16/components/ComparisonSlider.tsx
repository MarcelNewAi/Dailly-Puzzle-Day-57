"use client";

import { useEffect, useRef, useState } from "react";

export interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

const KEYBOARD_STEP = 5;

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export default function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  aspectRatio = "16/10",
}: ComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasBootstrapped, setHasBootstrapped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedFromHandleRef = useRef(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHasBootstrapped(true);
      setSliderPos(50);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const updatePosition = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) {
      return;
    }
    const x = clientX - rect.left;
    const percent = clampPercent((x / rect.width) * 100);
    setSliderPos(percent);
  };

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      startedFromHandleRef.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        return;
      }
      updatePosition(event.touches[0].clientX);
    };

    const onTouchEnd = () => {
      setIsDragging(false);
      startedFromHandleRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="v16-slider"
      style={{ aspectRatio }}
      onMouseDown={(event) => {
        if (startedFromHandleRef.current) {
          return;
        }
        setIsDragging(true);
        updatePosition(event.clientX);
      }}
      onTouchStart={(event) => {
        if (event.touches.length === 0 || startedFromHandleRef.current) {
          return;
        }
        setIsDragging(true);
        updatePosition(event.touches[0].clientX);
      }}
      onTouchMove={(event) => {
        if (!isDragging || event.touches.length === 0) {
          return;
        }
        updatePosition(event.touches[0].clientX);
      }}
      onTouchEnd={() => {
        setIsDragging(false);
        startedFromHandleRef.current = false;
      }}
      onClick={(event) => {
        updatePosition(event.clientX);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="v16-slider-image" src={beforeImage} alt={`${beforeLabel} image`} draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`v16-slider-image v16-slider-after ${hasBootstrapped && !isDragging ? "is-animated" : ""}`}
        src={afterImage}
        alt={`${afterLabel} image`}
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      />

      <div className="v16-slider-label v16-slider-label-before">{beforeLabel}</div>
      <div className="v16-slider-label v16-slider-label-after">{afterLabel}</div>

      <div
        className={`v16-slider-divider ${hasBootstrapped && !isDragging ? "is-animated" : ""}`}
        style={{ left: `${sliderPos}%` }}
      >
        <button
          type="button"
          className="v16-slider-handle"
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPos)}
          aria-valuetext={`${Math.round(sliderPos)}%`}
          tabIndex={0}
          onMouseDown={(event) => {
            event.stopPropagation();
            startedFromHandleRef.current = true;
            setIsDragging(true);
            updatePosition(event.clientX);
          }}
          onTouchStart={(event) => {
            event.stopPropagation();
            if (event.touches.length === 0) {
              return;
            }
            startedFromHandleRef.current = true;
            setIsDragging(true);
            updatePosition(event.touches[0].clientX);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setSliderPos((current) => clampPercent(current - KEYBOARD_STEP));
              return;
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              setSliderPos((current) => clampPercent(current + KEYBOARD_STEP));
              return;
            }
            if (event.key === "Home") {
              event.preventDefault();
              setSliderPos(0);
              return;
            }
            if (event.key === "End") {
              event.preventDefault();
              setSliderPos(100);
            }
          }}
        >
          <span aria-hidden="true" className="v16-slider-handle-icon">
            <span>←</span>
            <span>→</span>
          </span>
        </button>
      </div>
    </div>
  );
}
