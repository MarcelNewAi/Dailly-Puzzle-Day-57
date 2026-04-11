export interface ServiceArea {
  id: string;
  name: string;
  aliases: string[];
  postcodes: string[];
  region: string;
  coverage: "full" | "partial";
  coordinates: { lat: number; lng: number };
  note?: string;
}

export type MatchResult =
  | { status: "covered"; area: ServiceArea; matchType: "postcode" | "name" | "alias" }
  | { status: "partial"; area: ServiceArea; matchType: "postcode" | "name" | "alias" }
  | { status: "not-covered"; query: string; nearest: ServiceArea[] }
  | { status: "empty" };

export const serviceAreas: ServiceArea[] = [
  {
    id: "ljubljana",
    name: "Ljubljana",
    aliases: ["lj", "ljublana", "laibach"],
    postcodes: [
      "1000", "1001", "1101", "1102", "1103", "1104", "1108", "1109", "1110", "1111", "1112", "1113", "1116",
      "1117", "1118", "1119", "1121", "1122", "1123", "1125", "1127", "1129", "1210", "1211", "1215", "1216", "1217",
      "1218", "1231", "1260", "1261", "1262",
    ],
    region: "Central Slovenia",
    coverage: "full",
    coordinates: { lat: 46.0569, lng: 14.5058 },
  },
  {
    id: "maribor",
    name: "Maribor",
    aliases: ["mb", "marburg"],
    postcodes: [
      "2000", "2103", "2104", "2108", "2109", "2110", "2204", "2205", "2206", "2208", "2211", "2212", "2213", "2214",
      "2221", "2229", "2230", "2231", "2232", "2233", "2234", "2235", "2236", "2241", "2242", "2250", "2251", "2252",
      "2253", "2254", "2255", "2270",
    ],
    region: "Podravje",
    coverage: "full",
    coordinates: { lat: 46.5547, lng: 15.6459 },
  },
  {
    id: "celje",
    name: "Celje",
    aliases: ["cille"],
    postcodes: [
      "3000", "3001", "3002", "3003", "3202", "3203", "3204", "3205", "3206", "3207", "3210", "3211", "3212", "3213",
      "3214", "3215", "3220", "3221", "3222", "3223", "3224", "3225", "3230", "3231", "3232", "3233", "3240", "3241",
      "3250", "3252", "3253", "3254", "3255", "3256", "3257", "3260", "3261", "3262", "3263", "3264", "3270", "3272",
      "3273",
    ],
    region: "Savinjska",
    coverage: "full",
    coordinates: { lat: 46.2389, lng: 15.2675 },
  },
  {
    id: "kranj",
    name: "Kranj",
    aliases: ["krainburg"],
    postcodes: [
      "4000", "4001", "4202", "4203", "4204", "4205", "4206", "4207", "4208", "4209", "4210", "4211", "4212", "4220",
      "4223", "4224", "4226", "4227", "4228", "4229", "4240", "4243", "4244", "4245", "4246", "4247", "4248", "4260",
      "4263", "4264", "4265", "4267", "4270", "4273", "4274", "4275", "4276", "4280", "4281", "4283", "4290",
    ],
    region: "Gorenjska",
    coverage: "full",
    coordinates: { lat: 46.2389, lng: 14.3556 },
  },
  {
    id: "koper",
    name: "Koper",
    aliases: ["capodistria"],
    postcodes: [
      "6000", "6001", "6210", "6211", "6212", "6213", "6215", "6216", "6217", "6219", "6220", "6221", "6222", "6223",
      "6224", "6225", "6230", "6240", "6242", "6243", "6244", "6250", "6251", "6252", "6253", "6254", "6255", "6256",
      "6257", "6258", "6271", "6272", "6273", "6274", "6275", "6276", "6280", "6281",
    ],
    region: "Obalno-kraska",
    coverage: "full",
    coordinates: { lat: 45.5469, lng: 13.7294 },
  },
  {
    id: "novo-mesto",
    name: "Novo mesto",
    aliases: ["novomesto", "rudolfswerth"],
    postcodes: [
      "8000", "8001", "8210", "8211", "8212", "8213", "8216", "8220", "8222", "8230", "8231", "8232", "8233", "8250",
      "8251", "8253", "8254", "8255", "8256", "8257", "8258", "8259", "8261", "8262", "8263", "8270", "8273", "8274",
      "8275", "8276", "8280", "8281", "8283", "8290", "8294", "8295", "8296", "8297", "8310", "8311", "8312", "8321",
      "8322", "8323", "8330", "8331", "8332", "8333", "8340", "8341", "8342", "8343", "8344", "8350", "8351", "8360",
      "8361", "8362",
    ],
    region: "Dolenjska",
    coverage: "full",
    coordinates: { lat: 45.8023, lng: 15.1689 },
  },
  {
    id: "nova-gorica",
    name: "Nova Gorica",
    aliases: ["gorica", "gorizia"],
    postcodes: [
      "5000", "5250", "5251", "5252", "5253", "5261", "5262", "5263", "5271", "5272", "5273", "5274", "5275", "5280",
      "5281", "5282", "5283", "5284", "5290", "5291", "5292", "5293", "5294", "5295", "5296", "5297",
    ],
    region: "Goriska",
    coverage: "partial",
    coordinates: { lat: 45.9558, lng: 13.6458 },
    note: "Limited availability - 48h response time",
  },
  {
    id: "murska-sobota",
    name: "Murska Sobota",
    aliases: ["msobota", "murska"],
    postcodes: [
      "9000", "9201", "9202", "9203", "9204", "9205", "9206", "9207", "9208", "9220", "9221", "9222", "9223", "9224",
      "9225", "9226", "9227", "9231", "9232", "9233", "9234", "9240", "9241", "9242", "9243", "9244", "9245",
    ],
    region: "Pomurje",
    coverage: "partial",
    coordinates: { lat: 46.6625, lng: 16.1664 },
    note: "Limited availability - monthly on-site visits",
  },
  {
    id: "velenje",
    name: "Velenje",
    aliases: ["wollan"],
    postcodes: [
      "3320", "3321", "3322", "3323", "3325", "3326", "3327", "3330", "3331", "3332", "3333", "3334", "3335", "3341",
      "3342",
    ],
    region: "Savinjska",
    coverage: "full",
    coordinates: { lat: 46.3625, lng: 15.1108 },
  },
  {
    id: "ptuj",
    name: "Ptuj",
    aliases: ["pettau"],
    postcodes: ["2250", "2251", "2252", "2253", "2254", "2255", "2256", "2257", "2258"],
    region: "Podravje",
    coverage: "full",
    coordinates: { lat: 46.4199, lng: 15.8703 },
  },
];

export const popularAreas = ["Ljubljana", "Maribor", "Celje", "Kranj", "Koper"];

export function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function checkServiceArea(input: string): MatchResult {
  const normalized = normalize(input);
  if (!normalized) {
    return { status: "empty" };
  }

  const postcodeMatch = normalized.match(/^\d{4,5}$/);
  if (postcodeMatch) {
    const area = serviceAreas.find((entry) =>
      entry.postcodes.some((postcode) => postcode.startsWith(normalized) || normalized.startsWith(postcode)),
    );

    if (area) {
      return {
        status: area.coverage === "full" ? "covered" : "partial",
        area,
        matchType: "postcode",
      };
    }
  }

  const exactMatch = serviceAreas.find(
    (entry) =>
      normalize(entry.name) === normalized || entry.aliases.some((alias) => normalize(alias) === normalized),
  );

  if (exactMatch) {
    return {
      status: exactMatch.coverage === "full" ? "covered" : "partial",
      area: exactMatch,
      matchType: normalize(exactMatch.name) === normalized ? "name" : "alias",
    };
  }

  const partialMatch = serviceAreas.find(
    (entry) =>
      normalize(entry.name).startsWith(normalized) ||
      entry.aliases.some((alias) => normalize(alias).startsWith(normalized)),
  );

  if (partialMatch) {
    return {
      status: partialMatch.coverage === "full" ? "covered" : "partial",
      area: partialMatch,
      matchType: "name",
    };
  }

  const nearest = serviceAreas
    .filter((entry) => entry.coverage === "full")
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 3);

  return {
    status: "not-covered",
    query: input.trim(),
    nearest,
  };
}

export function getAutocompleteSuggestions(input: string, limit = 6): ServiceArea[] {
  const normalized = normalize(input);
  if (!normalized) {
    return [];
  }

  const scored = serviceAreas
    .map((area) => {
      const normalizedName = normalize(area.name);
      const aliasMatch = area.aliases.some((alias) => normalize(alias).startsWith(normalized));
      const postcodeMatch = area.postcodes.some((postcode) => postcode.startsWith(normalized));

      let score = -1;
      if (normalizedName === normalized) {
        score = 100;
      } else if (aliasMatch && area.aliases.some((alias) => normalize(alias) === normalized)) {
        score = 95;
      } else if (normalizedName.startsWith(normalized)) {
        score = 90;
      } else if (aliasMatch) {
        score = 80;
      } else if (postcodeMatch) {
        score = 70;
      } else if (normalizedName.includes(normalized)) {
        score = 60;
      }

      return { area, score };
    })
    .filter((item) => item.score >= 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.area.name.localeCompare(b.area.name);
    })
    .slice(0, limit)
    .map((item) => item.area);

  return scored;
}
