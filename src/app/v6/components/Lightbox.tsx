import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import type { GalleryImageData } from "./MasonryGrid";

interface LightboxProps {
  images: GalleryImageData[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = currentIndex >= 0 && currentIndex < images.length;

  const currentImage = useMemo(() => {
    if (!isOpen) {
      return null;
    }
    return images[currentIndex];
  }, [images, currentIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const lightbox = lightboxRef.current;
      if (!lightbox) {
        return;
      }

      const focusable = Array.from(
        lightbox.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((node) => !node.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!currentImage) {
    return null;
  }

  return (
    <div
      ref={lightboxRef}
      className="v6-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer for ${currentImage.title}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="v6-lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        X
      </button>

      <button
        type="button"
        className="v6-lightbox-arrow v6-lightbox-arrow-left"
        onClick={onPrev}
        aria-label="Previous image"
      >
        {'<'}
      </button>

      <button
        type="button"
        className="v6-lightbox-arrow v6-lightbox-arrow-right"
        onClick={onNext}
        aria-label="Next image"
      >
        {'>'}
      </button>

      <div className="v6-lightbox-content" onMouseDown={(event) => event.stopPropagation()}>
        <Image
          src={currentImage.src}
          alt={currentImage.title}
          width={currentImage.width}
          height={currentImage.height}
          className="v6-lightbox-image"
          loading="lazy"
          unoptimized
        />

        <div className="v6-lightbox-meta">
          <h2 className="v6-lightbox-title">{currentImage.title}</h2>
          <p className="v6-lightbox-detail">{currentImage.photographer}</p>
          <p className="v6-lightbox-detail">{currentImage.category}</p>
        </div>
      </div>
    </div>
  );
}



