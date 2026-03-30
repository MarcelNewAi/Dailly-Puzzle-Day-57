import type { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "filled" | "outlined";
  className?: string;
  ariaLabel?: string;
}

export default function Button({ href, children, variant = "outlined", className = "", ariaLabel }: ButtonProps) {
  return (
    <Link href={href} className={`nq-btn nq-btn-${variant} ${className}`.trim()} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

