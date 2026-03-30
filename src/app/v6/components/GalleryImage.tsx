import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImageData } from "./MasonryGrid";

interface GalleryImageProps {
  image: GalleryImageData;
  index: number;
  onClick: () => void;
}

export default function GalleryImage({ image, index, onClick }: GalleryImageProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`v6-masonry-item v6-gallery-card ${isVisible ? "is-visible" : ""}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        type="button"
        className="v6-gallery-hit"
        onClick={onClick}
        aria-label={`Open image ${image.title} by ${image.photographer}`}
      >
        <span className="v6-category-badge">{image.category}</span>

        <Image
          src={image.src}
          alt={image.title}
          width={image.width}
          height={image.height}
          className="v6-gallery-img"
          loading="lazy"
          unoptimized
        />

        <span className="v6-overlay" aria-hidden="true">
          <span className="v6-overlay-title">{image.title}</span>
          <span className="v6-overlay-meta">{image.photographer}</span>
        </span>
      </button>
    </div>
  );
}

