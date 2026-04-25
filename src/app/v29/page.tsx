"use client";

import type { CSSProperties } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import ExplanationTriggerButton from "@/components/ExplanationTriggerButton";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import CardBoard from "./components/CardBoard";
import HistoryPanel from "./components/HistoryPanel";
import Toolbar from "./components/Toolbar";
import {
  canRedo as canRedoHistory,
  canUndo as canUndoHistory,
  createInitialHistory,
  currentState,
  generateId,
  pushHistory,
  redo,
  undo,
  type Card,
  type HistoryStack,
} from "./history";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function V29Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [historyStack, setHistoryStack] = useState<HistoryStack>(() => createInitialHistory());

  const board = currentState(historyStack);
  const canUndo = canUndoHistory(historyStack);
  const canRedo = canRedoHistory(historyStack);

  const addCard = useCallback(() => {
    setHistoryStack((prev) => {
      const currentBoard = currentState(prev);
      const newCard: Card = {
        id: generateId(),
        text: "New card",
        colour: "default",
        createdAt: Date.now(),
      };
      return pushHistory(prev, [...currentBoard, newCard], "Added card");
    });
  }, []);

  const updateCard = useCallback((id: string, text: string) => {
    setHistoryStack((prev) => {
      const currentBoard = currentState(prev);
      let changed = false;
      const newState = currentBoard.map((card) => {
        if (card.id !== id || card.text === text) {
          return card;
        }
        changed = true;
        return { ...card, text };
      });
      if (!changed) {
        return prev;
      }
      return pushHistory(prev, newState, "Edited card");
    });
  }, []);

  const changeCardColour = useCallback((id: string, colour: Card["colour"]) => {
    setHistoryStack((prev) => {
      const currentBoard = currentState(prev);
      let changed = false;
      const newState = currentBoard.map((card) => {
        if (card.id !== id || card.colour === colour) {
          return card;
        }
        changed = true;
        return { ...card, colour };
      });
      if (!changed) {
        return prev;
      }
      return pushHistory(prev, newState, "Changed card colour");
    });
  }, []);

  const deleteCard = useCallback((id: string) => {
    setHistoryStack((prev) => {
      const currentBoard = currentState(prev);
      const newState = currentBoard.filter((card) => card.id !== id);
      if (newState.length === currentBoard.length) {
        return prev;
      }
      return pushHistory(prev, newState, "Deleted card");
    });
  }, []);

  const handleUndo = useCallback(() => {
    setHistoryStack((prev) => undo(prev));
  }, []);

  const handleRedo = useCallback(() => {
    setHistoryStack((prev) => redo(prev));
  }, []);

  const handleJumpTo = useCallback((index: number) => {
    setHistoryStack((prev) => {
      if (index < 0 || index >= prev.entries.length || index === prev.currentIndex) {
        return prev;
      }
      return { ...prev, currentIndex: index };
    });
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;
      if (!mod) {
        return;
      }

      if (event.key === "z" && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
      }

      if (event.key === "y" || (event.key === "z" && event.shiftKey)) {
        event.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleRedo, handleUndo]);

  const rootStyle = {
    "--v29-font-display": plusJakarta.style.fontFamily,
    "--v29-font-body": inter.style.fontFamily,
  } as CSSProperties;

  return (
    <>
      <div ref={scrollRef} className="v29-scroll-shell hide-native-scrollbar">
        <div className="v29-root" style={rootStyle}>
          <main className="v29-page">
            <Toolbar
              cardCount={board.length}
              canUndo={canUndo}
              canRedo={canRedo}
              historyLength={historyStack.entries.length}
              currentIndex={historyStack.currentIndex}
              onUndo={handleUndo}
              onRedo={handleRedo}
            />

            <div className="v29-main-layout">
              <CardBoard
                board={board}
                onUpdateCard={updateCard}
                onChangeColour={changeCardColour}
                onDeleteCard={deleteCard}
                onAddCard={addCard}
              />
              <HistoryPanel historyStack={historyStack} onJumpTo={handleJumpTo} />
            </div>

            <ExplanationTriggerButton versionId="v29" />
          </main>
        </div>
      </div>

      <CustomScrollbar
        scrollContainerRef={scrollRef}
        variant="page"
        className="v29-custom-scrollbar"
        thumbColor="#6c8ef5"
        thumbHoverColor="#6c8ef5"
        trackColorLight="rgba(108, 142, 245, 0.12)"
        trackColorDark="rgba(108, 142, 245, 0.12)"
      />
    </>
  );
}
