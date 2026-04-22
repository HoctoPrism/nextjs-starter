"use client";

import { CheckIcon, PaletteIcon } from "lucide-react";

import { usePalette } from "@/components/palette-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { palettes, type PaletteId } from "@/config/palettes";

export function ThemePicker() {
  const { palette, setPalette, setPreviewPalette } = usePalette();

  function handleOpenChange(open: boolean) {
    if (!open) setPreviewPalette(null);
  }

  function handlePreview(id: PaletteId) {
    setPreviewPalette(id);
  }

  function handleSelect(id: PaletteId) {
    setPalette(id);
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Changer la palette">
          <PaletteIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Palette</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {palettes.map((p) => {
          const active = p.id === palette;
          return (
            <DropdownMenuItem
              key={p.id}
              onFocus={() => handlePreview(p.id)}
              onPointerEnter={() => handlePreview(p.id)}
              onSelect={(e) => {
                e.preventDefault();
                handleSelect(p.id);
              }}
              className="flex items-center gap-2"
            >
              <span
                aria-hidden
                className="flex size-5 shrink-0 overflow-hidden rounded-full border"
              >
                <span
                  className="size-full"
                  style={{ backgroundColor: p.swatches.light }}
                />
                <span
                  className="size-full"
                  style={{ backgroundColor: p.swatches.dark }}
                />
              </span>
              <span className="flex-1">{p.label}</span>
              {active ? (
                <CheckIcon className="size-4 text-muted-foreground" />
              ) : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
