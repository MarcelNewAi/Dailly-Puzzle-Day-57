export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceRange: string;
  timeline: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  badge?: string;
  accentIcon: string;
}

export interface QuizAnswers {
  businessType: string;
  projectGoal: string;
  timeline: string;
  budget: string;
  features: string[];
}

export const services: Record<string, Service> = {
  "starter-landing": {
    id: "starter-landing",
    name: "Starter Landing Page",
    tagline: "Fast, focused, conversion-ready",
    description:
      "A single-page website optimized to convert visitors into customers. Perfect for startups and solo founders who need to establish a professional online presence quickly.",
    priceRange: "€800 - €1,800",
    timeline: "1-2 weeks",
    features: ["Single page design", "Mobile responsive", "Contact form", "Basic SEO", "Fast delivery"],
    ctaText: "Get Started",
    ctaHref: "#contact",
    accentIcon: "rocket",
  },
  "growth-website": {
    id: "growth-website",
    name: "Growth Website",
    tagline: "Multi-page site built to scale",
    description:
      "A complete multi-page website with CMS, blog, SEO optimization, and analytics. Ideal for growing businesses that need a solid foundation for digital growth.",
    priceRange: "€2,500 - €5,000",
    timeline: "3-4 weeks",
    features: [
      "Up to 10 pages",
      "CMS integration",
      "Blog system",
      "SEO optimization",
      "Analytics setup",
      "1 month support",
    ],
    ctaText: "Learn More",
    ctaHref: "#growth",
    badge: "Most Popular",
    accentIcon: "trending-up",
  },
  "ecommerce-pro": {
    id: "ecommerce-pro",
    name: "E-commerce Pro",
    tagline: "Sell online with confidence",
    description:
      "Full-featured online store with product catalog, secure payments, inventory management, and order tracking. Built for businesses ready to launch or scale their e-commerce.",
    priceRange: "€4,000 - €10,000",
    timeline: "4-8 weeks",
    features: [
      "Product catalog",
      "Secure checkout",
      "Payment integration",
      "Inventory management",
      "Order tracking",
      "Customer accounts",
    ],
    ctaText: "Start Selling",
    ctaHref: "#ecommerce",
    accentIcon: "shopping-cart",
  },
  "enterprise-custom": {
    id: "enterprise-custom",
    name: "Enterprise Custom Solution",
    tagline: "Built for scale and complexity",
    description:
      "Custom web application tailored to your exact requirements. Includes custom integrations, advanced functionality, ongoing support, and dedicated project management.",
    priceRange: "€15,000+",
    timeline: "2-6 months",
    features: [
      "Fully custom design",
      "Custom integrations",
      "Multi-language support",
      "Advanced analytics",
      "Dedicated support",
      "SLA guarantee",
    ],
    ctaText: "Schedule Consultation",
    ctaHref: "#enterprise",
    badge: "Premium",
    accentIcon: "diamond",
  },
  "marketing-automation": {
    id: "marketing-automation",
    name: "Marketing Automation Package",
    tagline: "Turn traffic into revenue on autopilot",
    description:
      "Automated marketing funnels, email sequences, lead nurturing, and conversion optimization. Perfect for businesses that want to grow without hiring a marketing team.",
    priceRange: "€3,500 - €8,000",
    timeline: "3-5 weeks",
    features: [
      "Email automation",
      "Lead nurturing",
      "Landing pages",
      "Conversion tracking",
      "A/B testing",
      "Monthly reporting",
    ],
    ctaText: "Boost My Marketing",
    ctaHref: "#marketing",
    accentIcon: "zap",
  },
  "workflow-automation": {
    id: "workflow-automation",
    name: "Workflow Automation Suite",
    tagline: "Save hours every week",
    description:
      "Custom automation workflows that connect your tools, eliminate repetitive tasks, and streamline operations. Includes discovery, implementation, and training.",
    priceRange: "€2,000 - €6,000",
    timeline: "2-4 weeks",
    features: [
      "Workflow discovery",
      "Tool integrations",
      "Custom automations",
      "Team training",
      "Documentation",
      "30-day support",
    ],
    ctaText: "Automate My Business",
    ctaHref: "#automation",
    accentIcon: "plug",
  },
};

const serviceOrder = Object.keys(services);

const featureWeights: Record<string, Partial<Record<string, number>>> = {
  seo: { "growth-website": 2, "marketing-automation": 2, "starter-landing": 1 },
  cms: { "growth-website": 2, "ecommerce-pro": 1 },
  analytics: {
    "marketing-automation": 2,
    "growth-website": 1,
    "enterprise-custom": 1,
    "ecommerce-pro": 1,
    "workflow-automation": 1,
  },
  multilang: { "enterprise-custom": 3, "ecommerce-pro": 1, "growth-website": 1 },
  integrations: {
    "workflow-automation": 3,
    "enterprise-custom": 2,
    "marketing-automation": 1,
    "ecommerce-pro": 1,
  },
  support: {
    "growth-website": 2,
    "enterprise-custom": 2,
    "workflow-automation": 1,
    "ecommerce-pro": 1,
  },
};

function scoreService(serviceId: string, answers: QuizAnswers): number {
  let score = 0;

  switch (answers.businessType) {
    case "startup":
      if (serviceId === "starter-landing") score += 3;
      if (serviceId === "growth-website") score += 2;
      if (serviceId === "marketing-automation") score += 1;
      break;
    case "sme":
      if (serviceId === "growth-website") score += 3;
      if (serviceId === "starter-landing") score += 2;
      if (serviceId === "marketing-automation") score += 2;
      break;
    case "agency":
      if (serviceId === "marketing-automation") score += 3;
      if (serviceId === "workflow-automation") score += 2;
      if (serviceId === "growth-website") score += 2;
      break;
    case "enterprise":
      if (serviceId === "enterprise-custom") score += 5;
      if (serviceId === "workflow-automation") score += 2;
      if (serviceId === "marketing-automation") score += 2;
      break;
    default:
      break;
  }

  switch (answers.projectGoal) {
    case "new-website":
      if (serviceId === "growth-website") score += 4;
      if (serviceId === "starter-landing") score += 3;
      break;
    case "redesign":
      if (serviceId === "growth-website") score += 4;
      if (serviceId === "enterprise-custom") score += 2;
      break;
    case "ecommerce":
      if (serviceId === "ecommerce-pro") score += 6;
      if (serviceId === "growth-website") score += 1;
      break;
    case "marketing":
      if (serviceId === "marketing-automation") score += 6;
      if (serviceId === "growth-website") score += 1;
      break;
    case "automation":
      if (serviceId === "workflow-automation") score += 6;
      if (serviceId === "enterprise-custom") score += 1;
      break;
    default:
      break;
  }

  switch (answers.timeline) {
    case "asap":
      if (serviceId === "starter-landing") score += 3;
      if (serviceId === "workflow-automation") score += 2;
      if (serviceId === "marketing-automation") score += 2;
      break;
    case "month":
      if (serviceId === "growth-website") score += 2;
      if (serviceId === "workflow-automation") score += 2;
      if (serviceId === "marketing-automation") score += 2;
      if (serviceId === "starter-landing") score += 1;
      break;
    case "quarter":
      if (serviceId === "growth-website") score += 2;
      if (serviceId === "ecommerce-pro") score += 2;
      if (serviceId === "enterprise-custom") score += 1;
      break;
    case "flexible":
      if (serviceId === "enterprise-custom") score += 2;
      if (serviceId === "ecommerce-pro") score += 1;
      if (serviceId === "growth-website") score += 1;
      break;
    default:
      break;
  }

  switch (answers.budget) {
    case "starter":
      if (serviceId === "starter-landing") score += 4;
      break;
    case "growth":
      if (serviceId === "growth-website") score += 4;
      if (serviceId === "workflow-automation") score += 2;
      if (serviceId === "marketing-automation") score += 2;
      break;
    case "premium":
      if (serviceId === "ecommerce-pro") score += 3;
      if (serviceId === "marketing-automation") score += 3;
      if (serviceId === "growth-website") score += 2;
      break;
    case "enterprise-budget":
      if (serviceId === "enterprise-custom") score += 6;
      break;
    default:
      break;
  }

  for (const feature of answers.features) {
    score += featureWeights[feature]?.[serviceId] ?? 0;
  }

  return score;
}

export function routeToService(answers: QuizAnswers): Service {
  const { businessType, projectGoal, timeline, budget } = answers;

  if (budget === "enterprise-budget" || businessType === "enterprise") {
    return services["enterprise-custom"];
  }

  if (projectGoal === "ecommerce") {
    return services["ecommerce-pro"];
  }

  if (projectGoal === "marketing") {
    return services["marketing-automation"];
  }

  if (projectGoal === "automation") {
    return services["workflow-automation"];
  }

  if (budget === "starter" || (timeline === "asap" && budget !== "premium")) {
    return services["starter-landing"];
  }

  return services["growth-website"];
}

export function getAlternativeServices(
  answers: QuizAnswers,
  recommendedServiceId: string,
  count = 2,
): Service[] {
  return serviceOrder
    .filter((serviceId) => serviceId !== recommendedServiceId)
    .map((serviceId, index) => ({
      service: services[serviceId],
      score: scoreService(serviceId, answers),
      index,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.index - b.index;
    })
    .slice(0, count)
    .map((item) => item.service);
}
