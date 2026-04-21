export interface TimeRange {
  open: string; // "HH:MM" 24-hour
  close: string;
}

export interface DaySchedule {
  day: string;
  dayShort: string;
  regular: TimeRange | null; // null = closed on regular hours
  emergency: TimeRange | null; // emergency-only coverage outside regular hours
}

export const businessHours: DaySchedule[] = [
  { day: "Monday", dayShort: "Mon", regular: { open: "08:00", close: "18:00" }, emergency: { open: "18:00", close: "22:00" } },
  { day: "Tuesday", dayShort: "Tue", regular: { open: "08:00", close: "18:00" }, emergency: { open: "18:00", close: "22:00" } },
  { day: "Wednesday", dayShort: "Wed", regular: { open: "08:00", close: "18:00" }, emergency: { open: "18:00", close: "22:00" } },
  { day: "Thursday", dayShort: "Thu", regular: { open: "08:00", close: "18:00" }, emergency: { open: "18:00", close: "22:00" } },
  { day: "Friday", dayShort: "Fri", regular: { open: "08:00", close: "17:00" }, emergency: { open: "17:00", close: "21:00" } },
  { day: "Saturday", dayShort: "Sat", regular: { open: "10:00", close: "14:00" }, emergency: { open: "14:00", close: "20:00" } },
  { day: "Sunday", dayShort: "Sun", regular: null, emergency: { open: "10:00", close: "18:00" } },
];

export const businessInfo = {
  name: "Nordic Studio",
  phone: "+386 1 234 5678",
  emergencyPhone: "+386 41 123 456",
  email: "hello@nordicstudio.com",
  timezone: "Europe/Ljubljana",
};
