"use client";

import { Lightbulb, Palette, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types/domain";

type StylePanelProps = {
  project: Project;
};

export function StylePanel({ project }: StylePanelProps) {
  const preset = project.styleBible;

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">Style bible</CardTitle>
          <CardDescription className="text-slate-400">
            Зафиксированные правила визуального языка для controlled generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
              <Palette className="h-4 w-4 text-cyan-300" />
              Визуальный стиль
            </div>
            <p className="text-sm text-slate-300">{preset.visualStyle}</p>
            <p className="mt-2 text-xs text-slate-500">{preset.colorScript}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
              <Lightbulb className="h-4 w-4 text-amber-300" />
              Свет и камера
            </div>
            <p className="text-sm text-slate-300">{preset.lightingModel}</p>
            <p className="mt-2 text-xs text-slate-500">
              Camera language: {preset.lensLanguage}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
              <Sparkles className="h-4 w-4 text-fuchsia-300" />
              Ограничения
            </div>
            <div className="flex flex-wrap gap-2">
              {preset.forbiddenArtifacts.map((restriction) => (
                <Badge key={restriction} tone="secondary">
                  {restriction}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
