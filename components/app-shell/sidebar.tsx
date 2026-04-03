"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  Film,
  FolderKanban,
  Gauge,
  Layers3,
  LibraryBig,
  Settings2,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

const links: Array<{ href: Route; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { href: "/projects", label: "Проекты", icon: FolderKanban },
  { href: "/projects/polunochnyy-ekspress", label: "Обзор проекта", icon: Clapperboard },
  { href: "/projects/polunochnyy-ekspress/story", label: "Story Bible", icon: LibraryBig },
  { href: "/projects/polunochnyy-ekspress/storyboard", label: "Storyboard", icon: Layers3 },
  { href: "/projects/polunochnyy-ekspress/generation", label: "Генерация", icon: WandSparkles },
  { href: "/projects/polunochnyy-ekspress/timeline", label: "Таймлайн", icon: Film },
  { href: "/projects/polunochnyy-ekspress/usage", label: "Использование", icon: Gauge },
  { href: "/projects/polunochnyy-ekspress/exports", label: "Экспорт", icon: Sparkles },
  { href: "/settings/providers", label: "Провайдеры", icon: Settings2 },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-black/20 px-5 py-6 xl:block">
      <div className="mb-8">
        <div className="mb-2 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
          CineCraft
        </div>
        <h1 className="text-xl font-semibold text-white">Control Room</h1>
        <p className="mt-2 text-sm text-slate-400">
          Продакшн-среда для управляемой нейрогенерации фильмов, сериалов и роликов.
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-white text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.12)]"
                  : "text-slate-300 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Статус платформы</p>
        <p className="mt-3 text-sm text-slate-300">
          MVP ориентирован на Vercel + MongoDB и готов к подключению real provider adapters.
        </p>
      </div>
    </aside>
  );
}
