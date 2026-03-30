const testimonials = [
  {
    quote: "They transformed our online presence completely. The results exceeded every expectation.",
    name: "Sarah Mitchell",
    role: "CEO at TechVault",
  },
  {
    quote: "Incredible attention to detail. Our conversion rate doubled within the first month.",
    name: "James Park",
    role: "Founder of Luxe Digital",
  },
  {
    quote: "Professional, responsive, and genuinely talented. They're now our permanent web partner.",
    name: "Elena Rossi",
    role: "Marketing Director",
  },
] as const;

export default function TestimonialsSection() {
  return (
    <section className="v7-site-section">
      <div className="v7-site-shell">
        <h2 className="v7-site-heading">What Our Clients Say</h2>
        <div className="v7-testimonial-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="v7-testimonial-card">
              <span className="v7-quote-mark" aria-hidden="true">
                “
              </span>
              <p className="v7-testimonial-quote">{testimonial.quote}</p>
              <p className="v7-testimonial-name">{testimonial.name}</p>
              <p className="v7-testimonial-role">{testimonial.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}