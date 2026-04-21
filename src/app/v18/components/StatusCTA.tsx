import { businessInfo } from "../data/businessHours";
import type { BusinessStatus } from "../lib/businessStatus";

interface StatusCTAProps {
  status: BusinessStatus;
}

type CTAConfig = {
  primary: { text: string; href: string; icon: "phone" | "alert" | "mail"; color: "teal" | "amber" };
  secondary: { text: string; href: string };
  message: string;
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 4h4l1.3 4-2.2 1.9a16 16 0 0 0 5.1 5.1l1.9-2.2L19 14v4c0 .6-.4 1-1 1A15 15 0 0 1 4 6c0-.6.4-1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3 2 21h20L12 3Zm0 6v5m0 3h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 6h18v12H3V6Zm1 1 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getCTA(status: BusinessStatus): CTAConfig {
  switch (status.state) {
    case "open-regular":
      return {
        primary: { text: "Call Us Now", href: `tel:${businessInfo.phone}`, icon: "phone", color: "teal" },
        secondary: { text: "Book a Meeting \u2192", href: "#contact" },
        message: "Our team is available and ready to help.",
      };
    case "open-emergency":
      return {
        primary: { text: "Call Emergency Line", href: `tel:${businessInfo.emergencyPhone}`, icon: "alert", color: "amber" },
        secondary: { text: "Send Email \u2192", href: `mailto:${businessInfo.email}` },
        message: "Emergency support is available for urgent issues only.",
      };
    case "closed":
      return {
        primary: { text: "Leave a Message", href: `mailto:${businessInfo.email}`, icon: "mail", color: "teal" },
        secondary: { text: "View Schedule \u2193", href: "#schedule" },
        message: "We'll get back to you during business hours.",
      };
    default:
      return {
        primary: { text: "Call Us Now", href: `tel:${businessInfo.phone}`, icon: "phone", color: "teal" },
        secondary: { text: "Book a Meeting \u2192", href: "#contact" },
        message: "Our team is available and ready to help.",
      };
  }
}

function CTAIcon({ icon }: { icon: CTAConfig["primary"]["icon"] }) {
  if (icon === "alert") {
    return <AlertIcon />;
  }
  if (icon === "mail") {
    return <MailIcon />;
  }
  return <PhoneIcon />;
}

export default function StatusCTA({ status }: StatusCTAProps) {
  const cta = getCTA(status);

  return (
    <section className="v18-cta-wrap is-visible" id="contact">
      <div key={status.state} className="v18-state-swap">
        <div className="v18-cta-buttons">
          <a className={`v18-cta-primary is-${cta.primary.color}`} href={cta.primary.href}>
            <span className="v18-cta-primary-icon">
              <CTAIcon icon={cta.primary.icon} />
            </span>
            {cta.primary.text}
          </a>
          <a className="v18-cta-secondary" href={cta.secondary.href}>
            {cta.secondary.text}
          </a>
        </div>
        <p className="v18-cta-message">{cta.message}</p>
      </div>
    </section>
  );
}
