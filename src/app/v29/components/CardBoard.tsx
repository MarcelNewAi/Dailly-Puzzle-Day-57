import type { BoardState, Card } from "../history";
import AddCardButton from "./AddCardButton";
import BoardCard from "./BoardCard";

interface CardBoardProps {
  board: BoardState;
  onUpdateCard: (id: string, text: string) => void;
  onChangeColour: (id: string, colour: Card["colour"]) => void;
  onDeleteCard: (id: string) => void;
  onAddCard: () => void;
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function CardBoard({ board, onUpdateCard, onChangeColour, onDeleteCard, onAddCard }: CardBoardProps) {
  return (
    <section className="v29-canvas-area" aria-label="Card board canvas">
      <div className="v29-card-grid">
        {board.map((card) => (
          <BoardCard
            key={card.id}
            card={card}
            onUpdate={onUpdateCard}
            onChangeColour={onChangeColour}
            onDelete={onDeleteCard}
          />
        ))}

        <AddCardButton onAdd={onAddCard} />
      </div>

      {board.length === 0 ? (
        <div className="v29-empty-state">
          <span className="v29-empty-state-icon" aria-hidden="true">
            <PlusIcon />
          </span>
          <span>No cards · Add one to get started</span>
        </div>
      ) : null}
    </section>
  );
}
