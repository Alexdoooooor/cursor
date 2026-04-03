"use client";

import { Download, FileArchive, FileJson, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types/domain";

type ExportsPanelProps = {
  project: Project;
};

const exportItems = [
  {
    title: "Project package",
    icon: FileArchive,
    description:
      "Структура сцен, героев, шотов, approved takes, refs и export-профилей.",
  },
  {
    title: "JSON manifest",
    icon: FileJson,
    description:
      "Контракты для последующего импорта в render / NLE pipeline.",
  },
  {
    title: "Continuity report",
    icon: ShieldCheck,
    description:
      "Сводка lock-правил, уровня риска и расхождений между takes и character bible.",
  },
];

export function ExportsPanel({ project }: ExportsPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-xl text-white">Центр экспорта</CardTitle>
            <p className="mt-2 max-w-3xl text-sm text-slate-400">
              Подготовьте пакет проекта для дальнейшего монтажа, проверки continuity и передачи в постпродакшн.
            </p>
          </div>
          <Badge tone="success" className="border-emerald-400/40 text-emerald-200">
            Готово к выдаче
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-3">
          {exportItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"
            >
              <div className="flex items-center gap-3 text-white">
                <item.icon className="h-5 w-5 text-cyan-300" />
                <h3 className="font-medium">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
              <Button className="mt-4 w-full gap-2">
                <Download className="h-4 w-4" />
                Сформировать
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-lg text-white">Профиль проекта</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Metric label="Проект" value={project.title} />
          <Metric label="Формат" value={project.format} />
          <Metric label="Aspect ratio" value={project.aspectRatio} />
          <Metric
            label="Approved takes"
            value={`${project.shots.filter((shot) => shot.status === "утверждён").length}`}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</div>
      <div className="mt-3 text-sm font-medium text-white">{value}</div>
    </div>
  );
}
