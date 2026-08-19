"use client";

import { Card } from "@/components/ui/card";
import { rateAttempts } from "@/lib/game";

export function ResultScreen({
  name,
  attempts,
  min,
  max,
  onPlayAgain,
  onChangeName,
}: {
  name: string;
  attempts: number;
  min: number;
  max: number;
  onPlayAgain: () => void;
  onChangeName: () => void;
}) {
  const rating = rateAttempts(attempts, min, max);

  return (
    <div className="w-full max-w-sm animate-fade-in-up">
      <Card className="flex flex-col items-center p-8 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft ring-1 ring-accent/25 animate-pop">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <p className="text-sm text-muted">Nicely done, {name}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          {rating.label}
        </h2>
        <p className="mt-1.5 text-sm text-muted">{rating.description}</p>

        <div className="mt-6 flex w-full items-stretch gap-3">
          <div className="flex-1 rounded-lg bg-background-elevated py-3">
            <p className="font-mono text-xl font-semibold text-foreground">
              {attempts}
            </p>
            <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted">
              {attempts === 1 ? "Guess" : "Guesses"}
            </p>
          </div>
          <div className="flex-1 rounded-lg bg-background-elevated py-3">
            <p className="font-mono text-xl font-semibold text-foreground">
              {min}–{max}
            </p>
            <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted">
              Range
            </p>
          </div>
        </div>

        <div className="mt-6 flex w-full flex-col gap-2">
          <button
            onClick={onPlayAgain}
            className="w-full rounded-lg bg-accent-strong px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent"
          >
            Play again
          </button>
          <button
            onClick={onChangeName}
            className="w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-white/20 hover:text-foreground"
          >
            Change name
          </button>
        </div>
      </Card>
    </div>
  );
}
