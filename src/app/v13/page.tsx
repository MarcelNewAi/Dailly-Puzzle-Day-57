"use client";

import { Inter, Space_Grotesk } from "next/font/google";
import { useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import CodeSnippet from "./components/CodeSnippet";
import ColorCustomizer from "./components/ColorCustomizer";
import FeatureGrid from "./components/FeatureGrid";
import LongContentDemo from "./components/LongContentDemo";
import ShowcaseHeader from "./components/ShowcaseHeader";
import VariantDemo from "./components/VariantDemo";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-v13-heading",
  weight: ["500", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-v13-body",
  weight: ["400", "500", "600", "700"],
});

const DEFAULT_THUMB_COLOR = "#10B981";
const DEFAULT_HOVER_COLOR = "#34D399";

export default function V13Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumbColor, setThumbColor] = useState(DEFAULT_THUMB_COLOR);
  const [hoverColor, setHoverColor] = useState(DEFAULT_HOVER_COLOR);
  const [showTrack, setShowTrack] = useState(true);

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main
          className={`${headingFont.variable} ${bodyFont.variable} min-h-screen bg-[#0A0F0D] text-emerald-50`}
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 10%, rgba(16, 185, 129, 0.13), transparent 42%), radial-gradient(circle at 88% 16%, rgba(52, 211, 153, 0.09), transparent 34%)",
            fontFamily: "var(--font-v13-body), Inter, sans-serif",
          }}
        >
          <ShowcaseHeader />
          <FeatureGrid />

          <section className="mx-auto w-full max-w-6xl px-6 pb-12 md:px-10">
            <ColorCustomizer
              thumbColor={thumbColor}
              hoverColor={hoverColor}
              showTrack={showTrack}
              onThumbColorChange={setThumbColor}
              onHoverColorChange={setHoverColor}
              onShowTrackChange={setShowTrack}
              onReset={() => {
                setThumbColor(DEFAULT_THUMB_COLOR);
                setHoverColor(DEFAULT_HOVER_COLOR);
                setShowTrack(true);
              }}
            />
          </section>

          <section className="mx-auto w-full max-w-6xl px-6 pb-12 md:px-10">
            <VariantDemo thumbColor={thumbColor} hoverColor={hoverColor} showTrack={showTrack} />
          </section>

          <section className="mx-auto w-full max-w-6xl px-6 pb-12 md:px-10">
            <CodeSnippet />
          </section>

          <section className="mx-auto w-full max-w-6xl px-6 pb-12 md:px-10">
            <div className="rounded-2xl border border-emerald-400/25 bg-[#101a16]/85 p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)]">
              <h2 className="text-2xl font-semibold text-emerald-50">Props Reference</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm text-emerald-100/85">
                  <thead>
                    <tr className="border-b border-emerald-400/20 text-emerald-200">
                      <th className="px-3 py-2 font-semibold">Prop</th>
                      <th className="px-3 py-2 font-semibold">Type</th>
                      <th className="px-3 py-2 font-semibold">Default</th>
                      <th className="px-3 py-2 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-emerald-400/10">
                      <td className="px-3 py-2 font-mono">scrollContainerRef</td>
                      <td className="px-3 py-2 font-mono">RefObject&lt;HTMLElement&gt;</td>
                      <td className="px-3 py-2">required</td>
                      <td className="px-3 py-2">Target scroll container ref.</td>
                    </tr>
                    <tr className="border-b border-emerald-400/10">
                      <td className="px-3 py-2 font-mono">variant</td>
                      <td className="px-3 py-2 font-mono">'page' | 'card'</td>
                      <td className="px-3 py-2">'page'</td>
                      <td className="px-3 py-2">Page-fixed or parent-contained behavior.</td>
                    </tr>
                    <tr className="border-b border-emerald-400/10">
                      <td className="px-3 py-2 font-mono">className</td>
                      <td className="px-3 py-2 font-mono">string</td>
                      <td className="px-3 py-2">''</td>
                      <td className="px-3 py-2">Optional wrapper class overrides.</td>
                    </tr>
                    <tr className="border-b border-emerald-400/10">
                      <td className="px-3 py-2 font-mono">thumbColor</td>
                      <td className="px-3 py-2 font-mono">string</td>
                      <td className="px-3 py-2">'#d32f2f'</td>
                      <td className="px-3 py-2">Base thumb color.</td>
                    </tr>
                    <tr className="border-b border-emerald-400/10">
                      <td className="px-3 py-2 font-mono">thumbHoverColor</td>
                      <td className="px-3 py-2 font-mono">string</td>
                      <td className="px-3 py-2">undefined</td>
                      <td className="px-3 py-2">Hover/drag thumb color override.</td>
                    </tr>
                    <tr className="border-b border-emerald-400/10">
                      <td className="px-3 py-2 font-mono">trackColorLight</td>
                      <td className="px-3 py-2 font-mono">string</td>
                      <td className="px-3 py-2">rgba(0, 0, 0, 0.05)</td>
                      <td className="px-3 py-2">Track color used by the rendered track element.</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono">trackColorDark</td>
                      <td className="px-3 py-2 font-mono">string</td>
                      <td className="px-3 py-2">rgba(255, 255, 255, 0.05)</td>
                      <td className="px-3 py-2">Available dark-track color prop.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10">
            <LongContentDemo />
          </section>

          <ExplanationTriggerButton versionId="v13" />
        </main>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        thumbColor={thumbColor}
        thumbHoverColor={hoverColor}
        trackColorLight={showTrack ? "rgba(255, 255, 255, 0.14)" : "transparent"}
        trackColorDark={showTrack ? "rgba(255, 255, 255, 0.14)" : "transparent"}
      />
    </>
  );
}
