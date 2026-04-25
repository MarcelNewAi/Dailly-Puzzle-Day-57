export interface Card {
  id: string;
  text: string;
  colour: "default" | "blue" | "green" | "amber" | "rose";
  createdAt: number;
}

export type BoardState = Card[];

export interface HistoryEntry {
  state: BoardState;
  description: string;
  timestamp: number;
}

export interface HistoryStack {
  entries: HistoryEntry[];
  currentIndex: number;
}

export const MAX_HISTORY = 20;

export function createInitialHistory(): HistoryStack {
  const now = Date.now();
  const initial: BoardState = [
    { id: "card-1", text: "Define product vision", colour: "blue", createdAt: now - 5000 },
    { id: "card-2", text: "Map user journeys", colour: "green", createdAt: now - 4000 },
    { id: "card-3", text: "Prioritise features", colour: "default", createdAt: now - 3000 },
    { id: "card-4", text: "Set sprint goals", colour: "amber", createdAt: now - 2000 },
  ];
  return {
    entries: [{ state: initial, description: "Initial board", timestamp: now }],
    currentIndex: 0,
  };
}

export function pushHistory(stack: HistoryStack, newState: BoardState, description: string): HistoryStack {
  const truncated = stack.entries.slice(0, stack.currentIndex + 1);
  const newEntry: HistoryEntry = {
    state: newState,
    description,
    timestamp: Date.now(),
  };
  const newEntries = [...truncated, newEntry].slice(-MAX_HISTORY);
  return {
    entries: newEntries,
    currentIndex: newEntries.length - 1,
  };
}

export function undo(stack: HistoryStack): HistoryStack {
  if (stack.currentIndex <= 0) {
    return stack;
  }
  return { ...stack, currentIndex: stack.currentIndex - 1 };
}

export function redo(stack: HistoryStack): HistoryStack {
  if (stack.currentIndex >= stack.entries.length - 1) {
    return stack;
  }
  return { ...stack, currentIndex: stack.currentIndex + 1 };
}

export function canUndo(stack: HistoryStack): boolean {
  return stack.currentIndex > 0;
}

export function canRedo(stack: HistoryStack): boolean {
  return stack.currentIndex < stack.entries.length - 1;
}

export function currentState(stack: HistoryStack): BoardState {
  return stack.entries[stack.currentIndex].state;
}

export function generateId(): string {
  return "card-" + Math.random().toString(36).slice(2, 9);
}

export function formatHistoryTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  if (diff < 5000) return "just now";
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
  return `${Math.floor(diff / 60000)}m ago`;
}
