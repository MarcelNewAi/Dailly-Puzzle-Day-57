"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCommandPalette } from "./CommandPaletteProvider";

export interface Command {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  icon: string;
  shortcut?: string;
  action: () => void;
  category: string;
}

export type CommandActionHandlers = {
  resetLayout: () => void;
  moveSectionUp: () => void;
  moveSectionDown: () => void;
  shuffleSections: () => void;
  reverseSections: () => void;
  scrollPreviewTop: () => void;
  scrollPreviewBottom: () => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  exportLayout: () => Promise<boolean>;
  clearSavedData: () => void;
};

export function useCommands(actions: CommandActionHandlers): Command[] {
  const router = useRouter();
  const { showToast } = useCommandPalette();

  const {
    clearSavedData,
    exportLayout,
    moveSectionDown,
    moveSectionUp,
    resetLayout,
    reverseSections,
    scrollPreviewBottom,
    scrollPreviewTop,
    shuffleSections,
    toggleSidebar,
    toggleTheme,
  } = actions;

  return useMemo(
    () => [
      {
        id: "reset-layout",
        name: "Reset to Default Order",
        description: "Restore all sections to their original positions",
        keywords: ["reset", "default", "restore", "undo", "original"],
        icon: "reset",
        shortcut: "R",
        category: "Builder",
        action: () => {
          resetLayout();
          showToast("Layout reset to default");
        },
      },
      {
        id: "move-up",
        name: "Move Selected Section Up",
        description: "Move the first section one position up",
        keywords: ["move", "up", "reorder", "shift"],
        icon: "up",
        category: "Builder",
        action: moveSectionUp,
      },
      {
        id: "move-down",
        name: "Move Selected Section Down",
        description: "Move the first section one position down",
        keywords: ["move", "down", "reorder", "shift"],
        icon: "down",
        category: "Builder",
        action: moveSectionDown,
      },
      {
        id: "shuffle",
        name: "Shuffle All Sections",
        description: "Randomly reorder all sections",
        keywords: ["shuffle", "random", "randomize", "mix"],
        icon: "shuffle",
        category: "Builder",
        action: () => {
          shuffleSections();
          showToast("Sections shuffled");
        },
      },
      {
        id: "reverse",
        name: "Reverse Section Order",
        description: "Flip the entire section order upside down",
        keywords: ["reverse", "flip", "invert", "backwards"],
        icon: "reverse",
        category: "Builder",
        action: reverseSections,
      },
      {
        id: "scroll-top",
        name: "Scroll Preview to Top",
        description: "Jump to the top of the live preview",
        keywords: ["scroll", "top", "beginning", "start"],
        icon: "scroll-top",
        category: "Navigation",
        action: scrollPreviewTop,
      },
      {
        id: "scroll-bottom",
        name: "Scroll Preview to Bottom",
        description: "Jump to the bottom of the live preview",
        keywords: ["scroll", "bottom", "end", "footer"],
        icon: "scroll-bottom",
        category: "Navigation",
        action: scrollPreviewBottom,
      },
      {
        id: "go-home",
        name: "Go to Home Page",
        description: "Navigate to the main landing page",
        keywords: ["home", "landing", "main", "index"],
        icon: "home",
        category: "Navigation",
        action: () => {
          router.push("/");
        },
      },
      {
        id: "go-v6",
        name: "Go to V6 Gallery",
        description: "Navigate to the masonry image gallery",
        keywords: ["gallery", "v6", "images", "masonry"],
        icon: "gallery",
        category: "Navigation",
        action: () => {
          router.push("/v6");
        },
      },
      {
        id: "toggle-sidebar",
        name: "Toggle Section List",
        description: "Show or hide the left sidebar panel",
        keywords: ["sidebar", "panel", "toggle", "hide", "show", "collapse"],
        icon: "sidebar",
        category: "View",
        action: toggleSidebar,
      },
      {
        id: "toggle-theme",
        name: "Toggle Theme",
        description: "Switch between dark and light mode for the builder",
        keywords: ["theme", "dark", "light", "mode", "switch", "color"],
        icon: "theme",
        category: "View",
        action: toggleTheme,
      },
      {
        id: "export-layout",
        name: "Export Layout as JSON",
        description: "Copy the current section order to clipboard",
        keywords: ["export", "copy", "json", "clipboard", "save"],
        icon: "export",
        category: "Data",
        action: () => {
          void exportLayout().then((didCopy) => {
            showToast(didCopy ? "Copied to clipboard" : "Clipboard unavailable");
          });
        },
      },
      {
        id: "clear-data",
        name: "Clear Saved Layout",
        description: "Remove saved layout from localStorage and reset",
        keywords: ["clear", "delete", "remove", "localStorage", "storage"],
        icon: "clear",
        category: "Data",
        action: () => {
          clearSavedData();
          showToast("Saved data cleared");
        },
      },
    ],
    [
      clearSavedData,
      exportLayout,
      moveSectionDown,
      moveSectionUp,
      resetLayout,
      reverseSections,
      router,
      scrollPreviewBottom,
      scrollPreviewTop,
      showToast,
      shuffleSections,
      toggleSidebar,
      toggleTheme,
    ],
  );
}
