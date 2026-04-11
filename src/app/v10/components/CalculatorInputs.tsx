"use client";

import BusinessTypeSelector from "./inputs/BusinessTypeSelector";
import ClientCountSlider from "./inputs/ClientCountSlider";
import ConversionRateSlider from "./inputs/ConversionRateSlider";
import CurrentToolCostInput from "./inputs/CurrentToolCostInput";
import HourlyRateInput from "./inputs/HourlyRateInput";
import HoursPerClientSlider from "./inputs/HoursPerClientSlider";

type BusinessType = "agency" | "consulting" | "freelancer" | "studio";

type CalculatorInputsProps = {
  inputs: {
    businessType: BusinessType;
    clients: number;
    hourlyRate: number;
    hoursPerClient: number;
    conversionRate: number;
    currentToolCost: number;
  };
  onBusinessTypeChange: (businessType: BusinessType) => void;
  onClientsChange: (clients: number) => void;
  onHourlyRateChange: (hourlyRate: number) => void;
  onHoursPerClientChange: (hoursPerClient: number) => void;
  onConversionRateChange: (conversionRate: number) => void;
  onCurrentToolCostChange: (currentToolCost: number) => void;
  onReset: () => void;
};

export default function CalculatorInputs({
  inputs,
  onBusinessTypeChange,
  onClientsChange,
  onHourlyRateChange,
  onHoursPerClientChange,
  onConversionRateChange,
  onCurrentToolCostChange,
  onReset,
}: CalculatorInputsProps) {
  return (
    <section className="v10-panel v10-controls-panel v10-panel-animated" aria-label="ROI calculator inputs">
      <header className="v10-panel-header">
        <h2 className="v10-panel-title">ROI Calculator</h2>
        <p className="v10-panel-subtitle">Enter your business details below</p>
      </header>

      <div className="v10-controls-stack">
        <BusinessTypeSelector value={inputs.businessType} onChange={onBusinessTypeChange} />
        <ClientCountSlider value={inputs.clients} onChange={onClientsChange} />
        <HourlyRateInput value={inputs.hourlyRate} onChange={onHourlyRateChange} />
        <HoursPerClientSlider value={inputs.hoursPerClient} onChange={onHoursPerClientChange} />
        <ConversionRateSlider value={inputs.conversionRate} onChange={onConversionRateChange} />
        <CurrentToolCostInput value={inputs.currentToolCost} onChange={onCurrentToolCostChange} />
      </div>

      <button type="button" className="v10-reset-btn" onClick={onReset} aria-label="Reset calculator inputs to business defaults">
        Reset to Defaults
      </button>
    </section>
  );
}
