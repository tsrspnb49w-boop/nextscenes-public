import type { MysteryPuzzle } from "@/data/mystery250/types";

export function getActivePuzzles(puzzles: MysteryPuzzle[]): MysteryPuzzle[] {
  return puzzles.filter((puzzle) => puzzle.active !== false);
}