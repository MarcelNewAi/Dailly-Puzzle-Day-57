export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  value: string;
}

export interface Question {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  type: "single-select" | "multi-select";
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: "business-type",
    step: 1,
    title: "What type of business do you run?",
    subtitle: "This helps us understand your needs and industry context.",
    type: "single-select",
    options: [
      {
        id: "startup",
        label: "Startup",
        description: "Early stage, fast-moving, building MVP or growing",
        icon: "rocket",
        value: "startup",
      },
      {
        id: "sme",
        label: "Small Business",
        description: "Established local or niche business, 1-50 employees",
        icon: "store",
        value: "sme",
      },
      {
        id: "agency",
        label: "Agency / Freelancer",
        description: "Serving other businesses as a service provider",
        icon: "briefcase",
        value: "agency",
      },
      {
        id: "enterprise",
        label: "Enterprise",
        description: "Large organization, 100+ employees, complex needs",
        icon: "building",
        value: "enterprise",
      },
    ],
  },
  {
    id: "project-goal",
    step: 2,
    title: "What is your main goal?",
    subtitle: "What are you primarily looking to achieve?",
    type: "single-select",
    options: [
      {
        id: "new-website",
        label: "Build a New Website",
        description: "I need a brand new site from scratch",
        icon: "globe",
        value: "new-website",
      },
      {
        id: "redesign",
        label: "Redesign Existing",
        description: "Modernize or rebuild my current website",
        icon: "refresh",
        value: "redesign",
      },
      {
        id: "ecommerce",
        label: "Launch E-commerce",
        description: "Sell products online with a full shop",
        icon: "shopping-cart",
        value: "ecommerce",
      },
      {
        id: "marketing",
        label: "Improve Marketing",
        description: "Get more leads, traffic, and conversions",
        icon: "trending-up",
        value: "marketing",
      },
      {
        id: "automation",
        label: "Automate Workflows",
        description: "Save time with smart integrations and tools",
        icon: "zap",
        value: "automation",
      },
    ],
  },
  {
    id: "timeline",
    step: 3,
    title: "What is your timeline?",
    subtitle: "When do you need the project completed?",
    type: "single-select",
    options: [
      {
        id: "asap",
        label: "ASAP",
        description: "Within 2 weeks - I need this done fast",
        icon: "zap-fast",
        value: "asap",
      },
      {
        id: "month",
        label: "1 Month",
        description: "Reasonable urgency, want it done soon",
        icon: "clock",
        value: "month",
      },
      {
        id: "quarter",
        label: "1-3 Months",
        description: "Standard timeline, no rush",
        icon: "calendar",
        value: "quarter",
      },
      {
        id: "flexible",
        label: "Flexible",
        description: "No hard deadline, quality over speed",
        icon: "hourglass",
        value: "flexible",
      },
    ],
  },
  {
    id: "budget",
    step: 4,
    title: "What is your budget range?",
    subtitle: "Helps us recommend the right tier of service.",
    type: "single-select",
    options: [
      {
        id: "starter",
        label: "Under €2,000",
        description: "Starter budget - essential features only",
        icon: "euro",
        value: "starter",
      },
      {
        id: "growth",
        label: "€2,000 - €5,000",
        description: "Growth budget - solid professional work",
        icon: "euro-stack",
        value: "growth",
      },
      {
        id: "premium",
        label: "€5,000 - €15,000",
        description: "Premium budget - advanced features + support",
        icon: "gem",
        value: "premium",
      },
      {
        id: "enterprise-budget",
        label: "€15,000+",
        description: "Enterprise budget - full custom solution",
        icon: "diamond",
        value: "enterprise-budget",
      },
    ],
  },
  {
    id: "features",
    step: 5,
    title: "Which features matter most?",
    subtitle: "Select all that apply - this refines your recommendation.",
    type: "multi-select",
    options: [
      {
        id: "seo",
        label: "SEO Optimization",
        description: "Rank higher on Google",
        icon: "search",
        value: "seo",
      },
      {
        id: "cms",
        label: "Content Management",
        description: "Update content yourself",
        icon: "edit",
        value: "cms",
      },
      {
        id: "analytics",
        label: "Analytics Dashboard",
        description: "Track visitors and conversions",
        icon: "bar-chart",
        value: "analytics",
      },
      {
        id: "multilang",
        label: "Multi-language Support",
        description: "Reach international audiences",
        icon: "languages",
        value: "multilang",
      },
      {
        id: "integrations",
        label: "Third-party Integrations",
        description: "Connect with your existing tools",
        icon: "plug",
        value: "integrations",
      },
      {
        id: "support",
        label: "Ongoing Support",
        description: "Maintenance and updates",
        icon: "lifebuoy",
        value: "support",
      },
    ],
  },
];
