"use client";

import { useRef } from "react";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";

interface VariantDemoProps {
  thumbColor: string;
  hoverColor: string;
  showTrack: boolean;
}

const pageVariantSnippet = `<CustomScrollbar\n  scrollContainerRef={scrollRef}\n  variant=\"page\"\n  thumbColor=\"#10B981\"\n  thumbHoverColor=\"#34D399\"\n/>`;

const cardVariantSnippet = `<CustomScrollbar\n  scrollContainerRef={cardRef}\n  variant=\"card\"\n  thumbColor=\"#10B981\"\n  thumbHoverColor=\"#34D399\"\n/>`;

export default function VariantDemo({ thumbColor, hoverColor, showTrack }: VariantDemoProps) {
  const cardScrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="rounded-2xl border border-emerald-400/25 bg-[#101a16]/85 p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)]">
      <h2 className="text-2xl font-semibold text-emerald-50">Variant Comparison</h2>
      <p className="mt-2 text-sm text-emerald-100/75">Use page variant for viewport-level scroll and card variant for isolated panels.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-emerald-400/20 bg-[#0e1713] p-4">
          <h3 className="text-lg font-semibold text-emerald-100">Page Variant</h3>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100/75">
            This page uses <code>variant=\"page\"</code>. The scrollbar is fixed to the viewport edge and follows the main page scroll.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-emerald-400/20 bg-[#0a120f] p-3 text-xs text-emerald-200">
            <code>{pageVariantSnippet}</code>
          </pre>
        </article>

        <article className="rounded-xl border border-emerald-400/20 bg-[#0e1713] p-4">
          <h3 className="text-lg font-semibold text-emerald-100">Card Variant</h3>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100/75">
            The panel below has its own scroll container and independent <code>variant=\"card\"</code> scrollbar.
          </p>

          <div className="relative mt-4 h-72 rounded-lg border border-emerald-400/20 bg-[#09110e] p-4">
            <div ref={cardScrollRef} className="h-full overflow-y-auto pr-3 hide-native-scrollbar">
              <div className="space-y-3">
                {Array.from({ length: 14 }).map((_, index) => (
                  <div key={index} className="rounded-lg border border-emerald-400/15 bg-[#10201a] p-3">
                    <p className="text-sm font-medium text-emerald-100">Card Item {index + 1}</p>
                    <p className="mt-1 text-xs leading-relaxed text-emerald-100/70">
                      Independent scrollable content in a contained panel. Drag the thumb to verify precision and isolation.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <CustomScrollbar
              scrollContainerRef={cardScrollRef}
              variant="card"
              thumbColor={thumbColor}
              thumbHoverColor={hoverColor}
              trackColorLight={showTrack ? "rgba(255, 255, 255, 0.14)" : "transparent"}
              trackColorDark={showTrack ? "rgba(255, 255, 255, 0.14)" : "transparent"}
            />
          </div>

          <pre className="mt-4 overflow-x-auto rounded-lg border border-emerald-400/20 bg-[#0a120f] p-3 text-xs text-emerald-200">
            <code>{cardVariantSnippet}</code>
          </pre>
        </article>
      </div>
    </section>
  );
}
