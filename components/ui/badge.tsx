"use client";

import * as React from "react";

import { cn } from "@/lib/utils/cn";

type BadgeTone =
  | "default"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "outline";

const toneMap: Record<BadgeTone, string> = {
  default:
    "border-transparent bg-cyan-500/15 text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
  secondary: "border-white/10 bg-white/5 text-zinc-200",
  success: "border-emerald-500/20 bg-emerald-500/15 text-emerald-200",
  warning: "border-amber-500/20 bg-amber-500/15 text-amber-100",
  danger: "border-rose-500/20 bg-rose-500/15 text-rose-200",
  outline: "border-white/10 bg-transparent text-zinc-300",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: BadgeTone;
  variant?: BadgeTone;
}

export function Badge({
  className,
  tone = "default",
  variant,
  ...props
}: BadgeProps) {
  const resolvedTone = variant ?? tone;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
        toneMap[resolvedTone],
        className,
      )}
      {...props}
    />
  );
}
