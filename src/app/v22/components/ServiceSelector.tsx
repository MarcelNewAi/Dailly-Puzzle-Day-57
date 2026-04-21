import type { Location, Service } from "../data";

interface ServiceSelectorProps {
  services: Service[];
  locations: Location[];
  selectedServiceId: string;
  selectedLocationId: string;
  onServiceChange: (serviceId: string) => void;
  onLocationChange: (locationId: string) => void;
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14.8 4.4a4.6 4.6 0 0 0-1 4.9l-6.5 6.5a2.2 2.2 0 0 0 3.1 3.1l6.5-6.5a4.6 4.6 0 0 0 5.8-5.8l-2.6 2.6-2.9-.5-.5-2.9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServiceSelector({
  services,
  locations,
  selectedServiceId,
  selectedLocationId,
  onServiceChange,
  onLocationChange,
}: ServiceSelectorProps) {
  const selectedService = services.find((service) => service.id === selectedServiceId) ?? services[0];
  const selectedLocation = locations.find((location) => location.id === selectedLocationId) ?? locations[0];

  return (
    <div className="v22-selector-inner">
      <header className="v22-selector-head">
        <span className="v22-selector-icon">
          <WrenchIcon />
        </span>
        <div>
          <h1 className="v22-selector-title">Page Builder</h1>
          <p className="v22-selector-subtitle">Select a service and location to preview</p>
        </div>
      </header>

      <div className="v22-field-stack">
        <label className="v22-field-label" htmlFor="v22-service-select">
          Service
        </label>
        <select
          id="v22-service-select"
          className="v22-select"
          value={selectedServiceId}
          onChange={(event) => onServiceChange(event.target.value)}
        >
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div className="v22-field-stack">
        <label className="v22-field-label" htmlFor="v22-location-select">
          Location
        </label>
        <select
          id="v22-location-select"
          className="v22-select"
          value={selectedLocationId}
          onChange={(event) => onLocationChange(event.target.value)}
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <section className="v22-summary-card" aria-label="Page summary">
        <p className="v22-summary-label">Page summary</p>
        <h2 className="v22-summary-service-name">{selectedService.name}</h2>
        <p className="v22-summary-service-tagline">{selectedService.tagline}</p>

        <div className="v22-summary-divider" />

        <h3 className="v22-summary-location-name">{selectedLocation.name}</h3>
        <p className="v22-summary-license">{selectedLocation.licenseNote}</p>
        <p className="v22-response-badge">{selectedLocation.responseTime}</p>
        <p className="v22-summary-local">{selectedLocation.localNote}</p>
      </section>
    </div>
  );
}
