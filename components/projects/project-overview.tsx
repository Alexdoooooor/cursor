"use client";

import { Film, Layers3, Sparkles, WandSparkles } from "lucide-react";

import type { Project } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featureHighlights = [
  {
    title: "Контроль непрерывности",
    description: "Фиксируйте костюмы, props, свет, движение камеры и approved кадры как основу следующего шота.",
    icon: Layers3,
  },
  {
    title: "Управляемая генерация",
    description: "Структурируйте промт по блокам: субъект, действие, эмоция, окружение, свет, камера, стиль и negative.",
    icon: WandSparkles,
  },
  {
    title: "Пайплайн студийного уровня",
    description: "Собирайте rough cut, ставьте takes в очередь, подготавливайте lip-sync и экспортируйте пакет проекта.",
    icon: Film,
  },
];

type ProjectOverviewProps = {
  project: Project;
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const metrics = [
    {
      label: "Сцены",
      value: String(project.scenes.length),
      description: "Структурированные драматургические блоки в проекте.",
    },
    {
      label: "Шоты",
      value: String(project.shots.length),
      description: "Плановые кадры, доступные для генерации и ревью.",
    },
    {
      label: "Герои",
      value: String(project.characters.length),
      description: "Канонические персонажи с continuity lock-настройками.",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <CardHeader className="border-b border-white/5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <Badge tone="secondary" className="bg-cyan-500/10 text-cyan-200">
                {project.formatLabel}
              </Badge>
              <div>
                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <CardDescription className="mt-2 max-w-3xl text-base text-slate-300">
                  {project.logline}
                </CardDescription>
              </div>
            </div>

            <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 shadow-[0_16px_48px_rgba(8,15,34,0.35)]">
              <div className="flex items-center justify-between gap-6">
                <span>Статус</span>
                  <Badge tone="outline" className="border-cyan-400/30 text-cyan-100">
                  {project.statusLabel}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span>Хронометраж</span>
                <span>{project.targetDurationLabel}</span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span>Формат кадра</span>
                <span>{project.aspectRatio}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-6 pt-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.25)]"
                >
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{metric.label}</div>
                  <div className="mt-3 text-2xl font-semibold text-white">{metric.value}</div>
                  <div className="mt-2 text-sm text-slate-300">{metric.description}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                <Sparkles className="size-4 text-cyan-300" />
                Производственная гипотеза
              </div>
              <p className="text-sm leading-7 text-slate-300">
                MVP ориентирован на модель-агностичный пайплайн: шоты генерируются через adapter layer,
                continuity проверяется отдельно, а одобренные takes становятся базой для audio stage и rough
                timeline. Это позволяет быстро подключать реальных провайдеров без переписывания UX и доменных
                сущностей.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {featureHighlights.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_14px_40px_rgba(15,23,42,0.22)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-2 text-cyan-200">
                    <Icon className="size-4" />
                  </div>
                  <div className="text-sm font-semibold text-white">{title}</div>
                </div>
                <div className="text-sm leading-6 text-slate-300">{description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
