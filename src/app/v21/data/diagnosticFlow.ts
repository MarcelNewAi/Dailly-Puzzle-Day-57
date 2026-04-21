export interface DiagnosticOutcome {
  serviceId: string;
  urgency: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  estimatedTimeframe: string;
  nextSteps: string[];
}

interface AnswerOptionBase {
  id: string;
  label: string;
  description: string;
  icon: string;
}

type NextQuestionOption = {
  nextQuestion: string;
  terminal?: never;
};

type TerminalOption = {
  nextQuestion?: never;
  terminal: DiagnosticOutcome;
};

export type AnswerOption = AnswerOptionBase & (NextQuestionOption | TerminalOption);

export interface Question {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  options: AnswerOption[];
}

export const services = {
  "emergency-recovery": {
    name: "Emergency Site Recovery",
    price: "EUR 500 - EUR 2,000",
    timeframe: "2-24 hours response",
    description:
      "Rapid recovery for sites that are down, hacked, or critically broken. Priority support with direct line to our senior engineers.",
  },
  "security-audit": {
    name: "Security Audit & Hardening",
    price: "EUR 1,200 - EUR 3,500",
    timeframe: "3-7 days",
    description:
      "Full security scan, vulnerability patching, malware removal, and ongoing monitoring setup.",
  },
  "performance-optimization": {
    name: "Performance Optimization",
    price: "EUR 800 - EUR 2,500",
    timeframe: "5-14 days",
    description:
      "Core Web Vitals improvements, image optimization, caching, and speed audits. Typically 2-3x speed improvements.",
  },
  "seo-recovery": {
    name: "SEO Recovery Audit",
    price: "EUR 600 - EUR 1,800",
    timeframe: "7-14 days",
    description:
      "Technical SEO audit, Google Search Console review, and actionable recovery roadmap to recover lost rankings.",
  },
  "design-refresh": {
    name: "Design Refresh",
    price: "EUR 2,000 - EUR 6,000",
    timeframe: "3-5 weeks",
    description:
      "Modernize your existing site without a full rebuild. New visual direction while keeping your current structure.",
  },
  redesign: {
    name: "Full Redesign",
    price: "EUR 5,000 - EUR 15,000",
    timeframe: "6-10 weeks",
    description:
      "Complete design and development rebuild. New architecture, new system, new lifespan.",
  },
  "ongoing-maintenance": {
    name: "Ongoing Maintenance",
    price: "EUR 200 - EUR 800 / month",
    timeframe: "Ongoing",
    description:
      "Monthly plan covering updates, backups, security monitoring, and small fixes. Prevention beats emergency response.",
  },
  "general-consultation": {
    name: "Free Consultation Call",
    price: "Free",
    timeframe: "30 minutes",
    description:
      "Let us talk through your specific situation and identify the right next step together.",
  },
} as const;

export type ServiceId = keyof typeof services;

export const questions: Record<string, Question> = {
  "q1-main-issue": {
    id: "q1-main-issue",
    step: 1,
    title: "What is happening with your site?",
    subtitle: "Pick the option that best describes your current situation.",
    options: [
      {
        id: "down",
        label: "Site is completely down",
        description: "Visitors see an error, white page, or nothing loads",
        icon: "alert-triangle",
        nextQuestion: "q2a-down-how-long",
      },
      {
        id: "slow",
        label: "Site is slow or partially broken",
        description: "Pages load eventually but something is not right",
        icon: "gauge",
        nextQuestion: "q2b-slow-specifics",
      },
      {
        id: "hacked",
        label: "Site shows signs of hacking or malware",
        description: "Unexpected content, redirects, or browser warnings",
        icon: "shield-alert",
        nextQuestion: "q2c-security-impact",
      },
      {
        id: "seo-drop",
        label: "Traffic or rankings dropped suddenly",
        description: "Google traffic disappeared or dropped significantly",
        icon: "trending-down",
        nextQuestion: "q2d-seo-when",
      },
      {
        id: "looks-outdated",
        label: "Site looks outdated or off-brand",
        description: "It works, but the design feels embarrassing",
        icon: "palette",
        nextQuestion: "q2e-design-scope",
      },
    ],
  },
  "q2a-down-how-long": {
    id: "q2a-down-how-long",
    step: 2,
    title: "How long has the site been down?",
    subtitle: "This helps us prioritize response time.",
    options: [
      {
        id: "just-now",
        label: "Just happened (< 1 hour)",
        description: "The site went down recently",
        icon: "clock",
        nextQuestion: "q3a-down-cause",
      },
      {
        id: "today",
        label: "Earlier today",
        description: "Within the last several hours",
        icon: "clock",
        nextQuestion: "q3a-down-cause",
      },
      {
        id: "days",
        label: "A few days",
        description: "Multiple days of downtime",
        icon: "calendar-x",
        terminal: {
          serviceId: "emergency-recovery",
          urgency: "high",
          title: "Your site needs immediate attention",
          description:
            "Extended downtime hurts your business and SEO. Our emergency team can diagnose and restore your site today.",
          estimatedTimeframe: "Response within 4 hours",
          nextSteps: [
            "Send us your hosting access credentials",
            "We will run a full diagnostic within 2 hours",
            "You will have a recovery plan the same day",
          ],
        },
      },
    ],
  },
  "q3a-down-cause": {
    id: "q3a-down-cause",
    step: 3,
    title: "Do you know what caused it?",
    subtitle: "Any recent changes to the site, hosting, or domain?",
    options: [
      {
        id: "recent-change",
        label: "We made recent changes",
        description: "Updates, new content, plugin installs, etc.",
        icon: "git-commit",
        terminal: {
          serviceId: "emergency-recovery",
          urgency: "critical",
          title: "Emergency recovery needed",
          description:
            "Recent changes are the most common cause of downtime and usually the easiest to diagnose. We can often restore service within hours.",
          estimatedTimeframe: "Response within 1 hour",
          nextSteps: [
            "Tell us what was changed and when",
            "We roll back or fix-forward as appropriate",
            "Your site should be back online today",
          ],
        },
      },
      {
        id: "no-idea",
        label: "No idea - it just stopped working",
        description: "Nothing obvious triggered it",
        icon: "help-circle",
        terminal: {
          serviceId: "emergency-recovery",
          urgency: "critical",
          title: "Emergency diagnosis needed",
          description:
            "Sudden downtime with no known cause usually points to hosting issues, expired services, or external attacks. Full diagnostic required.",
          estimatedTimeframe: "Response within 2 hours",
          nextSteps: [
            "Send us your hosting and domain access",
            "Full diagnostic with root cause analysis",
            "Recovery plan delivered same day",
          ],
        },
      },
      {
        id: "hosting-notice",
        label: "Our hosting provider notified us",
        description: "Billing, suspension, or service issue",
        icon: "server",
        terminal: {
          serviceId: "emergency-recovery",
          urgency: "high",
          title: "Hosting recovery support",
          description:
            "Hosting-related downtime is often quick to resolve once the underlying issue is addressed. We can help negotiate with providers or migrate if needed.",
          estimatedTimeframe: "Response within 4 hours",
          nextSteps: [
            "Share the notice from your hosting provider",
            "We will handle resolution or recommend migration",
            "Your site will be back online within 24 hours",
          ],
        },
      },
    ],
  },
  "q2b-slow-specifics": {
    id: "q2b-slow-specifics",
    step: 2,
    title: "What specifically is slow or broken?",
    subtitle: "This helps us understand the scope.",
    options: [
      {
        id: "load-time",
        label: "Pages take forever to load",
        description: "5+ seconds before content appears",
        icon: "gauge",
        nextQuestion: "q3b-slow-when",
      },
      {
        id: "specific-pages",
        label: "Only certain pages are broken",
        description: "Homepage works, but other pages do not",
        icon: "file-x",
        terminal: {
          serviceId: "emergency-recovery",
          urgency: "high",
          title: "Targeted repair needed",
          description:
            "Page-specific breakage usually means template, plugin, or database issues. We can diagnose and repair without affecting the rest of your site.",
          estimatedTimeframe: "Response within 1 day",
          nextSteps: [
            "List the affected pages",
            "We will identify the root cause",
            "Fix deployed within 1-3 days",
          ],
        },
      },
      {
        id: "forms-broken",
        label: "Forms or checkout do not work",
        description: "Submissions fail or do not reach you",
        icon: "form-input",
        terminal: {
          serviceId: "emergency-recovery",
          urgency: "critical",
          title: "Revenue-critical fix needed",
          description:
            "Broken forms mean lost leads and sales. This is a revenue-critical issue that needs same-day attention.",
          estimatedTimeframe: "Response within 2 hours",
          nextSteps: [
            "Test form URLs you share",
            "Identify cause (SMTP, plugin, validation)",
            "Restore form functionality within hours",
          ],
        },
      },
    ],
  },
  "q3b-slow-when": {
    id: "q3b-slow-when",
    step: 3,
    title: "Has it always been slow or is this new?",
    subtitle: "Recent slowdowns often have specific causes we can fix quickly.",
    options: [
      {
        id: "always-slow",
        label: "It has always been slow",
        description: "Never felt fast since launch",
        icon: "history",
        terminal: {
          serviceId: "performance-optimization",
          urgency: "medium",
          title: "Performance optimization recommended",
          description:
            "Chronic slowness usually comes from multiple small issues compounding. A full performance audit will identify the top wins and deliver 2-3x speed improvements.",
          estimatedTimeframe: "Start within 1 week",
          nextSteps: [
            "Full Core Web Vitals audit",
            "Image, caching, and code optimization",
            "Measurable before/after metrics",
          ],
        },
      },
      {
        id: "recently-slow",
        label: "Recently started being slow",
        description: "Something changed in the last few weeks",
        icon: "trending-down",
        terminal: {
          serviceId: "performance-optimization",
          urgency: "high",
          title: "Performance investigation needed",
          description:
            "A sudden slowdown usually points to a specific cause: plugin, hosting change, traffic spike, or content bloat. Fast diagnosis and fix.",
          estimatedTimeframe: "Start within 3 days",
          nextSteps: [
            "Identify when the slowdown started",
            "Trace the root cause",
            "Fix deployed within a week",
          ],
        },
      },
    ],
  },
  "q2c-security-impact": {
    id: "q2c-security-impact",
    step: 2,
    title: "What are you seeing?",
    subtitle: "The severity of signs helps us prioritize response.",
    options: [
      {
        id: "browser-warning",
        label: "Browsers show a security warning",
        description: "Chrome or others flag the site as unsafe",
        icon: "shield-alert",
        terminal: {
          serviceId: "emergency-recovery",
          urgency: "critical",
          title: "Emergency security response",
          description:
            "Browser warnings block most visitors and destroy trust. We need to remove malware and get your site cleared today.",
          estimatedTimeframe: "Response within 1 hour",
          nextSteps: [
            "Full malware scan and removal",
            "Submit for Google blocklist removal",
            "Security hardening to prevent recurrence",
          ],
        },
      },
      {
        id: "suspicious-content",
        label: "Strange content or spam appearing",
        description: "Pages or links you did not create",
        icon: "file-warning",
        terminal: {
          serviceId: "security-audit",
          urgency: "high",
          title: "Security audit and cleanup",
          description:
            "Unauthorized content means your site has been compromised. Full security audit, cleanup, and hardening required.",
          estimatedTimeframe: "Response within 4 hours",
          nextSteps: [
            "Full site scan for all infections",
            "Content cleanup and restoration",
            "Password rotation and access audit",
          ],
        },
      },
      {
        id: "redirects",
        label: "Site redirects to weird places",
        description: "Visitors end up on unexpected external sites",
        icon: "arrow-right",
        terminal: {
          serviceId: "emergency-recovery",
          urgency: "critical",
          title: "Emergency malware removal",
          description:
            "Malicious redirects are among the most damaging infections. We need to act fast to remove the threat and restore normal behavior.",
          estimatedTimeframe: "Response within 1 hour",
          nextSteps: [
            "Emergency malware removal",
            "Fix redirect-injection vulnerability",
            "Full security hardening",
          ],
        },
      },
    ],
  },
  "q2d-seo-when": {
    id: "q2d-seo-when",
    step: 2,
    title: "When did you notice the drop?",
    subtitle: "Timing often correlates with specific causes.",
    options: [
      {
        id: "recent-days",
        label: "Within the last few days",
        description: "Very recent change",
        icon: "calendar-clock",
        terminal: {
          serviceId: "seo-recovery",
          urgency: "high",
          title: "SEO emergency audit",
          description:
            "A sudden drop usually maps to a Google algorithm update, technical issue, or penalty. Fast diagnosis gives you the best chance of full recovery.",
          estimatedTimeframe: "Start within 3 days",
          nextSteps: [
            "Check Google Search Console for manual actions",
            "Technical SEO audit for recent changes",
            "Recovery plan with prioritized actions",
          ],
        },
      },
      {
        id: "weeks-months",
        label: "Over the last few weeks",
        description: "Gradual decline over time",
        icon: "trending-down",
        terminal: {
          serviceId: "seo-recovery",
          urgency: "medium",
          title: "SEO recovery audit",
          description:
            "Gradual declines usually indicate multiple smaller issues accumulating. A thorough audit identifies the real blockers to ranking recovery.",
          estimatedTimeframe: "Start within 1 week",
          nextSteps: [
            "Full technical SEO audit",
            "Content and backlink analysis",
            "90-day recovery roadmap",
          ],
        },
      },
    ],
  },
  "q2e-design-scope": {
    id: "q2e-design-scope",
    step: 2,
    title: "How outdated does it feel?",
    subtitle: "This helps us recommend refresh vs rebuild.",
    options: [
      {
        id: "minor-refresh",
        label: "Mostly fine, just needs polish",
        description: "Colors, fonts, spacing updates",
        icon: "paintbrush",
        terminal: {
          serviceId: "design-refresh",
          urgency: "low",
          title: "Design refresh recommended",
          description:
            "A visual refresh can modernize your site without the cost and timeline of a full rebuild. Ideal when the underlying structure is still working.",
          estimatedTimeframe: "Start within 2 weeks",
          nextSteps: [
            "Visual direction exploration",
            "Refreshed design system",
            "Implementation within 3-5 weeks",
          ],
        },
      },
      {
        id: "major-refresh",
        label: "It is embarrassing to show clients",
        description: "Needs a real modernization",
        icon: "sparkles",
        terminal: {
          serviceId: "redesign",
          urgency: "medium",
          title: "Full redesign recommended",
          description:
            "When the design is genuinely holding you back, a full redesign gives you a new foundation for the next 3-5 years instead of patching an old one.",
          estimatedTimeframe: "Start within 1 month",
          nextSteps: [
            "Discovery and strategy workshop",
            "Complete design and development",
            "Launch within 6-10 weeks",
          ],
        },
      },
      {
        id: "outdated-everything",
        label: "Everything is outdated, not just looks",
        description: "Tech stack, features, and UX all need work",
        icon: "wrench",
        terminal: {
          serviceId: "redesign",
          urgency: "high",
          title: "Full redesign and rebuild",
          description:
            "Compound technical debt becomes a business risk. Rebuilding gives you a modern foundation, better performance, and room to grow.",
          estimatedTimeframe: "Start within 3 weeks",
          nextSteps: [
            "Technical and content audit",
            "New architecture and design",
            "Migration and launch",
          ],
        },
      },
    ],
  },
};

export const FIRST_QUESTION_ID = "q1-main-issue";

export function validateDiagnosticFlow() {
  const questionIds = new Set(Object.keys(questions));

  for (const question of Object.values(questions)) {
    for (const option of question.options) {
      const hasNext = typeof option.nextQuestion === "string";
      const hasTerminal = typeof option.terminal === "object" && option.terminal !== null;

      if (hasNext === hasTerminal) {
        throw new Error(
          `[V21] Option "${option.id}" in question "${question.id}" must have exactly one of nextQuestion or terminal.`,
        );
      }

      if (hasNext && !questionIds.has(option.nextQuestion)) {
        throw new Error(
          `[V21] Option "${option.id}" in question "${question.id}" points to unknown nextQuestion "${option.nextQuestion}".`,
        );
      }
    }
  }
}

