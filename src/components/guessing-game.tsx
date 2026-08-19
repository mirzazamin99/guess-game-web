"use client";

import { useState } from "react";
import { NameScreen } from "@/components/name-screen";
import { PlayScreen } from "@/components/play-screen";
import { ResultScreen } from "@/components/result-screen";
import { DIFFICULTIES, randomInRange, type Difficulty } from "@/lib/game";

type Stage =
  | { screen: "name" }
  | { screen: "playing"; name: string; difficulty: Difficulty; target: number }
  | {
      screen: "won";
      name: string;
      difficulty: Difficulty;
      target: number;
      attempts: number;
    };

export function GuessingGame() {
  const [stage, setStage] = useState<Stage>({ screen: "name" });

  function startGame(name: string, difficulty: Difficulty) {
    const { min, max } = DIFFICULTIES[difficulty];
    setStage({
      screen: "playing",
      name,
      difficulty,
      target: randomInRange(min, max),
    });
  }

  function handleWin(attempts: number) {
    if (stage.screen !== "playing") return;
    setStage({ ...stage, screen: "won", attempts });
  }

  function playAgain() {
    if (stage.screen !== "won") return;
    startGame(stage.name, stage.difficulty);
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      {stage.screen === "name" && <NameScreen onStart={startGame} />}

      {stage.screen === "playing" && (
        <PlayScreen
          key={stage.target}
          name={stage.name}
          target={stage.target}
          min={DIFFICULTIES[stage.difficulty].min}
          max={DIFFICULTIES[stage.difficulty].max}
          onWin={handleWin}
        />
      )}

      {stage.screen === "won" && (
        <ResultScreen
          name={stage.name}
          attempts={stage.attempts}
          min={DIFFICULTIES[stage.difficulty].min}
          max={DIFFICULTIES[stage.difficulty].max}
          onPlayAgain={playAgain}
          onChangeName={() => setStage({ screen: "name" })}
        />
      )}
    </div>
  );
}
