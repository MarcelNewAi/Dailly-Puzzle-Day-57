interface ColorCustomizerProps {
  thumbColor: string;
  hoverColor: string;
  showTrack: boolean;
  onThumbColorChange: (value: string) => void;
  onHoverColorChange: (value: string) => void;
  onShowTrackChange: (value: boolean) => void;
  onReset: () => void;
}

const emeraldPresets = ["#10B981", "#059669", "#34D399", "#047857", "#22C55E", "#16A34A"];

export default function ColorCustomizer({
  thumbColor,
  hoverColor,
  showTrack,
  onThumbColorChange,
  onHoverColorChange,
  onShowTrackChange,
  onReset,
}: ColorCustomizerProps) {
  return (
    <section className="rounded-2xl border border-emerald-400/25 bg-[#101a16]/85 p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)]">
      <h2 className="text-2xl font-semibold text-emerald-50">Live Color Customizer</h2>
      <p className="mt-2 text-sm text-emerald-100/75">Adjust colors and track visibility. The page scrollbar updates in real-time.</p>

      <div className="mt-5">
        <p className="text-sm font-medium text-emerald-200">Emerald Presets</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {emeraldPresets.map((preset) => {
            const selected = thumbColor.toUpperCase() === preset;
            return (
              <button
                key={preset}
                type="button"
                aria-label={`Set thumb color to ${preset}`}
                title={preset}
                onClick={() => {
                  onThumbColorChange(preset);
                  onHoverColorChange(preset === "#10B981" ? "#34D399" : "#10B981");
                }}
                className={`h-9 w-9 rounded-full border ${selected ? "border-emerald-100" : "border-emerald-400/40"}`}
                style={{ backgroundColor: preset }}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-emerald-200">
          Thumb Color
          <input
            type="color"
            value={thumbColor}
            onChange={(event) => onThumbColorChange(event.target.value.toUpperCase())}
            className="h-10 w-full cursor-pointer rounded border border-emerald-400/40 bg-transparent"
          />
        </label>

        <label className="grid gap-2 text-sm text-emerald-200">
          Hover Color
          <input
            type="color"
            value={hoverColor}
            onChange={(event) => onHoverColorChange(event.target.value.toUpperCase())}
            className="h-10 w-full cursor-pointer rounded border border-emerald-400/40 bg-transparent"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-emerald-100">
          <input
            type="checkbox"
            checked={showTrack}
            onChange={(event) => onShowTrackChange(event.target.checked)}
            className="h-4 w-4 accent-emerald-500"
          />
          Show Track
        </label>

        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-emerald-400/55 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
        >
          Reset to Emerald Default
        </button>
      </div>
    </section>
  );
}
