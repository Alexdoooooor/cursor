"use client";

import type { Project } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AudioPanelProps = {
  project: Project;
};

export function AudioPanel({ project }: AudioPanelProps) {
  const workflow = [
    "Текст диалогов",
    "Черновой TTS",
    "Lip-sync placeholder",
    "Музыкальный mood pass",
    "Экспорт rough audio package",
  ];

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">Аудиостудия</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-300">
          <p>
            Отдельный stage для реплик, TTS, амбиента, музыки и lip-sync. В MVP
            он показывает готовность проекта к озвучке и постобработке.
          </p>

          <div className="flex flex-wrap gap-2">
            {workflow.map((step) => (
              <Badge key={step} tone="secondary">
                {step}
              </Badge>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Голосовой профиль проекта
            </p>
            <p className="mt-3 text-sm text-white/80">
              Основной тон: низкий драматический тембр, паузы повышенной длины,
              деликатный room tone и раздельные stems для диалогов и атмосферы.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Утверждённых тейков для post-audio:{" "}
              {project.shots.filter((shot) => shot.approvedTakeId).length}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
