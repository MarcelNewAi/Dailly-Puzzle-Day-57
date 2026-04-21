"use client";

import { useState } from "react";
import type { FAQ } from "../../data";

interface FaqBlockProps {
  serviceName: string;
  faqs: FAQ[];
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={isOpen ? "v22-chevron is-open" : "v22-chevron"}>
      <path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FaqBlock({ serviceName, faqs }: FaqBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="v22-block">
      <p className="v22-block-label">Frequently asked questions</p>
      <h2 className="v22-block-title">Common questions about {serviceName}</h2>

      <div className="v22-faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <article key={faq.question} className={`v22-faq-item ${isOpen ? "is-open" : ""}`}>
              <button
                type="button"
                className="v22-faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              >
                <span>{faq.question}</span>
                <ChevronIcon isOpen={isOpen} />
              </button>

              <div className="v22-faq-answer" aria-hidden={!isOpen}>
                <div className="v22-faq-answer-inner">{faq.answer}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
