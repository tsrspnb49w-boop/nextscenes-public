export type MysteryDifficulty = "easy" | "medium" | "hard";

export type MysteryPuzzle = {
  id: string;
  slug: string;
  title: string;
  setup: string;
  clues?: string[];
  options?: string[];
  answer: string;
  explanation: string;
  difficulty?: MysteryDifficulty;
  active?: boolean;
};