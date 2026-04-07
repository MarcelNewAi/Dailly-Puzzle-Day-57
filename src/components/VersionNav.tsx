"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "V1", href: "/" },
  { label: "V2", href: "/v2" },
  { label: "V3", href: "/v3" },
  { label: "V4", href: "/v4" },
  { label: "V5", href: "/v5" },
  { label: "V6", href: "/v6" },
  { label: "V7", href: "/v7" },
  { label: "V8", href: "/v8" },
  { label: "V9", href: "/v9" },
];

export default function VersionNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed right-5 bottom-5 z-50 rounded-full border border-white/30 bg-white/20 p-1.5 shadow-2xl backdrop-blur-xl">
      <ul className="flex items-center gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`inline-flex min-w-11 items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-white/85 text-black"
                    : "bg-white/10 text-white hover:bg-white/30"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
