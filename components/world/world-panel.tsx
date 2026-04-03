import { LampDesk, MapPinned, SunDim, Trees } from "lucide-react";

import type { Project } from "@/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type WorldPanelProps = {
  project: Project;
};

export function WorldPanel({ project }: WorldPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">Мир и локации</CardTitle>
          <CardDescription>
            Карта пространства, безопасные для камеры зоны и continuity-правила окружения.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {project.locations.map((location) => (
            <article
              key={location.id}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_16px_60px_rgba(8,15,30,0.32)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{location.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{location.description}</p>
                </div>
                <Badge tone="outline">{location.timeOfDay}</Badge>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <LampDesk className="size-4 text-cyan-300" />
                  Световая схема: {location.lightingSetup}
                </div>
                <div className="flex items-center gap-2">
                  <Trees className="size-4 text-emerald-300" />
                  Погодный режим: {location.weather}
                </div>
                <div className="flex items-center gap-2">
                  <SunDim className="size-4 text-amber-300" />
                  Сезон: {location.season}
                </div>
              </div>
              <div className="mt-4">
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-500">Continuity notes</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  {location.continuityNotes.map((note) => (
                    <li key={note} className="flex gap-2">
                      <MapPinned className="mt-0.5 size-4 shrink-0 text-fuchsia-300" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
