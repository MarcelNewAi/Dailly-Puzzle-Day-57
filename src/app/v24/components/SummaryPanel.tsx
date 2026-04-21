import type { Category, OptionId } from "../data";
import { getOption } from "../data";
import ShareButton from "./ShareButton";

interface SummaryPanelProps {
  selections: Record<string, OptionId[]>;
  totals: { oneOff: number; monthly: number };
  isValid: boolean;
  shareUrl: string;
  categories: Category[];
}

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m6.8 12.4 3.4 3.4 7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3 9 16H3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M12 8.8v5.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="12" cy="17.8" r="1" fill="currentColor" />
    </svg>
  );
}

export default function SummaryPanel({
  selections,
  totals,
  isValid,
  shareUrl,
  categories,
}: SummaryPanelProps) {
  return (
    <aside className="v24-summary-panel">
      <h2 className="v24-summary-title">Your Package</h2>

      <div className="v24-summary-groups">
        {categories.map((category) => {
          const selectedIds = selections[category.id] ?? [];
          return (
            <section key={category.id} className="v24-summary-category">
              <p className="v24-summary-category-label">{category.name}</p>
              {selectedIds.length > 0 ? (
                <ul className="v24-summary-items">
                  {selectedIds.map((id) => {
                    const option = getOption(id);
                    if (!option) {
                      return null;
                    }
                    return (
                      <li key={id} className="v24-summary-item">
                        <span>{option.name}</span>
                        <span>{option.priceLabel}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : category.required ? (
                <p className="v24-summary-empty v24-summary-empty--required">- Required</p>
              ) : (
                <p className="v24-summary-empty">- Not included</p>
              )}
            </section>
          );
        })}
      </div>

      <hr className="v24-summary-divider" />

      <section className="v24-summary-totals">
        <div>
          <p className="v24-total-label">One-off investment</p>
          <p className="v24-total-value">{currencyFormatter.format(totals.oneOff)}</p>
        </div>
        <div>
          <p className="v24-total-label">Monthly from</p>
          <p className="v24-total-value">
            {totals.monthly > 0 ? `${currencyFormatter.format(totals.monthly)} / mo` : "No ongoing fees"}
          </p>
        </div>
      </section>

      <div className={`v24-validity-indicator ${isValid ? "is-valid" : "is-invalid"}`}>
        <span className="v24-validity-icon" aria-hidden="true">
          {isValid ? <CheckIcon /> : <WarningIcon />}
        </span>
        <p>{isValid ? "Package is ready to share" : "Resolve the issues above first"}</p>
      </div>

      <ShareButton shareUrl={shareUrl} isValid={isValid} />

      <p className="v24-summary-note">
        Prices shown are estimates. A detailed proposal is provided after an initial call.
      </p>
    </aside>
  );
}
