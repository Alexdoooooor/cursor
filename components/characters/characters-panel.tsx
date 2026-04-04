"use client";

import { Sparkles, UserRound, VenetianMask } from "lucide-react";
import { useState, useTransition } from "react";

import type { Project } from "@/types/domain";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CharactersPanelProps = {
  project: Project;
};

export function CharactersPanel({ project }: CharactersPanelProps) {
  const [characters, setCharacters] = useState(project.characters);
  const [statusMessage, setStatusMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSaveCharacters() {
    startTransition(async () => {
      setStatusMessage("");

      const response = await fetch(`/api/projects/${project.slug}/characters`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ characters }),
      });

      if (!response.ok) {
        setStatusMessage("Не удалось сохранить изменения персонажей.");
        return;
      }

      setStatusMessage("Изменения по персонажам сохранены.");
    });
  }

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
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-slate-400">
              Изменяйте локи персонажей и фиксируйте канонические параметры через backend.
            </p>
            <Button
              variant="secondary"
              onClick={handleSaveCharacters}
              disabled={isPending}
            >
              {isPending ? "Сохраняем…" : "Сохранить персонажей"}
            </Button>
          </div>

          {statusMessage ? (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
              {statusMessage}
            </div>
          ) : null}

          {characters.map((character) => (
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

              <textarea
                className="mt-3 min-h-[88px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-200 outline-none transition focus:border-cyan-400/50"
                value={character.visualIdentity}
                onChange={(event) =>
                  setCharacters((current) =>
                    current.map((item) =>
                      item.id === character.id
                        ? { ...item, visualIdentity: event.target.value }
                        : item,
                    ),
                  )
                }
              />

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
