"use client";

import { Bell, ChevronDown, Search, Sparkles } from "lucide-react";
import type { Route } from "next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProjectRecord } from "@/types/domain";

type AppHeaderProps = {
  currentProject: ProjectRecord | null;
};

export function AppHeader({ currentProject }: AppHeaderProps) {
  const title = currentProject?.title ?? "CineCraft Control Room";
  const subtitle =
    currentProject?.logline ?? "Русскоязычный production shell для управляемой нейрогенерации.";

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/85 backdrop-blur">
      <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-300/70">
            <Sparkles className="h-3.5 w-3.5" />
            Контролируемое AI-видеопроизводство
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            {subtitle ? (
              <p className="text-sm text-slate-400">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-[280px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              className="pl-9"
              placeholder="Поиск по проектам, сценам, героям и ассетам"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="secondary" className="justify-between gap-3">
            Русский интерфейс
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" href={"/logout" as Route}>
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
}
