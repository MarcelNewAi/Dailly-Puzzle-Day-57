export type DesignMode = "dark" | "light";
export type PresetKey = "brutalist" | "glass" | "editorial" | "cyberpunk";
export type PresetName = PresetKey | "custom";
export type ButtonStyle = "solid" | "outline" | "ghost" | "gradient";
export type ShadowIntensity = "none" | "subtle" | "medium" | "dramatic";

export type FontName =
  | "Syne"
  | "Space Grotesk"
  | "Fraunces"
  | "Instrument Serif"
  | "Orbitron"
  | "Playfair Display"
  | "Bebas Neue"
  | "Archivo"
  | "Inter"
  | "JetBrains Mono"
  | "DM Sans"
  | "Outfit"
  | "IBM Plex Sans"
  | "Lora"
  | "Manrope"
  | "Space Mono";

export interface DesignState {
  mode: DesignMode;
  preset: PresetName;
  bgColor: string;
  accentColor: string;
  textColor: string;
  fontDisplay: FontName;
  fontBody: FontName;
  fontSize: number;
  borderRadius: number;
  buttonStyle: ButtonStyle;
  shadowIntensity: ShadowIntensity;
  scrollbarWidth: number;
}
