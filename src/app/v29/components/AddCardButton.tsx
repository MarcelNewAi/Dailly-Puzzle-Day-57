interface AddCardButtonProps {
  onAdd: () => void;
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function AddCardButton({ onAdd }: AddCardButtonProps) {
  return (
    <button type="button" className="v29-add-card-btn" onClick={onAdd}>
      <PlusIcon />
      <span>Add card</span>
    </button>
  );
}
