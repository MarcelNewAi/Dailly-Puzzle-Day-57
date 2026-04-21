"use client";

import { useRef } from "react";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";

interface PreviewScrollAreaProps {
  accentColor: string;
  accentHoverColor: string;
  scrollbarWidth: number;
}

const LOREM_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae laoreet nibh. Donec sed turpis ut lectus tempor fermentum. Curabitur consectetur, nibh sed dictum consectetur, orci lorem accumsan nisl, non porttitor ipsum purus non nibh.",
  "Suspendisse tincidunt sem non mauris feugiat, quis tincidunt arcu feugiat. Integer volutpat vehicula purus, non luctus nunc pretium nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  "Mauris pharetra, risus nec tristique blandit, ipsum mi sagittis erat, vel gravida sem velit in tellus. Etiam in luctus nisl. Cras faucibus tempus erat, vitae blandit metus pellentesque et.",
  "Aenean porttitor lobortis magna, id vehicula augue pellentesque a. Quisque interdum est eu dolor hendrerit, ac consectetur dui consectetur. Pellentesque molestie ligula a erat vulputate eleifend.",
  "Sed non mi in ipsum ullamcorper volutpat. Nam suscipit feugiat velit, a dignissim ligula posuere ut. Praesent quis massa ut nibh rhoncus malesuada. Donec viverra risus at justo cursus pellentesque.",
  "Vivamus tristique fermentum arcu, vel vulputate justo dapibus vitae. In hac habitasse platea dictumst. In efficitur, elit non vestibulum malesuada, augue mi laoreet magna, vitae fermentum sem mauris vitae augue.",
];

export default function PreviewScrollArea({ accentColor, accentHoverColor, scrollbarWidth }: PreviewScrollAreaProps) {
  const cardScrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="v17-preview-section">
      <h2 className="v17-section-title">SCROLL AREA</h2>
      <div className="v17-scroll-area-shell">
        <div ref={cardScrollRef} className="v17-scroll-area hide-native-scrollbar">
          {LOREM_PARAGRAPHS.map((paragraph, index) => (
            <p key={`v17-scroll-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
        <CustomScrollbar
          scrollContainerRef={cardScrollRef}
          variant="card"
          thumbColor={accentColor}
          thumbHoverColor={accentHoverColor}
          thumbWidth={scrollbarWidth}
          trackColorLight="var(--v17-border)"
        />
      </div>
    </section>
  );
}
