"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: (isActive: boolean) => ReactElement;
};

function AtomLogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  );
}

function HomeIcon(isActive: boolean) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isActive ? "#00F0FF" : "#94A3B8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  );
}

function AllocatorIcon(isActive: boolean) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isActive ? "#00F0FF" : "#94A3B8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h2" />
      <path d="M12 11h2" />
      <path d="M16 11h2" />
      <path d="M8 15h2" />
      <path d="M12 15h2" />
      <path d="M16 15h2" />
    </svg>
  );
}

function NetworkIcon(isActive: boolean) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isActive ? "#00F0FF" : "#94A3B8"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="7" r="2.3" />
      <circle cx="18" cy="7" r="2.3" />
      <circle cx="12" cy="17" r="2.3" />
      <path d="M7.8 8.2 10.3 14" />
      <path d="M16.2 8.2 13.7 14" />
      <path d="M8.5 7h7" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { href: "/v5", label: "Home", icon: HomeIcon },
  { href: "/v5/allocator", label: "Allocator", icon: AllocatorIcon },
  { href: "/v5/network", label: "Network", icon: NetworkIcon },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="nq-navbar nq-anim-nav">
      <div className="nq-navbar-inner">
        <Link href="/v5" className="nq-brand" aria-label="Go to Nexus-Q home page">
          <span className="nq-brand-icon" aria-hidden="true">
            <AtomLogoIcon />
          </span>
          <span>
            <span className="nq-brand-title">Nexus-Q</span>
            <span className="nq-brand-subtitle">Quantum Computing</span>
          </span>
        </Link>

        <nav aria-label="V5 primary navigation">
          <ul className="nq-nav-list">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nq-nav-link ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="nq-nav-icon" aria-hidden="true">
                      {item.icon(isActive)}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
