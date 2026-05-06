import { archive2026 } from "./2026/archive";

export interface ConferenceEditionColors {
  euBlue: string;
  euBlueDark: string;
  euBlueLight: string;
  euGold: string;
  euGoldDark: string;
  euGoldLight: string;
  euGreen: string;
  euGreenDark: string;
  euGreenLight: string;
}

export interface ConferenceEditionIdentity {
  year: number;
  label: string;
  className: string;
  visualIdentity: {
    name: string;
    colors: ConferenceEditionColors;
  };
}

export interface ArchiveYearLink {
  label: string;
  href: string;
  description: string;
}

export interface ConferenceArchiveYear {
  year: number;
  date: string;
  location: string;
  venue: string;
  summary: string;
  edition: ConferenceEditionIdentity;
  links: ArchiveYearLink[];
}

export const archiveYears: ConferenceArchiveYear[] = [archive2026];
