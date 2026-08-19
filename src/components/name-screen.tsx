"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DIFFICULTIES, type Difficulty } from "@/lib/game";

export function NameScreen({
  onStart,
}: {
  onStart: (name: string, difficulty: Difficulty) => void;
}) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onStart(trimmed, difficulty);
  }

  return (
    <div className="w-full max-w-sm animate-fade-in-up">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft ring-1 ring-accent/20">
          <span className="font-mono text-lg font-semibold text-accent">?</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Number Guess
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Pick a difficulty and see how few guesses you need.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="player-name"
              className="text-xs font-medium uppercase tracking-wide text-muted"
            >
              Your name
            </label>
            <input
              id="player-name"
              type="text"
              autoFocus
              autoComplete="off"
              maxLength={24}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-white/10 bg-background-elevated px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              Difficulty
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(DIFFICULTIES) as Difficulty[]).map((key) => {
                const d = DIFFICULTIES[key];
                const active = difficulty === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setDifficulty(key)}
                    className={`flex flex-col items-center gap-0.5 rounded-lg border px-2 py-2.5 text-sm transition-colors ${
                      active
                        ? "border-accent/40 bg-accent-soft text-foreground"
                        : "border-white/10 bg-background-elevated text-muted hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    <span className="font-medium">{d.label}</span>
                    <span className="text-[11px] text-muted">{d.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="mt-1 w-full rounded-lg bg-accent-strong px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            Start playing
          </button>
        </form>
      </Card>
    </div>
  );
}
