export interface ComponentExplanation {
  id: string;
  version: string;
  title: string;
  tagline: string;
  purpose: string;
  features: string[];
  designNotes: string[];
  techUsed: string[];
  whenToUse: string;
  accentColor?: string;
}

export const componentExplanations: Record<string, ComponentExplanation> = {
  v1: {
    id: "v1",
    version: "V1",
    title: "Minimal Brutalist Landing",
    tagline: "High-contrast agency-style hero and stats",
    purpose:
      "A compact single-page agency landing concept focused on sharp hierarchy, strong typography, and quick trust signals. It demonstrates how to present positioning, featured work, and business metrics with minimal layout complexity.",
    features: [
      "Brutalist hero with uppercase display headline and mono label",
      "Animated stats counter triggered by IntersectionObserver",
      "Featured work card grid with hover invert and scale effects",
      "Status panel highlighting current engagement availability",
      "Sectioned layout using consistent border rails and dividers",
      "Responsive 12-column desktop composition collapsing to one column",
    ],
    designNotes: [
      "High-contrast black and white base with neon-lime accent",
      "Monospaced headings and labels to reinforce editorial harshness",
      "Hard borders and squared geometry over soft shadows",
      "Minimal palette and dense spacing to keep visual noise low",
    ],
    techUsed: [
      "Next.js App Router page component",
      "React useState and useEffect",
      "IntersectionObserver API",
      "requestAnimationFrame number tweening",
      "Tailwind utility classes",
    ],
    whenToUse:
      "Use this when you need a no-frills portfolio or agency hero that communicates confidence fast. It is ideal for campaign pages where strong copy and immediate credibility matter more than deep interaction.",
    accentColor: "#C6F135",
  },
  v2: {
    id: "v2",
    version: "V2",
    title: "Glassmorphism Video Hero",
    tagline: "Gradient background with immersive motion video",
    purpose:
      "A cinematic hero pattern that layers autoplay video, animated gradient blobs, and glass cards to create instant visual impact. It showcases motion-forward branding while retaining a clear CTA path.",
    features: [
      "Full-screen background video hero with glass overlay card",
      "Playback toggle to pause and resume background media",
      "Reduced-motion handling that pauses video automatically",
      "Animated ambient gradient blobs for atmospheric depth",
      "Service cards section with frosted panels and hover lift",
      "Anchor CTA linking from hero to services section",
    ],
    designNotes: [
      "Glassmorphism treatment with translucent cards and blur",
      "Saturated blue-violet-cyan gradient backdrop",
      "Soft rounded corners and floating composition",
      "Lightweight motion accents that avoid heavy layout shifts",
    ],
    techUsed: [
      "Next.js client component",
      "React useRef, useState, useEffect",
      "HTML5 video element",
      "matchMedia reduced-motion query listener",
      "Custom CSS keyframe animation",
    ],
    whenToUse:
      "Use this version for brand launches or premium product storytelling where visual atmosphere is a primary conversion lever. It works best when you have strong video or motion assets to support the headline.",
    accentColor: "#67E8F9",
  },
  v3: {
    id: "v3",
    version: "V3",
    title: "Neobrutalist Bento Layout",
    tagline: "Playful card grid with bold geometric blocks",
    purpose:
      "A bold marketing layout that uses bento-style card arrangements to present a lot of information with playful energy. It emphasizes personality and memorability over subtle, corporate aesthetics.",
    features: [
      "Large hero bento card with dual CTA buttons",
      "Rotated accent cards for playful asymmetry",
      "Mixed stat and content cards in a compact grid",
      "Heavy border and offset-shadow treatment on all blocks",
      "About section with staggered two-card overlap layout",
      "Responsive grid that collapses cleanly on smaller screens",
    ],
    designNotes: [
      "Neobrutalist palette using coral, teal, and yellow accents",
      "Hard black outlines with chunky offset shadows",
      "Intentional rotation and overlap for kinetic composition",
      "High-weight uppercase typography for loud tone",
    ],
    techUsed: [
      "Next.js App Router server page",
      "Tailwind utility classes",
      "CSS keyframe spin animation",
      "Static card-driven JSX composition",
    ],
    whenToUse:
      "Choose this when the brand should feel energetic, unconventional, or creator-focused. It fits launch promos, startup microsites, and pages that benefit from high visual distinctiveness.",
    accentColor: "#FF6B6B",
  },
  v4: {
    id: "v4",
    version: "V4",
    title: "Smart Contact Form",
    tagline: "Cyber form with local storage memory",
    purpose:
      "A stylized contact form demo that remembers user details across visits and surfaces returning-user context. It focuses on practical client-state handling while keeping a distinctive cyber terminal aesthetic.",
    features: [
      "Multi-field contact form with typed field models",
      "LocalStorage persistence with sanitization safeguards",
      "Returning-user banner and visit counter tracking",
      "Relative last-visit time formatting",
      "Cache status notices for save and purge actions",
      "Clear-local-data control that resets persisted state",
      "Form submit visual flash feedback on success",
    ],
    designNotes: [
      "Cyber grid background with scanline overlay effect",
      "Neon cyan accent against deep dark canvas",
      "Display/body font blending via next/font custom variables",
      "System-console language and uppercase UI labels",
    ],
    techUsed: [
      "Next.js client component with TypeScript types",
      "React useState, useEffect, useRef",
      "next/font/google (Bebas Neue, DM Sans, Oswald, Source Sans 3)",
      "localStorage read/write with data sanitation",
      "Timed notice state transitions",
    ],
    whenToUse:
      "Use this module when you need lead forms that remember users and reduce repeat typing. It is useful for returning traffic funnels, quote requests, and demos of resilient local persistence behavior.",
    accentColor: "#00F0FF",
  },
  v5: {
    id: "v5",
    version: "V5",
    title: "Nexus-Q Dashboard",
    tagline: "Quantum-inspired system console and tools",
    purpose:
      "A themed mini-product shell that frames dashboard, network, and allocator experiences under one visual system. It demonstrates reusable layout scaffolding and domain-style UI composition with linked feature modules.",
    features: [
      "Shared V5 layout with persistent navbar and footer",
      "Home dashboard hero with cross-page quick actions",
      "System status cards using centralized stats data",
      "Network grid view with per-node health and meter bars",
      "Compute allocator with sliders plus numeric inputs",
      "Real-time Q-credit calculations for second, hour, day, and month",
      "Consistent iconography and staged entry animations",
    ],
    designNotes: [
      "Futuristic HUD-inspired interface language",
      "Cyan-on-dark palette with technical dashboard framing",
      "Card-heavy composition tuned for operational readouts",
      "Mono accents for data labels and calculated values",
    ],
    techUsed: [
      "Next.js nested routing with shared layout",
      "React client state for calculator inputs",
      "Memoized compute formulas",
      "Typed local data modules for stats and nodes",
      "next/font/google (Space Grotesk, JetBrains Mono)",
    ],
    whenToUse:
      "Use this when you need a multi-screen product demo with a strong themed shell and internal navigation. It is suitable for internal tools, analytics product concepts, and technical marketing showcases.",
    accentColor: "#00F0FF",
  },
  v6: {
    id: "v6",
    version: "V6",
    title: "Masonry Gallery",
    tagline: "Filterable photo wall with lightbox",
    purpose:
      "A media gallery experience built around a masonry column layout, category filters, and a keyboard-friendly lightbox. It focuses on high-density visual browsing with smooth transitions and progressive reveal.",
    features: [
      "Category filters with animated fade-out/fade-in transitions",
      "Masonry image wall using CSS columns",
      "Lazy-loaded images with intersection-based reveal animation",
      "Lightbox modal with previous/next image controls",
      "Keyboard controls for Escape and arrow navigation",
      "Focus trap and body scroll lock while lightbox is open",
      "Footer summary with live filtered image count",
    ],
    designNotes: [
      "Editorial gallery style with serif display heading",
      "Balanced neutral palette emphasizing imagery over chrome",
      "Overlay metadata on hover for title and photographer context",
      "Minimal controls to keep browsing flow uninterrupted",
    ],
    techUsed: [
      "Next.js client page",
      "React useState, useEffect, useMemo, useCallback, useRef",
      "next/image with unoptimized remote sources",
      "IntersectionObserver for reveal-on-scroll",
      "Keyboard event and focus management patterns",
    ],
    whenToUse:
      "Choose this for portfolios, case-study galleries, or editorial collections where visual scanning speed is key. It also works well for demonstrating media-heavy interaction and accessibility in modal flows.",
    accentColor: "#E9C46A",
  },
  v7: {
    id: "v7",
    version: "V7",
    title: "Section Builder",
    tagline: "Drag-drop landing page composition",
    purpose:
      "An interactive landing-page builder that lets users reorder predefined sections and preview the result instantly. It combines drag-and-drop, command workflows, and persisted layout state into a single authoring interface.",
    features: [
      "Draggable section list with drop target insertion",
      "Keyboard reordering controls for accessibility",
      "LocalStorage persistence of section order",
      "Reset, shuffle, reverse, and clear-data operations",
      "Live preview panel with scroll controls and pulse feedback",
      "Command palette with searchable actions",
      "Global productivity shortcuts including Ctrl/Cmd+K and Ctrl/Cmd+R",
      "Export current layout JSON to clipboard",
    ],
    designNotes: [
      "Builder-style split layout with sidebar and live canvas",
      "Functional control surfaces with command-driven UX",
      "Clear active states for drag, drop, and save feedback",
      "Responsive sidebar toggle behavior on mobile",
    ],
    techUsed: [
      "Context-powered command palette provider",
      "React hooks with memoized handlers",
      "LocalStorage persistence and clipboard API",
      "Custom keyboard navigation and focus trapping",
      "Next.js client-side section registry composition",
    ],
    whenToUse:
      "Use this when teams need rapid page composition from approved section blocks. It is ideal for no-code marketing assembly, prototyping reorder experiments, and demonstrating command-oriented authoring workflows.",
    accentColor: "#7C3AED",
  },
  v8: {
    id: "v8",
    version: "V8",
    title: "Theme Customizer",
    tagline: "Live design token and style controls",
    purpose:
      "A live theme laboratory where users tune visual tokens and immediately preview the impact across UI elements. It demonstrates practical token-driven theming with persistent preferences and safe value normalization.",
    features: [
      "Controls for mode, accent, radius, font size, spacing, and animation speed",
      "Preset accent palette plus manual hex input normalization",
      "Live preview surface with buttons, cards, forms, and typography samples",
      "Theme settings persistence via localStorage",
      "Reset-to-default action with toast feedback",
      "Computed CSS custom properties derived from state",
      "Mobile controls panel toggle and floating reopen button",
    ],
    designNotes: [
      "Tooling-first interface with clear panel segmentation",
      "Tokenized color and spacing system exposed to users",
      "Balanced neutral surfaces with accent-led highlights",
      "Pragmatic UI where readability and control clarity dominate",
    ],
    techUsed: [
      "React state-driven design token pipeline",
      "Type-safe theme sanitization utilities",
      "CSS variable injection through inline style object",
      "next/font/google multi-font stack options",
      "LocalStorage theme persistence",
    ],
    whenToUse:
      "Use this for design system demos, client handoff prototypes, or product settings UIs where real-time appearance control is required. It is especially useful when validating token ranges with non-technical stakeholders.",
    accentColor: "#10B981",
  },
  v9: {
    id: "v9",
    version: "V9",
    title: "SaaS Storytelling Page",
    tagline: "Narrative conversion page with sticky CTA",
    purpose:
      "A full conversion narrative that guides users from problem awareness to offer selection and final call-to-action. It is structured as a long-form SaaS page with section-aware CTA behavior and trust amplification.",
    features: [
      "Eight-section storytelling flow from hero to final CTA",
      "Sticky bottom CTA that adapts text and icon by active section",
      "IntersectionObserver-based active section tracking hook",
      "Reveal-on-scroll transitions with reusable section wrapper",
      "Trust elements, testimonial cards, logo rows, and metrics",
      "Pricing table with featured tier and plan-level CTAs",
      "FAQ accordion with accessible expand/collapse behavior",
      "Smooth-scroll CTA routing into pricing section",
    ],
    designNotes: [
      "Alternating surface backgrounds to segment narrative phases",
      "Serif + sans pairing for premium SaaS tone",
      "Trust-first visuals with badges, stars, and social proof rows",
      "Persistent sticky bar for conversion continuity",
    ],
    techUsed: [
      "Custom useActiveSection hook",
      "IntersectionObserver for section state and reveal",
      "React stateful FAQ accordion",
      "next/font/google (DM Sans, Fraunces, Playfair Display)",
      "Composable section and UI subcomponents",
    ],
    whenToUse:
      "Use this for SaaS or product marketing pages where the message must build progressively before asking for conversion. It works well for paid traffic destinations and launch pages with multi-step persuasion.",
    accentColor: "#22C55E",
  },
  v10: {
    id: "v10",
    version: "V10",
    title: "ROI Calculator",
    tagline: "Business impact and savings estimator",
    purpose:
      "A business calculator that translates operational inputs into revenue lift, cost savings, and payback insights. It helps prospects quantify value quickly and supports sales conversations with tangible numbers.",
    features: [
      "Business-type presets with animated default transitions",
      "Typed input suite for clients, rates, hours, conversion, and tool costs",
      "Live ROI computation including yearly savings and payback period",
      "Animated KPI summary counters",
      "Revenue comparison bar chart with percentage increase",
      "Insight callout that adapts message tone to result quality",
      "Reset-to-default action with status toast",
      "Breakdown cards for time saved, revenue gain, tool savings, and capacity",
    ],
    designNotes: [
      "Two-panel calculator layout with controls and result stack",
      "Data-first card hierarchy emphasizing key ROI figure",
      "Green accent vocabulary for positive financial outcomes",
      "Clear visual grouping of summary, breakdown, and narrative insight",
    ],
    techUsed: [
      "React useMemo for deterministic calculations",
      "requestAnimationFrame easing for value transitions",
      "Typed ROI formula utilities",
      "Componentized input and results architecture",
      "next/font/google multi-font stack",
    ],
    whenToUse:
      "Use this when selling efficiency or productivity tools where quantified business impact drives decision-making. It is ideal for pricing pages, sales enablement assets, and lead qualification flows.",
    accentColor: "#10B981",
  },
  v11: {
    id: "v11",
    version: "V11",
    title: "Exit Intent Lead Capture",
    tagline: "Behavior-driven modal capture flow",
    purpose:
      "A lead-capture experiment page that opens a modal when users show exit intent or go idle. It demonstrates trigger orchestration, session-aware suppression, and a full conversion micro-flow with debug visibility.",
    features: [
      "Mouse-leave exit intent detection with top-threshold guard",
      "Idle detection trigger after 30 seconds of inactivity",
      "Session-based dismissal persistence and banner recovery path",
      "Lead modal with email validation, success state, and auto-close",
      "Focus trap, Escape handling, and body scroll lock",
      "Manual trigger controls for quick testing",
      "Debug panel showing trigger status, countdown, and pointer mode",
      "Reset session action for repeated scenario testing",
    ],
    designNotes: [
      "Dark emerald product language with glowing accent feedback",
      "Layered hero and card surfaces matching SaaS conversion tooling",
      "Modal-first visual emphasis with controlled motion",
      "Operational debug UI intentionally visible for demonstration",
    ],
    techUsed: [
      "Custom hooks for exit intent and idle detection",
      "SessionStorage for dismissal and banner state",
      "Typed modal lifecycle and trigger-source tracking",
      "Focus management and accessibility patterns",
      "next/font/google (Space Grotesk, Inter)",
    ],
    whenToUse:
      "Use this for lead capture systems where timing and behavior signals matter more than static popups. It is valuable for experimentation pages, CRO prototypes, and demos of intent-based conversion triggers.",
    accentColor: "#10B981",
  },
  v12: {
    id: "v12",
    version: "V12",
    title: "Service Inquiry Router",
    tagline: "Guided qualification quiz and recommendation",
    purpose:
      "A qualification flow that asks users targeted questions about business type, goals, timeline, budget, and feature priorities, then routes them to the best-fit service. It reduces decision friction by replacing broad service browsing with guided, personalized recommendations.",
    features: [
      "5-question quiz flow with single and multi-select options",
      "Progress bar and per-step visual indicators",
      "Answer summary sidebar with jump-to-edit controls",
      "Priority-based routing logic for primary recommendation",
      "Alternative service suggestions using weighted scoring",
      "Personalized reasoning message tied to user answers",
      "Session persistence preserving current step and answers",
      "Keyboard shortcuts for next/back navigation",
    ],
    designNotes: [
      "Dark emerald visual language aligned with V11",
      "Two-column split between question flow and answer summary",
      "Glow-accented selected states and result emphasis card",
      "Animated step transitions and celebratory result treatment",
      "Space Grotesk headings paired with Inter body text",
    ],
    techUsed: [
      "Next.js App Router with client-side state",
      "React useState, useMemo, useCallback, useEffect",
      "sessionStorage persistence layer",
      "Typed question and service data models",
      "Inline SVG icon system",
      "Deterministic routing and alternative scoring functions",
    ],
    whenToUse:
      "Use this for service businesses with multiple offerings where prospects need guided qualification before contact or booking. It works well as a pre-sales router, interactive pricing assistant, or conversion-first recommendation funnel.",
    accentColor: "#10B981",
  },
  v13: {
    id: "v13",
    version: "V13",
    title: "Custom Scrollbar",
    tagline: "Reusable draggable scrollbar with live theming",
    purpose:
      "A fully customizable scrollbar component that overlays the native browser scrollbar with a draggable thumb, auto-show/hide behavior, and per-project color theming. It solves the problem of native scrollbars being visually inconsistent across browsers and hard to style without CSS hacks, giving you a clean, on-brand scrollbar you can drop into any scrollable container.",
    features: [
      "Draggable thumb with hover and drag states",
      "Auto-hide when content fits the viewport",
      "Desktop-only (hidden on screens < 768px)",
      "Two variants: page (fixed to viewport) and card (contained in parent)",
      "Configurable thumb color, hover color, and track colors via props",
      "Minimum 40px thumb size for reliable grabbing",
      "Responsive to dynamic content via ResizeObserver + MutationObserver",
      "Works inside iframes (fixed positioning respects iframe viewport)",
    ],
    designNotes: [
      "Overlays the native scrollbar without replacing it; native scrolling still works via wheel/keyboard/touch",
      "Thumb has subtle shadow and scale-up animation on interaction",
      "Track and thumb use rounded-full pill shape for a modern feel",
      "Z-index layered at 30 to stay above most content but below modals (10000)",
      "9px thumb width with 3px right offset for breathing room from the edge",
    ],
    techUsed: [
      "React useEffect, useRef, useState hooks",
      "Web API: ResizeObserver for container resize detection",
      "Web API: MutationObserver for content change detection",
      "Web API: matchMedia for desktop-only detection",
      "Tailwind utility classes for layout and transitions",
      "Pointer events for drag handling",
    ],
    whenToUse:
      "Use this whenever you want a brand-consistent scrollbar that matches your design system. Perfect for dark-themed apps, portfolios, dashboards, and any interface where the default scrollbar feels out of place. The card variant is ideal for scrollable panels inside layouts (sidebars, modals, chat windows) where you want the scrollbar contained within the component rather than on the viewport edge.",
    accentColor: "#10B981",
  },
  v14: {
    id: "v14",
    version: "V14",
    title: "Service Area Checker",
    tagline: "Instant location coverage checker with smart matching",
    purpose:
      'A real-time service area lookup tool that lets visitors instantly check whether a business operates in their location by typing a postcode, city name, or regional alias. It eliminates the friction of "will you come to my area?" emails by giving prospects an immediate answer and routing them to the appropriate next step based on coverage status.',
    features: [
      "Smart input normalization (accent-insensitive, case-insensitive, alias-aware)",
      "Postcode, city name, and alias matching",
      "Real-time debounced search (150ms)",
      "Autocomplete dropdown with keyboard navigation",
      "Four result states: empty, covered, partial, not-covered",
      "Dynamic CTA that changes based on coverage status",
      "Nearest alternative areas shown when location not covered",
      "Waitlist email capture for uncovered areas",
      "Visual coverage map with pulsing dots",
      "Popular area quick-select chips",
    ],
    designNotes: [
      "Dark emerald theme matching V11/V12/V13 for product family cohesion",
      "Color-coded result states: emerald (covered), amber (partial), muted red (not covered)",
      "Smooth crossfade transitions between result states",
      "SVG checkmark and X icons with stroke animation on state change",
      "Coverage map uses pulsing emerald dots to draw attention to active cities",
    ],
    techUsed: [
      'Next.js App Router with "use client"',
      "React useState and useEffect with debouncing",
      "String normalization via Unicode NFD + accent stripping",
      "Local dataset (no external APIs)",
      "next/font/google (Space Grotesk, Inter)",
      "Inline SVG for all icons and the coverage map",
    ],
    whenToUse:
      "Perfect for any service business with geographic limits: home services (plumbing, electrical, cleaning), local agencies, food delivery, on-site consulting, regional SaaS. Use it as a hero-level qualifier on landing pages to filter traffic and set expectations before the prospect invests time in reading about services or booking a call.",
    accentColor: "#10B981",
  },
};
