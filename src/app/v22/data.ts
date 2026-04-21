export interface Service {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  directAnswer: string;
  keyFacts: KeyFact[];
  howItWorks: Step[];
  pricing: PricingTier[];
  faqs: FAQ[];
  trustSignals: TrustSignal[];
  ctaHeadline: string;
  ctaBody: string;
}

export interface Location {
  id: string;
  name: string;
  region: string;
  responseTime: string;
  licenseNote: string;
  localNote: string;
}

export interface KeyFact {
  label: string;
  value: string;
  icon: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  range: string;
  description: string;
  note?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TrustSignal {
  label: string;
  detail: string;
}

export interface BuiltPageData {
  title: string;
  metaDescription: string;
  ctaHeadline: string;
  ctaBody: string;
  urlSlug: string;
  directAnswerContext: string;
  pricingHeading: string;
  ctaMeta: string;
  service: Service;
  location: Location;
}

export const services: Service[] = [
  {
    id: "emergency-plumbing",
    name: "Emergency Plumbing",
    slug: "emergency-plumbing",
    tagline: "Fast fixes for burst pipes, leaks, and drain emergencies",
    directAnswer:
      "Emergency plumbing covers urgent repairs like burst pipes, severe leaks, blocked drains, and water heater failures that require immediate attention to prevent property damage.",
    keyFacts: [
      { label: "Response time", value: "60-90 minutes", icon: "clock" },
      { label: "Available", value: "24/7 including holidays", icon: "calendar" },
      { label: "Most common issue", value: "Burst pipe or slab leak", icon: "alert" },
      { label: "Average job time", value: "1.5-3 hours", icon: "wrench" },
      { label: "Diagnostic fee", value: "Included in service", icon: "check" },
      { label: "Warranty", value: "12-month parts and labor", icon: "shield" },
    ],
    howItWorks: [
      {
        number: 1,
        title: "Call or book online",
        description: "Describe the issue and get a same-day appointment confirmed in minutes.",
      },
      {
        number: 2,
        title: "Technician dispatched",
        description: "A licensed plumber arrives within 60-90 minutes with a fully stocked van.",
      },
      {
        number: 3,
        title: "Upfront diagnosis",
        description: "We identify the problem and give you a fixed-price quote before starting any work.",
      },
      {
        number: 4,
        title: "Repair and test",
        description: "The repair is completed and tested thoroughly. We clean up before leaving.",
      },
    ],
    pricing: [
      {
        name: "Minor leak repair",
        range: "$85 - $180",
        description: "Faucet, toilet, or supply line leaks",
        note: "Free estimate",
      },
      {
        name: "Burst pipe",
        range: "$200 - $600",
        description: "Pipe section replacement, varies by access",
        note: "Fixed-price quote",
      },
      {
        name: "Drain clearing",
        range: "$120 - $300",
        description: "Blockage removal with camera inspection",
      },
      {
        name: "Water heater repair",
        range: "$150 - $500",
        description: "Thermostat, element, or valve replacement",
      },
    ],
    faqs: [
      {
        question: "How quickly can a plumber arrive?",
        answer:
          "In most service areas we guarantee a 60-90 minute response for emergencies. Standard bookings are available same day.",
      },
      {
        question: "Do you charge extra for after-hours calls?",
        answer:
          "Evening and weekend calls carry a small surcharge clearly shown at booking. There are no hidden fees.",
      },
      {
        question: "Will you provide a quote before starting?",
        answer:
          "Yes. Every job starts with a free diagnostic and a fixed-price quote. Work only begins once you approve.",
      },
      {
        question: "Are your plumbers licensed?",
        answer:
          "All technicians are fully licensed, insured, and background-checked. License numbers are provided on request.",
      },
      {
        question: "What should I do while waiting for the plumber?",
        answer:
          "Shut off the water supply at the main valve if possible. Avoid using drains connected to the blocked line.",
      },
    ],
    trustSignals: [
      { label: "4.9-star average rating", detail: "Based on 1,200+ verified reviews" },
      { label: "Licensed and insured", detail: "All techs carry $2M liability coverage" },
      { label: "12-month warranty", detail: "On all parts and labor" },
      { label: "Flat-rate pricing", detail: "No surprise charges, ever" },
      { label: "Background checked", detail: "Every technician on every visit" },
    ],
    ctaHeadline: "Need emergency plumbing in {location}?",
    ctaBody: "Our licensed plumbers are available 24/7. Most jobs booked in under 3 minutes.",
  },
  {
    id: "hvac-tune-up",
    name: "HVAC Tune-Up",
    slug: "hvac-tune-up",
    tagline: "Keep your heating and cooling system running efficiently all year",
    directAnswer:
      "An HVAC tune-up is a preventive maintenance visit where a technician inspects, cleans, and calibrates your heating or cooling system to maximize efficiency, extend equipment life, and catch small problems before they become expensive failures.",
    keyFacts: [
      { label: "Typical duration", value: "60-90 minutes", icon: "clock" },
      { label: "Recommended frequency", value: "Twice per year", icon: "calendar" },
      { label: "Average savings", value: "Up to 15% on energy bills", icon: "spark" },
      { label: "Points inspected", value: "21-point checklist", icon: "checklist" },
      { label: "Filter replacement", value: "Included if needed", icon: "filter" },
      { label: "Service warranty", value: "90-day labor guarantee", icon: "shield" },
    ],
    howItWorks: [
      {
        number: 1,
        title: "Schedule online or by phone",
        description: "Pick a time that suits you - morning, afternoon, or evening slots available.",
      },
      {
        number: 2,
        title: "Technician arrives on time",
        description: "Our tech calls 30 minutes ahead and arrives in a clearly marked vehicle.",
      },
      {
        number: 3,
        title: "21-point inspection",
        description: "We test, clean, and calibrate every major component. You get a written report.",
      },
      {
        number: 4,
        title: "Recommendations and report",
        description: "If anything needs attention we explain it clearly and quote upfront - no pressure.",
      },
    ],
    pricing: [
      {
        name: "Single system tune-up",
        range: "$89 - $129",
        description: "Full 21-point inspection + filter check",
        note: "Most popular",
      },
      {
        name: "Dual system (heat + AC)",
        range: "$149 - $199",
        description: "Both units inspected in one visit",
      },
      {
        name: "Annual maintenance plan",
        range: "$199 / year",
        description: "2 visits + priority booking + 10% parts discount",
      },
      {
        name: "Emergency add-on",
        range: "$79",
        description: "Add same-day emergency cover to any plan",
      },
    ],
    faqs: [
      {
        question: "What does a tune-up actually include?",
        answer:
          "We clean coils and filters, check refrigerant levels, test electrical connections, lubricate moving parts, calibrate the thermostat, and inspect the heat exchanger - 21 checks in total.",
      },
      {
        question: "How often should I tune up my HVAC?",
        answer:
          "Twice per year is standard: once in spring before cooling season and once in autumn before heating season.",
      },
      {
        question: "Can a tune-up prevent a breakdown?",
        answer:
          "Yes. Maintenance catches the issues - worn belts, low refrigerant, dirty coils - that cause most breakdowns before they happen.",
      },
      {
        question: "Do you service all HVAC brands?",
        answer:
          "We service all major brands including Carrier, Trane, Lennox, Goodman, Rheem, and York.",
      },
      {
        question: "Is the tune-up worth it?",
        answer:
          "Most customers see a 10-15% drop in energy bills and avoid at least one costly repair per year, making the tune-up easily pay for itself.",
      },
    ],
    trustSignals: [
      { label: "NATE-certified technicians", detail: "Highest standard in HVAC certification" },
      { label: "90-day labor warranty", detail: "On all work performed" },
      { label: "4.8-star customer rating", detail: "2,400+ verified reviews" },
      { label: "All brands serviced", detail: "No brand restrictions" },
      { label: "On-time guarantee", detail: "We call 30 min before arrival" },
    ],
    ctaHeadline: "Schedule your HVAC tune-up in {location}",
    ctaBody:
      "Appointments available this week. Takes under 90 minutes and can save you hundreds on repairs.",
  },
  {
    id: "deep-cleaning",
    name: "Deep Home Cleaning",
    slug: "deep-cleaning",
    tagline: "A thorough top-to-bottom clean that goes beyond your regular routine",
    directAnswer:
      "A deep home cleaning is a comprehensive cleaning service that covers areas typically missed in regular maintenance cleaning - including inside appliances, behind furniture, grout lines, baseboards, window sills, and more - leaving your home fully refreshed.",
    keyFacts: [
      { label: "Average duration", value: "3-6 hours", icon: "clock" },
      { label: "Team size", value: "2-3 trained cleaners", icon: "team" },
      { label: "Products used", value: "Eco-friendly, pet-safe", icon: "leaf" },
      { label: "Areas covered", value: "50+ cleaning tasks", icon: "checklist" },
      { label: "Satisfaction guarantee", value: "Free re-clean within 24h", icon: "shield" },
      { label: "Booking notice needed", value: "As little as 24 hours", icon: "calendar" },
    ],
    howItWorks: [
      {
        number: 1,
        title: "Book and confirm",
        description: "Select your home size and any add-ons. Get an instant price and confirm in minutes.",
      },
      {
        number: 2,
        title: "Team arrives equipped",
        description: "A vetted team arrives with all supplies and equipment - you provide nothing.",
      },
      {
        number: 3,
        title: "Systematic deep clean",
        description:
          "We work room by room through our 50-point checklist, tackling every surface and hidden area.",
      },
      {
        number: 4,
        title: "Walkthrough and sign-off",
        description:
          "We walk through the results with you. Not happy with anything? We fix it on the spot.",
      },
    ],
    pricing: [
      {
        name: "Studio / 1 bed",
        range: "$149 - $199",
        description: "Up to 600 sq ft",
        note: "Most popular",
      },
      {
        name: "2-3 bed home",
        range: "$229 - $319",
        description: "601-1,500 sq ft",
      },
      {
        name: "4+ bed home",
        range: "$349 - $499",
        description: "1,501-3,000 sq ft",
      },
      {
        name: "Add-ons",
        range: "$25 - $75 each",
        description: "Oven, fridge, interior windows, laundry",
      },
    ],
    faqs: [
      {
        question: "What is the difference between a regular clean and a deep clean?",
        answer:
          "A regular clean maintains tidiness. A deep clean tackles built-up grime in places like inside the oven, behind the toilet, inside cabinet doors, grout lines, and under furniture.",
      },
      {
        question: "Do I need to be home during the cleaning?",
        answer:
          "No. Many customers provide a key or entry code. We send a confirmation when we arrive and when we finish.",
      },
      {
        question: "What products do you use?",
        answer:
          "All products are eco-friendly, non-toxic, and safe for children and pets. We can also accommodate fragrance-free requests.",
      },
      {
        question: "How do I prepare for a deep clean?",
        answer:
          "Just tidy away personal items and valuables. There is no need to pre-clean - that is our job.",
      },
      {
        question: "What if I am not satisfied?",
        answer:
          "We offer a 24-hour satisfaction guarantee. If anything was missed, we return and re-clean that area for free.",
      },
    ],
    trustSignals: [
      { label: "100% satisfaction guarantee", detail: "Free re-clean within 24 hours" },
      { label: "Fully insured team", detail: "$1M liability coverage per visit" },
      { label: "4.9-star on Google", detail: "800+ five-star reviews" },
      { label: "Background-checked cleaners", detail: "Every cleaner on every visit" },
      { label: "Eco-friendly products", detail: "Safe for kids, pets, and the planet" },
    ],
    ctaHeadline: "Book a deep clean in {location} today",
    ctaBody: "Slots available this week. Same team every time, all supplies included.",
  },
];

export const locations: Location[] = [
  {
    id: "austin-tx",
    name: "Austin, TX",
    region: "Central Texas",
    responseTime: "Same day",
    licenseNote: "Licensed and insured in Texas (TSBPE #12847)",
    localNote:
      "Serving all Austin metro zip codes including Round Rock, Cedar Park, and Pflugerville",
  },
  {
    id: "denver-co",
    name: "Denver, CO",
    region: "Front Range Colorado",
    responseTime: "Same day",
    licenseNote: "Licensed and insured in Colorado (DORA #89234)",
    localNote: "Serving Denver, Lakewood, Aurora, Littleton, and surrounding areas",
  },
  {
    id: "phoenix-az",
    name: "Phoenix, AZ",
    region: "Greater Phoenix Metro",
    responseTime: "Within 2 hours",
    licenseNote: "Licensed and insured in Arizona (ROC #312456)",
    localNote: "Serving Phoenix, Scottsdale, Tempe, Mesa, and Chandler",
  },
  {
    id: "charlotte-nc",
    name: "Charlotte, NC",
    region: "Piedmont Carolinas",
    responseTime: "Same day",
    licenseNote: "Licensed and insured in North Carolina (NCLB #44821)",
    localNote: "Serving Charlotte, Concord, Gastonia, and surrounding Mecklenburg County",
  },
  {
    id: "seattle-wa",
    name: "Seattle, WA",
    region: "Greater Puget Sound",
    responseTime: "Same or next day",
    licenseNote: "Licensed and insured in Washington State (L&I #BESTSH*890BM)",
    localNote: "Serving Seattle, Bellevue, Kirkland, Redmond, and Renton",
  },
];

export function buildPageData(service: Service, location: Location): BuiltPageData {
  return {
    title: `${service.name} in ${location.name}`,
    metaDescription: `${service.directAnswer} Serving ${location.name} - ${location.responseTime} service. ${location.licenseNote}.`,
    ctaHeadline: service.ctaHeadline.replace("{location}", location.name),
    ctaBody: service.ctaBody,
    urlSlug: `/${service.slug}/${location.id}`,
    directAnswerContext: `Serving ${location.name} - ${location.responseTime} service available. ${location.licenseNote}.`,
    pricingHeading: `Typical costs in ${location.name}`,
    ctaMeta: `${location.localNote} - ${location.responseTime} response in most areas.`,
    service,
    location,
  };
}
