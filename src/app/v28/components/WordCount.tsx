"use client";

import { countWords } from "../autosave";

interface WordCountProps {
  body: string;
  title: string;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-GB").format(value);
}

export default function WordCount({ body, title }: WordCountProps) {
  const words = countWords(body);
  const characters = `${title}${body}`.length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="v28-wordcount-row" aria-live="polite">
      <span>{formatNumber(words)} words</span>
      <span className="v28-wordcount-dot" aria-hidden="true">
        ·
      </span>
      <span>{formatNumber(characters)} characters</span>
      <span className="v28-wordcount-dot" aria-hidden="true">
        ·
      </span>
      <span>~{readTime} min read</span>
    </div>
  );
}

