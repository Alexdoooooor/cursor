"use client";

import { WandSparkles } from "lucide-react";

import type { Project } from "@/types/domain";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function StoryboardPanel({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-white/45">
            Storyboard и shot planning
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Сцены и шоты
          </h2>
        </div>
        <Badge tone="outline" className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
          {project.shots.length} шотов
        </Badge>
      </div>

      <div className="space-y-4">
        {project.scenes.map((scene) => {
          const sceneShots = project.shots.filter((shot) => shot.sceneId === scene.id);

          return (
            <Card key={scene.id} className="border-white/10 bg-white/5">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle>{scene.title}</CardTitle>
                    <CardDescription>
                      {scene.goal}. Тон: {scene.emotionalTone.toLowerCase()}
                    </CardDescription>
                  </div>
                  <Badge tone="secondary">{sceneShots.length} шота</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {sceneShots.map((shot) => (
                  <article
                    key={shot.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                          {shot.slug}
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-white">
                          {shot.title}
                        </h3>
                      </div>
                      <Badge tone={shot.status === "утверждён" ? "success" : "secondary"}>
                        {shot.status}
                      </Badge>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-slate-300">
                      <p>
                        <span className="font-medium text-white">Камера:</span>{" "}
                        {shot.framing}
                      </p>
                      <p>
                        <span className="font-medium text-white">Свет:</span>{" "}
                        {shot.lighting}
                      </p>
                      <p>
                        <span className="font-medium text-white">Действие:</span>{" "}
                        {shot.action}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {shot.promptBlocks.map((block) => (
                          <Badge key={block.id} tone="outline">
                            {block.title}
                          </Badge>
                        ))}
                      </div>
                      <div className="rounded-2xl border border-dashed border-cyan-400/25 bg-cyan-400/5 p-3 text-xs leading-5 text-cyan-100">
                        <span className="inline-flex items-center gap-2 font-medium">
                          <WandSparkles className="h-4 w-4" />
                          Prompt pack
                        </span>
                        <p className="mt-2 whitespace-pre-line text-slate-300">
                          {shot.promptBlocks.map((block) => `${block.title}: ${block.value}`).join("\n")}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
