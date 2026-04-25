interface CopyButtonProps {
  onCopy: () => void;
  copied: boolean;
  disabled?: boolean;
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="v27-btn-icon" aria-hidden="true">
      <rect x="9" y="9" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="v27-btn-icon" aria-hidden="true">
      <path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CopyButton({ onCopy, copied, disabled = false }: CopyButtonProps) {
  const stateClass = copied ? "v27-btn--copy-success" : "v27-btn--copy";
  const disabledClass = disabled ? "v27-btn--copy-disabled" : "";

  return (
    <button
      type="button"
      className={`v27-btn v27-btn--outline ${stateClass} ${disabledClass}`.trim()}
      onClick={onCopy}
      disabled={disabled}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? "Copied!" : "Copy key"}</span>
    </button>
  );
}

