"use client";

import { Cpu, Mic2, Music4, Send, ShieldCheck, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const providers = [
  {
    name: "Кинематографичный видео-адаптер",
    model: "Mock VEO / Runway adapter",
    icon: Video,
    status: "Готов к подключению",
    capabilities: ["text-to-video", "image-to-video", "continuity refs", "audio-ready"],
    description:
      "Слой адаптеров для text-to-video, image-to-video, first/last frame control и генерации дублей.",
  },
  {
    name: "Синтез речи и ADR",
    model: "Mock TTS adapter",
    icon: Mic2,
    status: "Тестовый режим",
    capabilities: ["эмоциональные профили", "тайминг", "voice presets", "черновая озвучка"],
    description:
      "Голоса персонажей, эмоциональные профили, паузы, тайминг и очередь озвучки.",
  },
  {
    name: "Lip-sync stage",
    model: "Mock lip-sync adapter",
    icon: Music4,
    status: "Placeholder",
    capabilities: ["batch jobs", "face track", "ADR pipeline", "shot handoff"],
    description:
      "Отдельный production-stage модуль для синхронизации губ по утвержденным видео-дублям.",
  },
  {
    name: "Workflow orchestration",
    model: "Inngest-ready",
    icon: Send,
    status: "Vercel-ready",
    capabilities: ["долгие шаги", "ретраи", "checkpointing", "audit trail"],
    description:
      "Долгие процессы разбиваются на шаги с ретраями, checkpointing и прозрачным аудитом.",
  },
];

const capabilities = [
  "Text-to-video и image-to-video пайплайны",
  "Reference bundle и continuity locks",
  "Честный cost tracking и lineage",
  "Пошаговые durable workflow-процессы",
  "Подготовка к безопасному хранению API-ключей на сервере",
];

export function ProvidersPanel() {
  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-white">
            <ShieldCheck className="h-5 w-5 text-cyan-300" />
            Центр провайдеров и инфраструктуры
          </CardTitle>
          <CardDescription className="text-slate-400">
            Архитектура подготовлена под безопасное подключение реальных AI-провайдеров через серверный слой Vercel.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {providers.map(({ name, model, icon: Icon, status, description, capabilities: providerCapabilities }) => (
            <div
              key={name}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{name}</p>
                    <p className="text-sm text-slate-400">{model}</p>
                  </div>
                </div>
                <Badge tone="outline">{status}</Badge>
              </div>
              <p className="text-sm leading-6 text-slate-400">{description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {providerCapabilities.map((capability) => (
                  <Badge key={capability} tone="secondary">
                    {capability}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-white">
            <Cpu className="h-5 w-5 text-fuchsia-300" />
            Capability matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {capabilities.map((capability) => (
            <div
              key={capability}
              className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300"
            >
              {capability}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
