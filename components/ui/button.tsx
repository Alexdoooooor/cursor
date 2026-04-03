"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "icon" | "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan-400 text-slate-950 shadow-[0_18px_55px_-20px_rgba(34,211,238,0.85)] hover:bg-cyan-300",
  secondary:
    "border border-white/10 bg-white/5 text-white hover:border-cyan-400/50 hover:bg-cyan-400/10",
  ghost: "bg-transparent text-slate-300 hover:bg-white/5 hover:text-white",
  danger:
    "border border-red-400/40 bg-red-500/10 text-red-200 hover:bg-red-500/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  icon: "h-11 w-11 p-0",
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-sm",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
