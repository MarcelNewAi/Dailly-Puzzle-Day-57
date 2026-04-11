"use client";

import { useEffect, useState } from "react";

const usageSnippet = `import { useRef } from 'react';
import { CustomScrollbar } from '@/components/ui/CustomScrollbar';

export default function MyPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        {/* your content */}
      </div>
      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor="#10B981"
        thumbHoverColor="#34D399"
      />
    </>
  );
}`;

export default function CodeSnippet() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(usageSnippet);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="rounded-2xl border border-emerald-400/25 bg-[#101a16]/85 p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-emerald-50">Usage Code Example</h2>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-emerald-400/55 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
        >
          Copy Code
        </button>
      </div>

      <pre className="mt-4 overflow-x-auto rounded-xl border border-emerald-400/25 bg-[#08100d] p-4 text-xs leading-relaxed text-emerald-200 md:text-sm">
        <code>{usageSnippet}</code>
      </pre>

      <p className={`mt-3 text-sm text-emerald-300 transition-opacity ${copied ? "opacity-100" : "opacity-0"}`} role="status" aria-live="polite">
        Copied.
      </p>
    </section>
  );
}
