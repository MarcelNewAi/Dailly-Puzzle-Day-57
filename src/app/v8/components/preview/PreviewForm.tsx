"use client";

export default function PreviewForm() {
  return (
    <section className="v8-preview-section">
      <h3 className="v8-preview-title">Form Elements</h3>
      <div className="v8-form-stack">
        <label className="v8-form-label" htmlFor="v8-preview-input">
          Text Input
        </label>
        <input id="v8-preview-input" className="v8-input" type="text" placeholder="Type something..." />

        <label className="v8-form-label" htmlFor="v8-preview-select">
          Select Option
        </label>
        <select id="v8-preview-select" className="v8-input" defaultValue="starter">
          <option value="starter">Starter Plan</option>
          <option value="pro">Pro Plan</option>
          <option value="enterprise">Enterprise Plan</option>
        </select>

        <label className="v8-checkbox-row" htmlFor="v8-preview-checkbox">
          <input id="v8-preview-checkbox" className="v8-checkbox" type="checkbox" defaultChecked />
          <span>Enable notifications</span>
        </label>
      </div>
    </section>
  );
}

