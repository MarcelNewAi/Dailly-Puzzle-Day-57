"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ComponentExplanationModal from "./ComponentExplanationModal";

interface VersionLink {
  id: string;
  title: string;
  description: string;
  href: string;
  keywords?: string[];
}

const links: VersionLink[] = [
  { id: "V1", title: "Minimal Brutalist Landing", description: "High-contrast agency-style hero and stats", href: "/" },
  { id: "V2", title: "Glassmorphism Video Hero", description: "Gradient background with immersive motion video", href: "/v2" },
  { id: "V3", title: "Neobrutalist Bento Layout", description: "Playful card grid with bold geometric blocks", href: "/v3" },
  { id: "V4", title: "Smart Contact Form", description: "Cyber form with local storage memory", href: "/v4" },
  { id: "V5", title: "Nexus-Q Dashboard", description: "Quantum-inspired system console and tools", href: "/v5" },
  { id: "V6", title: "Masonry Gallery", description: "Filterable photo wall with lightbox", href: "/v6" },
  { id: "V7", title: "Section Builder", description: "Drag-drop landing page composition", href: "/v7" },
  { id: "V8", title: "Theme Customizer", description: "Live design token and style controls", href: "/v8" },
  { id: "V9", title: "SaaS Storytelling Page", description: "Narrative conversion page with sticky CTA", href: "/v9" },
  { id: "V10", title: "ROI Calculator", description: "Business impact and savings estimator", href: "/v10" },
  { id: "V11", title: "Exit Intent Lead Capture", description: "Behavior-driven modal capture flow", href: "/v11" },
  { id: "V12", title: "Service Inquiry Router", description: "Guided qualification quiz and recommendation", href: "/v12" },
  { id: "V13", title: "Custom Scrollbar", description: "Reusable draggable scrollbar with live theming", href: "/v13" },
  {
    id: "V14",
    title: "Service Area Checker",
    description: "Instant location coverage checker with smart matching",
    href: "/v14",
    keywords: ["area", "service", "location", "checker", "postcode", "v14"],
  },
  {
    id: "V15",
    title: "Photo Quote Request",
    description: "Multi-photo upload form with live validation",
    href: "/v15",
    keywords: ["photo", "quote", "upload", "form", "v15"],
  },
  {
    id: "V16",
    title: "Before / After Slider",
    description: "Draggable image comparison with touch support",
    href: "/v16",
    keywords: ["before", "after", "comparison", "slider", "v16"],
  },
  {
    id: "V17",
    title: "Design Lab",
    description: "Full-stack theme customizer with live preview",
    href: "/v17",
    keywords: ["design", "lab", "customize", "theme", "v17"],
  },
  {
    id: "V18",
    title: "Business Hours Checker",
    description: "Real-time open/closed status with dynamic CTA",
    href: "/v18",
    keywords: ["hours", "open", "closed", "schedule", "business", "v18"],
  },
  {
    id: "V19",
    title: "Readiness Checker",
    description: "Live checklist with progress ring and dynamic CTA",
    href: "/v19",
    keywords: ["readiness", "checklist", "checker", "progress", "v19"],
  },
  {
    id: "V20",
    title: "Location Switcher",
    description: "Multi-location contact with persistent selection",
    href: "/v20",
    keywords: ["location", "branch", "switcher", "contact", "office", "v20"],
  },
  {
    id: "V21",
    title: "Issue Diagnosis Wizard",
    description: "Branching troubleshooter with pre-filled ticket summary",
    href: "/v21",
    keywords: ["diagnosis", "wizard", "troubleshoot", "issue", "support", "v21"],
  },
  {
    id: "V22",
    title: "Answer-Ready Service Page Builder",
    description: "Structured local service page preview with dynamic data assembly",
    href: "/v22",
    keywords: ["service", "page", "builder", "local seo", "answer ready", "v22"],
  },
  {
    id: "V23",
    title: "Scroll-Based Content Reveal System",
    description: "IntersectionObserver-driven progressive reveal with contextual navigation",
    href: "/v23",
    keywords: ["scroll", "reveal", "intersectionobserver", "dot nav", "cta", "v23"],
  },
  {
    id: "V24",
    title: "Custom Service Package Builder",
    description: "Structured service selection with live validation and URL-encoded sharing",
    href: "/v24",
    keywords: ["package", "builder", "services", "validation", "url state", "v24"],
  },
  {
    id: "V25",
    title: "Dynamic Offer Countdown & Scarcity System",
    description: "localStorage-persisted countdown with scarcity and phase transitions",
    href: "/v25",
    keywords: ["countdown", "scarcity", "offer", "localstorage", "phase", "v25"],
  },
  {
    id: "V26",
    title: "Mini Usage Dashboard",
    description: "Brutalist terminal-style SaaS usage monitor with live metric states and adaptive CTA",
    href: "/v26",
    keywords: ["usage", "dashboard", "terminal", "metrics", "plan", "v26"],
  },
  {
    id: "V27",
    title: "API Key Dashboard",
    description: "Client-side key generation with reveal, copy, and regeneration controls",
    href: "/v27",
    keywords: ["api key", "dashboard", "keystone", "localstorage", "v27"],
  },
  {
    id: "V28",
    title: "Draft Autosave & Recovery System",
    description: "Debounced localStorage autosave with recovery banner and editorial writing flow",
    href: "/v28",
    keywords: ["draft", "autosave", "recovery", "editor", "compose", "v28"],
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NotepadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export default function VersionNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [explanationModalVersion, setExplanationModalVersion] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const raf = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [isOpen]);

  const filteredLinks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return links;
    }

    return links.filter((link) => {
      return (
        link.id.toLowerCase().includes(normalized) ||
        link.title.toLowerCase().includes(normalized) ||
        link.description.toLowerCase().includes(normalized) ||
        link.href.toLowerCase().includes(normalized) ||
        link.keywords?.some((keyword) => keyword.includes(normalized))
      );
    });
  }, [query]);

  return (
    <div ref={rootRef} className="fixed top-5 right-5 z-50">
      <button
        type="button"
        aria-label="Open component version selector"
        aria-controls="version-selector-menu"
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) {
            closeMenu();
            return;
          }
          setIsOpen(true);
        }}
        className="group inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/40 bg-[#0d1714]/90 text-emerald-100 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-emerald-300/60 hover:bg-[#12201b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
      >
        <span className="sr-only">Toggle version selector</span>
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
              isOpen ? "top-[7px] rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-[2px] w-5 rounded-full bg-current transition-all duration-200 ${
              isOpen ? "top-[7px] -rotate-45" : "top-[14px]"
            }`}
          />
        </span>
      </button>

      <nav
        id="version-selector-menu"
        aria-label="Version selector"
        className={`absolute top-[calc(100%+0.75rem)] right-0 w-[24rem] max-w-[calc(100vw-2rem)] origin-top-right rounded-2xl border border-emerald-300/30 bg-gradient-to-b from-[#12201b]/95 to-[#0b1411]/95 p-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-200 ${
          isOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.18em] text-emerald-200/80">COMPONENT LIBRARY</p>

        <label className="mb-2 flex items-center gap-2 rounded-xl border border-emerald-300/25 bg-emerald-400/[0.05] px-3 py-2 text-emerald-200/85 focus-within:border-emerald-300/55">
          <SearchIcon />
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search component versions..."
            className="w-full border-0 bg-transparent text-sm text-emerald-50 placeholder:text-emerald-200/50 focus:outline-none"
            aria-label="Search versions"
          />
        </label>

        <ul className="grid max-h-[60vh] gap-1 overflow-y-auto pr-1">
          {filteredLinks.map((link) => {
            const isActive = pathname === link.href;
            const versionId = link.id.toLowerCase();

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 transition ${
                    isActive
                      ? "bg-emerald-300/20 text-emerald-50 shadow-[inset_0_0_0_1px_rgba(110,231,183,0.45)]"
                      : "text-emerald-100/90 hover:bg-emerald-300/10 hover:text-emerald-50"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold tracking-[0.12em] text-emerald-300/85">{link.id}</span>
                    <span className="block truncate text-sm font-semibold">{link.title}</span>
                    <span className="block text-xs text-emerald-100/65">{link.description}</span>
                  </span>

                  <span className="mt-0.5 inline-flex shrink-0 items-center gap-1">
                    <span className="rounded-full border border-emerald-300/30 bg-black/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-100/70">
                      {link.href}
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`View explanation for ${link.id}`}
                      title="View explanation"
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-emerald-300/20 bg-black/15 text-emerald-100/50 transition hover:border-emerald-300/55 hover:text-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setExplanationModalVersion(versionId);
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") {
                          return;
                        }
                        event.preventDefault();
                        event.stopPropagation();
                        setExplanationModalVersion(versionId);
                      }}
                    >
                      <NotepadIcon />
                    </span>
                    {isActive ? (
                      <span
                        className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]"
                        aria-hidden="true"
                      />
                    ) : null}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {filteredLinks.length === 0 ? (
          <p className="px-3 py-4 text-sm text-emerald-100/70">No matching components for &quot;{query.trim()}&quot;.</p>
        ) : null}
      </nav>

      <ComponentExplanationModal
        isOpen={Boolean(explanationModalVersion)}
        onClose={() => setExplanationModalVersion(null)}
        versionId={explanationModalVersion ?? "v1"}
      />
    </div>
  );
}
