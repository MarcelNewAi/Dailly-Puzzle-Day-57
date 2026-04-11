"use client";

import { useRef } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";

export default function VersionThreePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <main className="min-h-screen bg-[#fef9ef] px-6 py-14 text-black md:px-10">
          <section className="mx-auto grid max-w-6xl gap-4 md:grid-cols-6 md:grid-rows-3">
            <div className="md:col-span-4 md:row-span-2 rounded-3xl border-2 border-black bg-[#ff6b6b] p-8 shadow-[4px_4px_0_0_#000]">
              <p className="text-sm font-bold tracking-[0.16em] uppercase">Neobrutalism / Bento</p>
              <h1 className="mt-4 text-4xl leading-tight font-black uppercase md:text-6xl">Launch Loud. Build Fast.</h1>
              <p className="mt-5 max-w-lg text-base font-medium">
                Purposeful chaos, vibrant modules, and playful systems engineered for conversion.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button className="rounded-2xl border-2 border-black bg-[#ffe66d] px-5 py-3 font-bold shadow-[4px_4px_0_0_#000] transition hover:translate-y-1">
                  Start Project
                </button>
                <button className="rounded-2xl border-2 border-black bg-white px-5 py-3 font-bold shadow-[4px_4px_0_0_#000] transition hover:translate-y-1">
                  View Deck
                </button>
              </div>
            </div>

            <div className="md:col-span-2 rounded-[2rem] border-2 border-black bg-[#4ecdc4] p-6 shadow-[4px_4px_0_0_#000] rotate-1">
              <p className="text-sm font-bold uppercase">Play Cell</p>
              <div className="mt-4 text-7xl [animation:spin_8s_linear_infinite]">??</div>
            </div>

            <div className="md:col-span-2 rounded-2xl border-2 border-black bg-[#ffe66d] p-6 shadow-[4px_4px_0_0_#000] -rotate-1">
              <p className="text-3xl font-black">31%</p>
              <p className="mt-2 text-sm font-semibold">Average conversion lift on launch pages.</p>
            </div>

            <div className="md:col-span-2 rounded-2xl border-2 border-black bg-white p-6 shadow-[4px_4px_0_0_#000] rotate-1">
              <p className="text-3xl font-black">5 Weeks</p>
              <p className="mt-2 text-sm font-semibold">From kickoff to polished marketing release.</p>
            </div>
          </section>

          <section className="relative mx-auto mt-14 max-w-5xl py-8">
            <h2 className="text-4xl font-black uppercase">About</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="relative z-10 rounded-3xl border-2 border-black bg-white p-6 shadow-[4px_4px_0_0_#000]">
                <h3 className="text-xl font-black">Human-first Experiments</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed">
                  We blend playful visual systems with performance-focused UX patterns to make each visit memorable.
                </p>
              </article>
              <article className="relative -mt-3 rounded-3xl border-2 border-black bg-[#4ecdc4] p-6 shadow-[4px_4px_0_0_#000] md:-ml-8 md:mt-6">
                <h3 className="text-xl font-black">Built for Teams</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed">
                  Structured handoff, clear components, and battle-tested launch rituals across product, design, and growth.
                </p>
              </article>
            </div>
          </section>

          <ExplanationTriggerButton versionId="v3" />
        </main>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#FF6B6B" thumbHoverColor="#E85A5A" />
    </>
  );
}
