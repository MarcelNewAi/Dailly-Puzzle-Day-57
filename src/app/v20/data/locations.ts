export interface DayHours {
  day: string;
  hours: string;
}

export interface TeamMember {
  name: string;
  role: string;
  email: string;
}

export interface Location {
  id: string;
  city: string;
  country: string;
  countryFlag: string;
  isHeadquarters: boolean;
  address: {
    street: string;
    postal: string;
    region: string;
  };
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  hours: DayHours[];
  services: string[];
  team: TeamMember;
  cta: {
    text: string;
    subtext: string;
    type: "office-visit" | "consultation" | "remote" | "partner";
  };
  badge?: string;
}

export const locations: Location[] = [
  {
    id: "ljubljana",
    city: "Ljubljana",
    country: "Slovenia",
    countryFlag: "SI",
    isHeadquarters: true,
    address: {
      street: "Slovenska cesta 47",
      postal: "1000 Ljubljana",
      region: "Central Slovenia",
    },
    phone: "+386 1 234 5678",
    email: "ljubljana@studio.com",
    coordinates: { lat: 46.0569, lng: 14.5058 },
    hours: [
      { day: "Monday", hours: "08:00 - 18:00" },
      { day: "Tuesday", hours: "08:00 - 18:00" },
      { day: "Wednesday", hours: "08:00 - 18:00" },
      { day: "Thursday", hours: "08:00 - 18:00" },
      { day: "Friday", hours: "08:00 - 17:00" },
      { day: "Saturday", hours: "10:00 - 14:00" },
      { day: "Sunday", hours: "Closed" },
    ],
    services: ["Web Development", "UI/UX Design", "Brand Identity", "Strategy Consulting", "On-site Workshops"],
    team: {
      name: "Marcel Novak",
      role: "Studio Director",
      email: "marcel@studio.com",
    },
    cta: {
      text: "Book a Studio Visit →",
      subtext: "Meet the team in person at our headquarters",
      type: "office-visit",
    },
    badge: "HEADQUARTERS",
  },
  {
    id: "maribor",
    city: "Maribor",
    country: "Slovenia",
    countryFlag: "SI",
    isHeadquarters: false,
    address: {
      street: "Partizanska cesta 12",
      postal: "2000 Maribor",
      region: "Podravje",
    },
    phone: "+386 2 345 6789",
    email: "maribor@studio.com",
    coordinates: { lat: 46.5547, lng: 15.6459 },
    hours: [
      { day: "Monday", hours: "09:00 - 17:00" },
      { day: "Tuesday", hours: "09:00 - 17:00" },
      { day: "Wednesday", hours: "09:00 - 17:00" },
      { day: "Thursday", hours: "09:00 - 17:00" },
      { day: "Friday", hours: "09:00 - 16:00" },
      { day: "Saturday", hours: "By appointment" },
      { day: "Sunday", hours: "Closed" },
    ],
    services: ["Web Development", "UI/UX Design", "Brand Identity", "Local Consulting"],
    team: {
      name: "Ana Kovač",
      role: "Regional Lead",
      email: "ana@studio.com",
    },
    cta: {
      text: "Schedule a Consultation →",
      subtext: "Free 30-minute discovery call with our regional team",
      type: "consultation",
    },
  },
  {
    id: "zagreb",
    city: "Zagreb",
    country: "Croatia",
    countryFlag: "HR",
    isHeadquarters: false,
    address: {
      street: "Ilica 124",
      postal: "10000 Zagreb",
      region: "Grad Zagreb",
    },
    phone: "+385 1 234 5678",
    email: "zagreb@studio.com",
    coordinates: { lat: 45.815, lng: 15.9819 },
    hours: [
      { day: "Monday", hours: "09:00 - 18:00" },
      { day: "Tuesday", hours: "09:00 - 18:00" },
      { day: "Wednesday", hours: "09:00 - 18:00" },
      { day: "Thursday", hours: "09:00 - 18:00" },
      { day: "Friday", hours: "09:00 - 17:00" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" },
    ],
    services: ["Web Development", "UI/UX Design", "Cross-border Projects", "Croatian Market Strategy"],
    team: {
      name: "Marko Horvat",
      role: "Croatia Director",
      email: "marko@studio.com",
    },
    cta: {
      text: "Visit Our Zagreb Office →",
      subtext: "Centrally located in downtown Ilica",
      type: "office-visit",
    },
  },
  {
    id: "remote",
    city: "Remote",
    country: "Worldwide",
    countryFlag: "GLOBE",
    isHeadquarters: false,
    address: {
      street: "Distributed team",
      postal: "Across Europe",
      region: "Worldwide",
    },
    phone: "+386 1 234 5678",
    email: "remote@studio.com",
    coordinates: { lat: 0, lng: 0 },
    hours: [
      { day: "Monday", hours: "Async + 09:00 - 17:00 CET overlap" },
      { day: "Tuesday", hours: "Async + 09:00 - 17:00 CET overlap" },
      { day: "Wednesday", hours: "Async + 09:00 - 17:00 CET overlap" },
      { day: "Thursday", hours: "Async + 09:00 - 17:00 CET overlap" },
      { day: "Friday", hours: "Async + 09:00 - 15:00 CET overlap" },
      { day: "Saturday", hours: "Async only" },
      { day: "Sunday", hours: "Async only" },
    ],
    services: ["Web Development", "UI/UX Design", "Async Collaboration", "Global Project Delivery", "24/5 Coverage"],
    team: {
      name: "Distributed Team",
      role: "Remote-First Operations",
      email: "remote@studio.com",
    },
    cta: {
      text: "Start a Remote Project →",
      subtext: "Work with us from anywhere — async-friendly workflows",
      type: "remote",
    },
    badge: "GLOBAL",
  },
];

export const DEFAULT_LOCATION_ID = "ljubljana";
