export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTIES: Record<
  Difficulty,
  { label: string; min: number; max: number; description: string }
> = {
  easy: { label: "Easy", min: 1, max: 50, description: "1 – 50" },
  medium: { label: "Medium", min: 1, max: 100, description: "1 – 100" },
  hard: { label: "Hard", min: 1, max: 500, description: "1 – 500" },
};

export const MAX_WRONG_GUESSES = 5;

export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function optimalGuessCount(min: number, max: number): number {
  return Math.ceil(Math.log2(max - min + 1));
}

export function rateAttempts(
  attempts: number,
  min: number,
  max: number
): { label: string; description: string } {
  const optimal = optimalGuessCount(min, max);
  if (attempts <= optimal) {
    return { label: "Flawless", description: "Right at the theoretical optimum." };
  }
  if (attempts <= optimal + 2) {
    return { label: "Sharp", description: "Well above average precision." };
  }
  if (attempts <= optimal + 5) {
    return { label: "Solid", description: "A clean, steady approach." };
  }
  return { label: "Persistent", description: "You got there in the end." };
}
