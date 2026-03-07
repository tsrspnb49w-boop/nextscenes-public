import type { MysteryPuzzle } from "@/data/mystery250/types";

export type MysterySelectMode = "daily" | "random";

export function selectPuzzle(
  puzzles: MysteryPuzzle[],
  mode: MysterySelectMode,
  seed?: number
): MysteryPuzzle | null {
  if (!Array.isArray(puzzles) || puzzles.length === 0) {
    return null;
  }

  if (mode === "daily") {
    const safeSeed = typeof seed === "number" ? seed : 0;
    const index = Math.abs(safeSeed) % puzzles.length;
    return puzzles[index];
  }

  const index = Math.floor(Math.random() * puzzles.length);
  return puzzles[index];
}

export function selectAnotherPuzzle(
  puzzles: MysteryPuzzle[],
  currentPuzzleId?: string
): MysteryPuzzle | null {
  if (!Array.isArray(puzzles) || puzzles.length === 0) {
    return null;
  }

  if (puzzles.length === 1) {
    return puzzles[0];
  }

  const candidates = currentPuzzleId
    ? puzzles.filter((puzzle) => puzzle.id !== currentPuzzleId)
    : puzzles;

  if (candidates.length === 0) {
    return puzzles[0];
  }

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index];
}
