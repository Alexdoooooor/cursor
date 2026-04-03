"use client";

import { useState } from "react";
import { FileAudio2, ImageIcon, Lock, Paperclip, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AssetRecord, Project } from "@/types/domain";

const iconMap = {
  image: ImageIcon,
  video: Video,
  audio: FileAudio2,
  reference: Paperclip,
} satisfies Record<AssetRecord["type"], typeof ImageIcon>;

type AssetsPanelProps = {
  project: Project;
};

export function AssetsPanel({ project }: AssetsPanelProps) {
  const [assets, setAssets] = useState(project.assets);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function saveAssets() {
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/projects/${project.slug}/assets`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assets }),
      });

      if (!response.ok) {
        throw new Error("Не удалось сохранить ассеты.");
      }

      setMessage("Список ассетов сохранён.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось сохранить ассеты.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div>
          <p className="text-sm font-medium text-white">Asset manager</p>
          <p className="text-sm text-slate-400">
            MVP уже умеет сохранять текущий набор ассетов в проект.
          </p>
        </div>
        <Button onClick={saveAssets} disabled={isSaving}>
          {isSaving ? "Сохраняем…" : "Сохранить ассеты"}
        </Button>
      </div>

      {message ? (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
          {message}
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {assets.map((asset) => {
        const AssetIcon = iconMap[asset.type];

        return (
          <Card key={asset.id} className="border-white/10 bg-[#111827]">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg text-white">{asset.name}</CardTitle>
                <CardDescription className="text-slate-400">
                  {asset.type} · используется в {asset.usedIn.join(", ")}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {asset.canonical ? (
                  <Badge tone="success" className="gap-1 normal-case tracking-normal">
                    <Lock className="h-3.5 w-3.5" />
                    Канон
                  </Badge>
                ) : null}
                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200">
                  <AssetIcon className="h-4 w-4" />
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-4 py-6 text-center text-slate-500">
                Превью-заглушка: {asset.name}
              </div>
              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={asset.canonical}
                  onChange={(event) => {
                    setAssets((current) =>
                      current.map((item) =>
                        item.id === asset.id
                          ? { ...item, canonical: event.target.checked }
                          : item,
                      ),
                    );
                  }}
                />
                Канонический ассет
              </label>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <Badge key={tag} tone="secondary" className="normal-case tracking-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Контрольная сумма: {asset.checksum}
              </p>
            </CardContent>
          </Card>
        );
        })}
      </div>
    </div>
  );
}
