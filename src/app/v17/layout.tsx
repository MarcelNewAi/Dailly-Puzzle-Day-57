import type { ReactNode } from "react";
import {
  Archivo,
  Bebas_Neue,
  DM_Sans,
  Fraunces,
  IBM_Plex_Sans,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Lora,
  Manrope,
  Orbitron,
  Outfit,
  Playfair_Display,
  Space_Grotesk,
  Space_Mono,
  Syne,
} from "next/font/google";

const syne = Syne({ subsets: ["latin"], variable: "--font-v17-syne", weight: ["500", "600", "700", "800"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-v17-space-grotesk",
  weight: ["400", "500", "600", "700"],
});
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-v17-fraunces", weight: ["400", "500", "600", "700"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], variable: "--font-v17-instrument-serif", weight: ["400"] });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-v17-orbitron", weight: ["400", "500", "600", "700"] });
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-v17-playfair-display",
  weight: ["400", "500", "600", "700"],
});
const bebasNeue = Bebas_Neue({ subsets: ["latin"], variable: "--font-v17-bebas-neue", weight: ["400"] });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-v17-archivo", weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-v17-inter", weight: ["400", "500", "600", "700"] });
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-v17-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-v17-dm-sans", weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-v17-outfit", weight: ["400", "500", "600", "700"] });
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-v17-ibm-plex-sans",
  weight: ["400", "500", "600", "700"],
});
const lora = Lora({ subsets: ["latin"], variable: "--font-v17-lora", weight: ["400", "500", "600", "700"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-v17-manrope", weight: ["400", "500", "600", "700"] });
const spaceMono = Space_Mono({ subsets: ["latin"], variable: "--font-v17-space-mono", weight: ["400", "700"] });

export default function V17Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${syne.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${instrumentSerif.variable} ${orbitron.variable} ${playfairDisplay.variable} ${bebasNeue.variable} ${archivo.variable} ${inter.variable} ${jetBrainsMono.variable} ${dmSans.variable} ${outfit.variable} ${ibmPlexSans.variable} ${lora.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      {children}
    </div>
  );
}
