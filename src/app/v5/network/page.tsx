"use client";

import { useRef } from "react";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import NodeGrid from "../components/network/NodeGrid";

export default function V5NetworkPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={scrollRef} className="h-screen overflow-y-auto hide-native-scrollbar">
        <div className="nq-page">
          <section className="nq-network-header nq-anim-rise nq-anim-delay-1">
            <h1 className="nq-page-title">Quantum Network Grid</h1>
            <p className="nq-page-subtitle">Real-time status of all Nexus-Q compute nodes</p>
          </section>
          <NodeGrid />
        </div>
      </div>
      <CustomScrollbar scrollContainerRef={scrollRef} variant="page" thumbColor="#00F0FF" thumbHoverColor="#00D4E0" />
    </>
  );
}
