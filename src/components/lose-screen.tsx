"use client";

import { Card } from "@/components/ui/card";

export function LoseScreen({
  name,
  target,
  onPlayAgain,
  onChangeName,
}: {
  name: string;
  target: number;
  onPlayAgain: () => void;
  onChangeName: () => void;
}) {
  return (
    <div className="w-full max-w-sm animate-fade-in-up">
      <Card className="flex flex-col items-center p-8 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/25 animate-pop">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-red-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </div>

        <p className="text-sm text-muted">Out of guesses, {name}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          Game over
        </h2>

        <div className="mt-6 w-full rounded-lg bg-background-elevated py-3">
          <p className="font-mono text-xl font-semibold text-foreground">
            {target}
          </p>
          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted">
            Was the number
          </p>
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
