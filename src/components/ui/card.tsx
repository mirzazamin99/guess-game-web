import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full rounded-2xl border border-white/[0.07] bg-surface/80 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] ${className}`}
    >
      {children}
    </div>
  );
}
