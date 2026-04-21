export default function PreviewForm() {
  return (
    <section className="v17-preview-section">
      <h2 className="v17-section-title">FORM ELEMENTS</h2>
      <div className="v17-form-grid">
        <input className="v17-input" type="text" placeholder="Project name" />
        <select className="v17-input" defaultValue="">
          <option value="" disabled>
            Select service tier
          </option>
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>
        <textarea className="v17-input v17-textarea" rows={4} placeholder="Describe your request..." />
      </div>
    </section>
  );
}
