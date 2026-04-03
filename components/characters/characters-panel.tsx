"use client";

import { Sparkles, UserRound, VenetianMask } from "lucide-react";

import type { Project } from "@/types/domain";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CharactersPanelProps = {
  project: Project;
};

export function CharactersPanel({ project }: CharactersPanelProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Библия героев</CardTitle>
          <CardDescription>
            Канонические персонажи, их identity lock, костюмы, палитра и разрешённые вариации.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.characters.map((character) => (
            <div
              key={character.id}
              className="rounded-2xl border border-white/10 bg-[#090F1D] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-cyan-300" />
                    <h3 className="text-lg font-semibold text-white">{character.name}</h3>
                  </div>
                  <p className="text-sm text-slate-300">{character.role}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="outline">{character.tags[0] ?? "герой"}</Badge>
                  <Badge tone="secondary">{character.voiceProfile}</Badge>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-300">{character.visualIdentity}</p>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-[#10172A] p-3">
                  <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Костюмы
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-200">
                    {character.costumeSets.map((costume) => (
                      <li key={costume}>• {costume}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#10172A] p-3">
                  <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Motion traits
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-200">
                    {character.motionTraits.map((trait) => (
                      <li key={trait}>• {trait}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#10172A] p-3">
                  <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Метрики консистентности
                  </div>
                  <p className="mt-2 text-sm text-slate-200">
                    {character.continuityLocks.length} lock-правил · {character.tags.length} tag-профилей
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
                  <Sparkles className="h-4 w-4" />
                  Continuity locks
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {character.continuityLocks.map((lock) => (
                    <Badge key={lock} tone="success">
                      {lock}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>Контроль вариативности</CardTitle>
          <CardDescription>
            Что фиксируем жёстко, а что оставляем для controlled exploration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-300">
          <div className="rounded-2xl border border-white/10 bg-[#0A1120] p-4">
            <div className="flex items-center gap-2 font-semibold text-white">
              <VenetianMask className="h-4 w-4 text-fuchsia-300" />
              Identity lock
            </div>
            <p className="mt-2">
              Фиксируем форму лица, силуэт, ключевые черты и palette lock, чтобы герой не
              “плыл” между сценами.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0A1120] p-4">
            <div className="text-sm font-semibold text-white">Voice & dialogue profile</div>
            <p className="mt-2">
              Для каждого героя хранится тембр, эмоциональный диапазон и словарь, чтобы в
              audio/lip-sync pipeline была согласованность не только кадра, но и речи.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0A1120] p-4">
            <div className="text-sm font-semibold text-white">Camera-safe angles</div>
            <p className="mt-2">
              Shot planner будет предупреждать, если выбран ракурс, в котором персонаж
              исторически чаще всего ломается.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
