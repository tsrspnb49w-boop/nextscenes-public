export type MysteryDifficulty = "easy" | "medium" | "hard" | "expert";

export type MysteryPuzzle = {
  id: string;
  slug: string;
  title: string;
  setup: string;
  question?: string;
  clues?: string[];
  options?: string[];
  answer: string;
  explanation: string;
  difficulty?: MysteryDifficulty;
  imageUrl?: string;
  imageAlt?: string;
  active?: boolean;
};
