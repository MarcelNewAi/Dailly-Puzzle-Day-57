"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type SectionWrapperProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

export default function SectionWrapper({ id, className = "", children }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={id} className={`v9-section ${className} ${isVisible ? "is-visible" : ""}`.trim()}>
      {children}
    </section>
  );
}

