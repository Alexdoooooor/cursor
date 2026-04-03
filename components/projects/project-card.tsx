import Link from "next/link";
import { ArrowRight, Clapperboard, Layers3, Sparkles } from "lucide-react";

import type { Project } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const statusMap: Record<Project["status"], string> = {
  draft: "Черновик",
  preproduction: "Препродакшн",
  generation: "Генерация",
  review: "Ревью",
  post: "Постпродакшн",
  final: "Финал",
};

export function ProjectCard({ project }: { project: Project }) {
  const scenesCount = project.scenes.length;
  const shotsCount = project.shots.length;
  const takesCount = project.takes.length;
  const canonicalCharacters = project.characters.length;
  const assetsCount = project.assets.length;

  return (
    <Card className="flex h-full flex-col border-white/10 bg-white/5">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="text-xl text-white">{project.title}</CardTitle>
            <CardDescription className="text-sm text-slate-400">
              {project.synopsis}
            </CardDescription>
          </div>
          <Badge tone="secondary">{statusMap[project.status]}</Badge>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          <Badge tone="outline">{project.format}</Badge>
          <Badge tone="outline">{project.aspectRatio}</Badge>
          <Badge tone="outline">{project.genre}</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              <Clapperboard className="size-4" />
              Сцены
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{scenesCount}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              <Layers3 className="size-4" />
              Шоты
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{shotsCount}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              <Sparkles className="size-4" />
              Тейки
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{takesCount}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <span>Канонические герои</span>
            <span className="font-medium text-white">{canonicalCharacters}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Ассеты</span>
            <span className="font-medium text-white">{assetsCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Средний continuity score</span>
            <span className="font-medium text-emerald-300">{project.continuityScore}%</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-white/10 pt-5">
        <Link href={`/projects/${project.slug}`} className="w-full">
          <Button className="w-full justify-between">
            Открыть control room
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
