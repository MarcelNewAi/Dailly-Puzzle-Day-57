"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "How does the free trial work?",
    answer:
      "You get full access to all Pro features for 14 days. No credit card required. At the end of your trial, you can choose a plan or continue with our free Starter plan.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We're SOC2 Type II certified, use 256-bit encryption, and your data is backed up across multiple regions. We take security extremely seriously.",
  },
  {
    question: "Do you offer team onboarding?",
    answer:
      "Pro and Enterprise plans include dedicated onboarding sessions. Our team will help you migrate your workflows and get set up quickly.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We integrate with GitHub, GitLab, Slack, Jira, Linear, Notion, and 50+ other tools. Custom integrations are available on Enterprise plans.",
  },
] as const;

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7 10 5 5 5-5-1.4-1.4-3.6 3.6-3.6-3.6L7 10Z" />
    </svg>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="v9-shell">
      <header className="v9-section-header v9-reveal v9-delay-0">
        <h2 className="v9-display-title v9-section-title">Frequently Asked Questions</h2>
      </header>

      <div className="v9-faq-list v9-reveal v9-delay-1">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `v9-faq-answer-${index}`;

          return (
            <article key={item.question} className={`v9-faq-item ${isOpen ? "is-open" : ""}`.trim()}>
              <button
                type="button"
                className="v9-faq-trigger"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
              >
                <span>{item.question}</span>
                <span className="v9-faq-chevron" aria-hidden="true">
                  <ChevronIcon />
                </span>
              </button>
              <div id={answerId} className="v9-faq-answer-wrap">
                <div className="v9-faq-answer">{item.answer}</div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

