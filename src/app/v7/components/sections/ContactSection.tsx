export default function ContactSection() {
  return (
    <section className="v7-site-section">
      <div className="v7-site-shell">
        <h2 className="v7-site-heading">Get In Touch</h2>
        <form
          className="v7-contact-form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label className="v7-form-field">
            <span>Name</span>
            <input type="text" name="name" placeholder="Your name" autoComplete="name" />
          </label>

          <label className="v7-form-field">
            <span>Email</span>
            <input type="email" name="email" placeholder="you@company.com" autoComplete="email" />
          </label>

          <label className="v7-form-field">
            <span>Message</span>
            <textarea name="message" rows={4} placeholder="Tell us about your project..." />
          </label>

          <button type="submit" className="v7-site-btn v7-site-btn-filled">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}