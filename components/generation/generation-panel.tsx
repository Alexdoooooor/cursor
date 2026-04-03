"use client";

import { AlertTriangle, Clapperboard, RadioTower, WandSparkles } from "lucide-react";

import type { Project } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type GenerationPanelProps = {
  project: Project;
};

export function GenerationPanel({ project }: GenerationPanelProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <WandSparkles className="h-5 w-5 text-cyan-300" />
              Очередь генерации
            </CardTitle>
            <CardDescription>
              Все задачи проходят через адаптеры провайдеров и workflow-слой, совместимый с Vercel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.jobs.map((job) => (
              <div key={job.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{job.shotTitle}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {job.provider} · {job.model} · {job.createdAt}
                    </p>
                  </div>
                  <Badge tone={job.status === "failed" ? "danger" : job.status === "succeeded" ? "success" : "outline"}>
                    {job.status}
                  </Badge>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  <Metric label="Тип" value={job.type} />
                  <Metric label="Прогресс" value={`${job.progress}%`} />
                  <Metric label="Оценка стоимости" value={`$${job.costEstimateUsd.toFixed(2)}`} />
                  <Metric label="Тейков" value={String(job.outputTakeIds.length)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clapperboard className="h-5 w-5 text-fuchsia-300" />
                Сравнение тейков
              </CardTitle>
              <CardDescription>
                Выберите мастер-тейк и используйте его как основу для следующего шота.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.takes.map((take) => (
                <div key={take.id} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{take.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{take.notes}</p>
                    </div>
                    <Badge tone={take.status === "approved" ? "success" : "outline"}>{take.status}</Badge>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <Metric label="Continuity" value={`${take.continuityScore}/100`} />
                    <Metric label="Длительность" value={`${take.durationSec} сек`} />
                    <Metric label="Источник" value={take.lineage.join(" · ")} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-amber-300" />
                Диагностика continuity
              </CardTitle>
              <CardDescription>
                Контроль качества фиксирует риски drift и подсказывает, как усилить управление.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-amber-50/90">
              {project.continuityWarnings.map((warning) => (
                <div key={warning} className="rounded-2xl border border-amber-400/25 bg-slate-950/35 p-3">
                  <div className="font-medium text-white">{warning}</div>
                  <div className="mt-1 text-amber-50/80">
                    Усильте reference bundle, palette lock и consistency constraints перед следующим прогоном.
                  </div>
                </div>
              ))}
              <Button className="w-full">
                <RadioTower className="mr-2 h-4 w-4" />
                Запустить повторную проверку
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm text-slate-200">{value}</p>
    </div>
  );
}
