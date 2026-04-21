export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  required: boolean;
  tip: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  items: ChecklistItem[];
}

export const checklist: ChecklistCategory[] = [
  {
    id: "project",
    title: "Project Foundation",
    subtitle: "Know what you want to build",
    icon: "target",
    items: [
      {
        id: "project-goal",
        label: "Clear project goal defined",
        description: "You know what success looks like",
        required: true,
        tip: "Write one sentence that describes what this project needs to achieve. If you can't explain it in one sentence, the scope is too vague.",
      },
      {
        id: "target-audience",
        label: "Target audience identified",
        description: "You know who this is for",
        required: true,
        tip: "Be specific. \"Small businesses\" is too broad. \"Slovenian dental clinics with 2-5 staff\" is actionable.",
      },
      {
        id: "success-metrics",
        label: "Success metrics chosen",
        description: "You know how to measure results",
        required: true,
        tip: "Pick 2-3 measurable KPIs: form submissions, organic traffic, bounce rate, conversion rate. Avoid vague metrics like \"more engagement\".",
      },
    ],
  },
  {
    id: "content",
    title: "Content & Assets",
    subtitle: "What you're bringing to the table",
    icon: "folder",
    items: [
      {
        id: "brand-assets",
        label: "Brand assets ready",
        description: "Logo, colors, fonts in digital format",
        required: true,
        tip: "Logo in SVG or high-res PNG, primary/secondary brand colors as hex values, preferred font names. If you don't have these yet, that's a separate conversation.",
      },
      {
        id: "content-draft",
        label: "Content drafted or outlined",
        description: "Copy, images, product info",
        required: true,
        tip: "Even rough drafts help. Provide page outlines, key headlines, product descriptions, and any photos you want used. Blank pages slow projects down more than anything else.",
      },
      {
        id: "domain-ready",
        label: "Domain name secured",
        description: "Domain purchased and accessible",
        required: false,
        tip: "If you haven't bought a domain yet, we can recommend one. If you already own one, make sure you have admin access to the registrar.",
      },
    ],
  },
  {
    id: "logistics",
    title: "Logistics & Timeline",
    subtitle: "Practical readiness",
    icon: "calendar",
    items: [
      {
        id: "budget-defined",
        label: "Budget range confirmed",
        description: "You know what you can invest",
        required: true,
        tip: "A realistic range helps us propose the right scope. \"Under €5,000\" or \"€15,000-€25,000\" is more useful than \"as cheap as possible\".",
      },
      {
        id: "decision-maker",
        label: "Decision-maker available",
        description: "Person who can approve and sign off",
        required: true,
        tip: "Projects stall when the real decision-maker isn't in the conversation. Make sure they're looped in from the start, not just at the end.",
      },
    ],
  },
];

export const totalItems = checklist.reduce((sum, category) => sum + category.items.length, 0);

export const requiredItems = checklist.reduce((sum, category) => {
  return sum + category.items.filter((item) => item.required).length;
}, 0);
