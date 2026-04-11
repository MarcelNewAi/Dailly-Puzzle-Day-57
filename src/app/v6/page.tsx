"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import GalleryHeader from "./components/GalleryHeader";
import Lightbox from "./components/Lightbox";
import MasonryGrid, { type GalleryImageData } from "./components/MasonryGrid";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--v6-font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--v6-font-body",
});

const categories = ["All", "Nature", "Architecture", "People"] as const;
type Category = (typeof categories)[number];

const galleryImages: GalleryImageData[] = [
  { id: 1, src: "https://picsum.photos/seed/gallery1/600/400", width: 600, height: 400, title: "Mountain Dawn", category: "Nature", photographer: "Alex Rivera" },
  { id: 2, src: "https://picsum.photos/seed/gallery2/600/800", width: 600, height: 800, title: "Urban Geometry", category: "Architecture", photographer: "Mia Chen" },
  { id: 3, src: "https://picsum.photos/seed/gallery3/600/500", width: 600, height: 500, title: "Ocean Mist", category: "Nature", photographer: "James Cole" },
  { id: 4, src: "https://picsum.photos/seed/gallery4/600/750", width: 600, height: 750, title: "Concrete Jungle", category: "Architecture", photographer: "Sara Novak" },
  { id: 5, src: "https://picsum.photos/seed/gallery5/600/350", width: 600, height: 350, title: "Golden Fields", category: "Nature", photographer: "Leo Park" },
  { id: 6, src: "https://picsum.photos/seed/gallery6/600/600", width: 600, height: 600, title: "Street Portrait", category: "People", photographer: "Dana Cruz" },
  { id: 7, src: "https://picsum.photos/seed/gallery7/600/900", width: 600, height: 900, title: "Glass Tower", category: "Architecture", photographer: "Kai Tanaka" },
  { id: 8, src: "https://picsum.photos/seed/gallery8/600/450", width: 600, height: 450, title: "Autumn Trail", category: "Nature", photographer: "Rina Patel" },
  { id: 9, src: "https://picsum.photos/seed/gallery9/600/700", width: 600, height: 700, title: "Night Market", category: "People", photographer: "Tom Brewer" },
  { id: 10, src: "https://picsum.photos/seed/gallery10/600/380", width: 600, height: 380, title: "Desert Sunset", category: "Nature", photographer: "Ava Stone" },
  { id: 11, src: "https://picsum.photos/seed/gallery11/600/850", width: 600, height: 850, title: "Cathedral Light", category: "Architecture", photographer: "Noah Voss" },
  { id: 12, src: "https://picsum.photos/seed/gallery12/600/500", width: 600, height: 500, title: "City Rain", category: "People", photographer: "Ella Marsh" },
  { id: 13, src: "https://picsum.photos/seed/gallery13/600/650", width: 600, height: 650, title: "Misty Forest", category: "Nature", photographer: "Liam Ford" },
  { id: 14, src: "https://picsum.photos/seed/gallery14/600/420", width: 600, height: 420, title: "Rooftop View", category: "Architecture", photographer: "Zoe Hart" },
  { id: 15, src: "https://picsum.photos/seed/gallery15/600/780", width: 600, height: 780, title: "Market Colors", category: "People", photographer: "Oscar Ruiz" },
  { id: 16, src: "https://picsum.photos/seed/gallery16/600/550", width: 600, height: 550, title: "Frozen Lake", category: "Nature", photographer: "Ivy Bloom" },
];

export default function V6Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [displayedImages, setDisplayedImages] = useState<GalleryImageData[]>(galleryImages);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isFilteringOut, setIsFilteringOut] = useState<boolean>(false);
  const [animationSeed, setAnimationSeed] = useState<number>(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCategoryChange = useCallback((nextCategory: string) => {
    const targetCategory = nextCategory as Category;
    if (targetCategory === activeCategory) {
      return;
    }

    setIsFilteringOut(true);

    timeoutRef.current = window.setTimeout(() => {
      const filtered = targetCategory === "All"
        ? galleryImages
        : galleryImages.filter((image) => image.category === targetCategory);

      setActiveCategory(targetCategory);
      setDisplayedImages(filtered);
      setSelectedIndex(-1);
      setAnimationSeed((seed) => seed + 1);
      setIsFilteringOut(false);
    }, 200);
  }, [activeCategory]);

  const canOpenLightbox = displayedImages.length > 0;

  const footerText = useMemo(() => {
    return `${displayedImages.length} images | Masonry Layout | Built with CSS Columns`;
  }, [displayedImages.length]);

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className={`${playfairDisplay.variable} ${dmSans.variable} v6-page`}>
          <GalleryHeader
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <MasonryGrid
            key={animationSeed}
            images={displayedImages}
            isFilteringOut={isFilteringOut}
            onImageClick={(index) => {
              if (canOpenLightbox) {
                setSelectedIndex(index);
              }
            }}
          />

          <footer className="v6-footer" aria-live="polite">
            {footerText}
          </footer>

          <Lightbox
            images={displayedImages}
            currentIndex={selectedIndex}
            onClose={() => setSelectedIndex(-1)}
            onPrev={() => {
              setSelectedIndex((current) => {
                if (current < 0 || displayedImages.length === 0) {
                  return -1;
                }
                return (current - 1 + displayedImages.length) % displayedImages.length;
              });
            }}
            onNext={() => {
              setSelectedIndex((current) => {
                if (current < 0 || displayedImages.length === 0) {
                  return -1;
                }
                return (current + 1) % displayedImages.length;
              });
            }}
          />

          <ExplanationTriggerButton versionId="v6" />
        </main>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#D4A574" thumbHoverColor="#B8884C" />
    </>
  );
}


