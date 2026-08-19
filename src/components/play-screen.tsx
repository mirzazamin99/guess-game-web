"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

type Guess = {
  value: number;
  result: "high" | "low";
};

export function PlayScreen({
  name,
  target,
  min,
  max,
  onWin,
}: {
  name: string;
  target: number;
  min: number;
  max: number;
  onWin: (attempts: number) => void;
}) {
  const [current, setCurrent] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [bounds, setBounds] = useState({ low: min, high: max });
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(current);

    if (current.trim() === "" || Number.isNaN(value)) {
      setError("Enter a number");
      triggerShake();
      return;
    }
    if (value < min || value > max) {
      setError(`Must be between ${min} and ${max}`);
      triggerShake();
      return;
    }
    if (guesses.some((g) => g.value === value)) {
      setError("Already tried that one");
      triggerShake();
      return;
    }

    setError("");

    if (value === target) {
      onWin(guesses.length + 1);
      return;
    }

    const result: Guess["result"] = value < target ? "low" : "high";
    setGuesses((prev) => [{ value, result }, ...prev]);
    setBounds((prev) => ({
      low: result === "low" ? Math.max(prev.low, value + 1) : prev.low,
      high: result === "high" ? Math.min(prev.high, value - 1) : prev.high,
    }));
    setCurrent("");
    triggerShake();
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }

  const latest = guesses[0];

  return (
    <div className="w-full max-w-sm animate-fade-in-up">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">Playing as</p>
          <p className="text-sm font-medium text-foreground">{name}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-muted">Attempts</p>
          <p className="font-mono text-sm font-medium text-accent">
            {guesses.length}
          </p>
        </div>
      </div>

      <Card className={`p-6 ${shake ? "animate-shake" : ""}`}>
        <div className="mb-5 flex items-center justify-between rounded-lg bg-background-elevated px-4 py-3">
          <span className="text-xs text-muted">Current range</span>
          <span className="font-mono text-sm font-medium text-foreground">
            {bounds.low} – {bounds.high}
          </span>
        </div>

        {latest && (
          <div className="mb-5 flex items-center justify-center gap-2 text-sm">
            <span className="text-muted">
              {latest.value} was too {latest.result === "high" ? "high" : "low"} — try{" "}
              {latest.result === "high" ? "lower" : "higher"}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            inputMode="numeric"
            autoFocus
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder={`${min} – ${max}`}
            className="w-full rounded-lg border border-white/10 bg-background-elevated px-3.5 py-3 text-center font-mono text-lg text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          />
          {error && (
            <p className="text-center text-xs text-red-400">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-accent-strong px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent"
          >
            Guess
          </button>
        </form>

        {guesses.length > 0 && (
          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <p className="mb-2 text-xs uppercase tracking-wide text-muted">
              History
            </p>
            <div className="flex flex-wrap gap-1.5">
              {guesses.map((g, i) => (
                <span
                  key={i}
                  className={`animate-pop rounded-md px-2 py-1 font-mono text-xs ${
                    g.result === "high"
                      ? "bg-orange-500/10 text-orange-300"
                      : "bg-sky-500/10 text-sky-300"
                  }`}
                  title={g.result === "high" ? "Too high" : "Too low"}
                >
                  {g.value}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
