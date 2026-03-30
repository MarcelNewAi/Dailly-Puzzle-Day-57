"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects are completed within 4-8 weeks depending on complexity. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes! We offer monthly maintenance plans to keep your site updated, secure, and performing at its best.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We primarily work with React, Next.js, and TypeScript. We choose the best tools for each project's specific needs.",
  },
  {
    question: "Can I update content myself?",
    answer:
      "Absolutely. We build with user-friendly CMS integrations so you can easily update text, images, and content without any coding knowledge.",
  },
] as const;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="v7-site-section">
      <div className="v7-site-shell">
        <h2 className="v7-site-heading">Frequently Asked Questions</h2>
        <div className="v7-faq-list">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={faq.question} className={`v7-faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="v7-faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => {
                    setOpenIndex((current) => (current === index ? -1 : index));
                  }}
                >
                  <span>{faq.question}</span>
                  <span className="v7-faq-chevron" aria-hidden="true">
                    ?
                  </span>
                </button>
                <div className="v7-faq-answer-wrap">
                  <div className="v7-faq-answer">{faq.answer}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}