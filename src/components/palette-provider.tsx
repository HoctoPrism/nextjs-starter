"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  DEFAULT_PALETTE,
  isPaletteId,
  PALETTE_STORAGE_KEY,
  type PaletteId,
} from "@/config/palettes";

type PaletteContextValue = {
  palette: PaletteId;
  setPalette: (next: PaletteId) => void;
  previewPalette: PaletteId | null;
  setPreviewPalette: (next: PaletteId | null) => void;
};

const PaletteContext = createContext<PaletteContextValue | null>(null);

function applyToDocument(id: PaletteId) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (id === "default") {
    root.removeAttribute("data-palette");
  } else {
    root.setAttribute("data-palette", id);
  }
}

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteId>(DEFAULT_PALETTE);
  const [previewPalette, setPreviewPaletteState] = useState<PaletteId | null>(
    null,
  );

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage on mount; matches inline anti-FOUC script
      if (isPaletteId(stored)) setPaletteState(stored);
    } catch {
      // localStorage unavailable — keep default
    }
  }, []);

  useEffect(() => {
    applyToDocument(previewPalette ?? palette);
  }, [palette, previewPalette]);

  const setPalette = useCallback((next: PaletteId) => {
    setPaletteState(next);
    setPreviewPaletteState(null);
    try {
      window.localStorage.setItem(PALETTE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const setPreviewPalette = useCallback((next: PaletteId | null) => {
    setPreviewPaletteState(next);
  }, []);

  return (
    <PaletteContext.Provider
      value={{ palette, setPalette, previewPalette, setPreviewPalette }}
    >
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) {
    throw new Error("usePalette must be used within <PaletteProvider>");
  }
  return ctx;
}
