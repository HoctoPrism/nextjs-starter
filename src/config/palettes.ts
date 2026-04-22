export type PaletteId = "default" | "ocean" | "sunset";

export type Palette = {
  id: PaletteId;
  label: string;
  swatches: { light: string; dark: string };
};

export const palettes: Palette[] = [
  {
    id: "default",
    label: "Défaut",
    swatches: { light: "oklch(0.205 0 0)", dark: "oklch(0.922 0 0)" },
  },
  {
    id: "ocean",
    label: "Océan",
    swatches: { light: "oklch(0.55 0.15 235)", dark: "oklch(0.72 0.13 230)" },
  },
  {
    id: "sunset",
    label: "Coucher de soleil",
    swatches: { light: "oklch(0.62 0.18 35)", dark: "oklch(0.74 0.16 40)" },
  },
];

export const DEFAULT_PALETTE: PaletteId = "default";
export const PALETTE_STORAGE_KEY = "palette";

export function isPaletteId(value: unknown): value is PaletteId {
  return (
    value === "default" || value === "ocean" || value === "sunset"
  );
}
