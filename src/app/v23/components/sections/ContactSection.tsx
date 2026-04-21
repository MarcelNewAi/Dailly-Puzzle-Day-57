interface ContactSectionProps {
  isVisible: boolean;
  isActive: boolean;
}

const contacts = [
  { label: "New commissions", email: "studio@varrostudio.com" },
  { label: "Press & publications", email: "press@varrostudio.com" },
  { label: "Careers", email: "work@varrostudio.com" },
];

export default function ContactSection({ isVisible, isActive }: ContactSectionProps) {
  const revealClass = isVisible ? "v23-reveal v23-revealed" : "v23-reveal";

  return (
    <section
      id="contact"
      data-section="contact"
      data-active={isActive ? "true" : "false"}
      className={`v23-section ${isActive ? "v23-section-active" : ""}`}
    >
      <div className="v23-section-inner v23-stagger">
        <p className={`v23-section-label v23-child ${revealClass}`}>05 / Contact</p>
        <h2 className={`v23-heading v23-child ${revealClass}`}>Begin a conversation.</h2>

        <div className="v23-contact-grid">
          <div className={`v23-contact-copy v23-child ${revealClass}`}>
            <p className="v23-contact-body">
              We accept a limited number of new commissions each year. If you have a project in
              mind - residential, cultural, or otherwise - we would like to hear about it.
            </p>
            <p className="v23-contact-body">Response within 24 hours.</p>
            <p className="v23-contact-link-row">
              <a className="v23-contact-link" href="mailto:studio@varrostudio.com">
                studio@varrostudio.com
              </a>
            </p>
            <p className="v23-contact-body">+386 1 234 5678</p>
            <address className="v23-contact-details">
              Varro Studio
              <br />
              Trubarjeva 12
              <br />
              1000 Ljubljana
              <br />
              Slovenia
            </address>
          </div>

          <div className="v23-contact-cards v23-stagger">
            {contacts.map((contact) => (
              <article key={contact.email} className={`v23-contact-card v23-child ${revealClass}`}>
                <p className="v23-contact-card-label">{contact.label}</p>
                <a className="v23-contact-card-link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className={`v23-contact-footer v23-child ${revealClass}`}>
          <span className="v23-contact-divider" aria-hidden="true" />
          <p>(c) 2025 Varro Studio. All rights reserved. - Ljubljana, Slovenia.</p>
        </div>
      </div>
    </section>
  );
}

