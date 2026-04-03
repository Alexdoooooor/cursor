"use client";

import { useMemo, useState } from "react";

import type { Project } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type StoryBiblePanelProps = {
  project: Project;
};

export function StoryBiblePanel({ project }: StoryBiblePanelProps) {
  const [logline, setLogline] = useState(project.synopsis);
  const [synopsis, setSynopsis] = useState(project.synopsis);

  const totalDuration = useMemo(
    () => project.scenes.reduce((total, scene) => total + scene.plannedDurationSec, 0),
    [project.scenes],
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Story Bible</CardTitle>
          <CardDescription>
            Драматургический каркас проекта: логлайн, синопсис, задачи сцен и эмоциональные состояния.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="logline">Логлайн</Label>
            <Input id="logline" value={logline} onChange={(event) => setLogline(event.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="synopsis">Синопсис</Label>
            <Textarea
              id="synopsis"
              className="min-h-[180px]"
              value={synopsis}
              onChange={(event) => setSynopsis(event.target.value)}
            />
          </div>

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Сцены</h3>
              <Badge tone="outline">Всего: {project.scenes.length}</Badge>
            </div>

            <div className="grid gap-4">
              {project.scenes.map((scene, index) => (
                <div key={scene.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Сцена {index + 1}</p>
                      <h4 className="mt-2 text-lg font-semibold text-white">{scene.title}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge tone="secondary">{scene.location}</Badge>
                      <Badge tone="secondary">{scene.emotionalTone}</Badge>
                      <Badge tone="outline">{scene.plannedDurationSec} сек</Badge>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-white/65">{scene.goal}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Контекст проекта</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">Жанр</p>
              <p className="mt-2 text-base text-white">{project.genre}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">Статус</p>
              <p className="mt-2">{project.statusLabel}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">Плановая длительность сцен</p>
              <p className="mt-2 text-base text-white">{totalDuration} сек</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Фокус story engine</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Каждая сцена связана с локацией, длительностью и набором shot ids, чтобы storyboard и continuity engine
              работали от общих доменных сущностей.
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              На следующем этапе здесь появятся beat sheet, акты, конфликтные линии и narrative dependencies.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
