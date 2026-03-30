"use client";

import type { ReactNode } from "react";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--nq-font-ui",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--nq-font-mono",
});

export default function V5Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} nq-app`}>
      <Navbar />
      <main className="nq-main">{children}</main>
      <Footer />
    </div>
  );
}

