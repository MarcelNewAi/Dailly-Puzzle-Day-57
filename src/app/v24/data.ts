export type OptionId = string;

export interface ServiceOption {
  id: OptionId;
  name: string;
  tagline: string;
  price: number;
  priceLabel: string;
  priceType: "monthly" | "one-off";
  popular?: boolean;
  detail: string;
  includes: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  required: boolean;
  maxSelections: number;
  options: ServiceOption[];
}

export interface ValidationRule {
  id: string;
  type: "requires" | "blocks";
  triggerOptionId: OptionId;
  targetOptionId: OptionId;
  message: string;
}

export interface PackageState {
  selections: Record<string, OptionId[]>;
}

export const categories: Category[] = [
  {
    id: "design",
    name: "Design",
    description: "The visual and UX foundation of your project.",
    required: true,
    maxSelections: 1,
    options: [
      {
        id: "design-brand",
        name: "Brand Identity",
        tagline: "Logo, colour, typography, brand guidelines",
        price: 3200,
        priceLabel: "\u00A33,200 one-off",
        priceType: "one-off",
        detail:
          "A complete brand identity system - logo suite, colour palette, type scale, and a compact brand guidelines document.",
        includes: [
          "Logo in SVG + PNG formats",
          "Colour + typography system",
          "Brand guidelines PDF",
          "Social profile assets",
          "2 revision rounds",
        ],
      },
      {
        id: "design-ui",
        name: "UI / UX Design",
        tagline: "Wireframes, visual design, prototype",
        price: 2400,
        priceLabel: "\u00A32,400 one-off",
        priceType: "one-off",
        popular: true,
        detail:
          "Full interface design from low-fidelity wireframes through to a polished, clickable Figma prototype ready for handoff.",
        includes: [
          "User flow mapping",
          "Wireframes for all key pages",
          "Visual design in Figma",
          "Interactive prototype",
          "3 revision rounds",
        ],
      },
      {
        id: "design-both",
        name: "Brand + UI Bundle",
        tagline: "Complete design system, identity to interface",
        price: 4800,
        priceLabel: "\u00A34,800 one-off",
        priceType: "one-off",
        detail:
          "Brand identity and UI design delivered together as a unified system. The most coherent starting point for a new product or website.",
        includes: [
          "Everything in Brand Identity",
          "Everything in UI / UX Design",
          "Unified design token system",
          "Component library in Figma",
          "Priority scheduling",
        ],
      },
    ],
  },
  {
    id: "development",
    name: "Development",
    description: "The build that brings your design to life.",
    required: true,
    maxSelections: 1,
    options: [
      {
        id: "dev-marketing",
        name: "Marketing Site",
        tagline: "Up to 8 pages, CMS, contact forms",
        price: 3600,
        priceLabel: "\u00A33,600 one-off",
        priceType: "one-off",
        detail:
          "A fast, accessible marketing website built in Next.js with a headless CMS, contact form, and SEO foundations in place.",
        includes: [
          "Up to 8 pages",
          "Headless CMS integration",
          "Contact form + spam protection",
          "Core Web Vitals optimised",
          "Deployed to Vercel",
        ],
      },
      {
        id: "dev-webapp",
        name: "Web Application",
        tagline: "Auth, database, custom logic, dashboard",
        price: 8400,
        priceLabel: "\u00A38,400 one-off",
        priceType: "one-off",
        popular: true,
        detail:
          "A full-stack web application with authentication, database, custom business logic, and an admin dashboard.",
        includes: [
          "User authentication (email + OAuth)",
          "PostgreSQL database",
          "REST or tRPC API",
          "Admin dashboard",
          "Staging + production environments",
        ],
      },
      {
        id: "dev-ecomm",
        name: "E-Commerce Store",
        tagline: "Product catalogue, cart, checkout, orders",
        price: 5600,
        priceLabel: "\u00A35,600 one-off",
        priceType: "one-off",
        detail:
          "A fully featured online store built on Next.js Commerce with Stripe payments, product management, and order handling.",
        includes: [
          "Product catalogue + variants",
          "Cart and checkout flow",
          "Stripe payments integration",
          "Order management dashboard",
          "Inventory tracking",
        ],
      },
    ],
  },
  {
    id: "hosting",
    name: "Hosting & Infrastructure",
    description: "Ongoing hosting, uptime, and infrastructure management.",
    required: false,
    maxSelections: 1,
    options: [
      {
        id: "hosting-basic",
        name: "Managed Hosting - Starter",
        tagline: "Vercel Pro, SSL, daily backups, uptime monitoring",
        price: 120,
        priceLabel: "\u00A3120 / mo",
        priceType: "monthly",
        detail:
          "Hands-off managed hosting on Vercel Pro. We handle deployments, SSL renewal, daily backups, and uptime alerts.",
        includes: [
          "Vercel Pro plan included",
          "SSL certificate managed",
          "Daily automated backups",
          "Uptime monitoring + alerts",
          "Monthly deployment support",
        ],
      },
      {
        id: "hosting-scale",
        name: "Managed Hosting - Scale",
        tagline: "Dedicated infra, CDN, database hosting, SLA",
        price: 380,
        priceLabel: "\u00A3380 / mo",
        priceType: "monthly",
        popular: true,
        detail:
          "Full infrastructure management on AWS with a dedicated CDN, managed database, auto-scaling, and a 99.9% uptime SLA.",
        includes: [
          "AWS infrastructure managed",
          "CloudFront CDN",
          "Managed PostgreSQL (RDS)",
          "99.9% uptime SLA",
          "Incident response + runbook",
        ],
      },
    ],
  },
  {
    id: "support",
    name: "Ongoing Support",
    description: "Retainer and maintenance options. Up to two can be combined.",
    required: false,
    maxSelections: 2,
    options: [
      {
        id: "support-maintain",
        name: "Maintenance Retainer",
        tagline: "Bug fixes, dependency updates, minor changes",
        price: 280,
        priceLabel: "\u00A3280 / mo",
        priceType: "monthly",
        detail:
          "A monthly retainer covering bug fixes, package updates, security patches, and minor content or layout changes.",
        includes: [
          "Up to 4 hrs of changes / mo",
          "Dependency + security updates",
          "Monthly health report",
          "Rollover hours (up to 2 hrs)",
          "48h response SLA",
        ],
      },
      {
        id: "support-growth",
        name: "Growth Retainer",
        tagline: "A/B tests, new features, analytics, CRO",
        price: 680,
        priceLabel: "\u00A3680 / mo",
        priceType: "monthly",
        popular: true,
        detail:
          "A strategic monthly retainer for teams actively growing their product - feature development, A/B testing, analytics, and conversion work.",
        includes: [
          "Up to 12 hrs development / mo",
          "A/B test setup and reporting",
          "Google Analytics 4 + event tracking",
          "Quarterly CRO review",
          "24h response SLA",
        ],
      },
      {
        id: "support-priority",
        name: "Priority Support",
        tagline: "Dedicated Slack channel, 4h response, on-call",
        price: 420,
        priceLabel: "\u00A3420 / mo",
        priceType: "monthly",
        detail:
          "A dedicated support tier with a private Slack channel, 4-hour response guarantee, and on-call access for critical incidents.",
        includes: [
          "Private Slack channel",
          "4h response guarantee",
          "On-call for P1 incidents",
          "Monthly strategy call (1h)",
          "Named account manager",
        ],
      },
    ],
  },
];

export const validationRules: ValidationRule[] = [
  {
    id: "rule-webapp-needs-scale",
    type: "requires",
    triggerOptionId: "dev-webapp",
    targetOptionId: "hosting-scale",
    message:
      "Web Application projects require Managed Hosting - Scale. The Starter plan does not support database hosting or the required infrastructure.",
  },
  {
    id: "rule-ecomm-blocks-basic",
    type: "blocks",
    triggerOptionId: "dev-ecomm",
    targetOptionId: "hosting-basic",
    message:
      "E-Commerce stores cannot use the Starter hosting plan - order data and payment processing require the Scale infrastructure tier.",
  },
];

export const allOptions: ServiceOption[] = categories.flatMap((category) => category.options);

export function getOption(id: OptionId): ServiceOption | undefined {
  return allOptions.find((option) => option.id === id);
}

export function getCategoryForOption(id: OptionId): Category | undefined {
  return categories.find((category) => category.options.some((option) => option.id === id));
}

export function calculateTotals(selections: Record<string, OptionId[]>): {
  oneOff: number;
  monthly: number;
} {
  const selected = Object.values(selections)
    .flat()
    .map(getOption)
    .filter(Boolean) as ServiceOption[];

  return {
    oneOff: selected
      .filter((option) => option.priceType === "one-off")
      .reduce((sum, option) => sum + option.price, 0),
    monthly: selected
      .filter((option) => option.priceType === "monthly")
      .reduce((sum, option) => sum + option.price, 0),
  };
}
