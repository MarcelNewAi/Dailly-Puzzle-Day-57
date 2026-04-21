interface TestPreset {
  id: string;
  label: string;
}

interface DeveloperTestModeProps {
  presets: TestPreset[];
  activePresetId: string | null;
  isTestMode: boolean;
  onUseRealTime: () => void;
  onSelectPreset: (presetId: string) => void;
}

export default function DeveloperTestMode({
  presets,
  activePresetId,
  isTestMode,
  onUseRealTime,
  onSelectPreset,
}: DeveloperTestModeProps) {
  return (
    <section className="v18-dev-panel" aria-label="Developer Test Mode">
      <p className="v18-dev-label">DEVELOPER TEST MODE</p>
      <div className="v18-dev-buttons">
        <button
          type="button"
          className={!isTestMode ? "is-active" : ""}
          onClick={onUseRealTime}
        >
          Use Real Time
        </button>
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={activePresetId === preset.id ? "is-active" : ""}
            onClick={() => onSelectPreset(preset.id)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {isTestMode ? (
        <div className="v18-test-active">
          <p>TEST MODE ACTIVE</p>
          <button type="button" onClick={onUseRealTime}>
            Return to Real Time
          </button>
        </div>
      ) : null}
    </section>
  );
}
