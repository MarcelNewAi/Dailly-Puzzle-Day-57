export interface SectionMeta {
  id: string;
  label: string;
  ctaLabel: string;
  ctaSubtext: string;
}

export const sections: SectionMeta[] = [
  {
    id: "hero",
    label: "Welcome",
    ctaLabel: "Explore our work",
    ctaSubtext: "Scroll to begin",
  },
  {
    id: "studio",
    label: "The Studio",
    ctaLabel: "Meet the team",
    ctaSubtext: "Est. 2009 - Ljubljana",
  },
  {
    id: "process",
    label: "Our Process",
    ctaLabel: "Start a project",
    ctaSubtext: "From concept to completion",
  },
  {
    id: "projects",
    label: "Selected Work",
    ctaLabel: "View full portfolio",
    ctaSubtext: "47 completed projects",
  },
  {
    id: "philosophy",
    label: "Philosophy",
    ctaLabel: "Read our manifesto",
    ctaSubtext: "What we believe in",
  },
  {
    id: "contact",
    label: "Contact",
    ctaLabel: "Begin a conversation",
    ctaSubtext: "Response within 24 hours",
  },
];

