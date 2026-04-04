import type { GenerationJob, Shot, Take } from "@/types/domain";

export function createMockGeneration(shot: Shot): {
  job: GenerationJob;
  takes: Take[];
} {
  const now = new Date().toISOString();

  const takes: Take[] = [
    {
      id: `take-${shot.id}-a`,
      shotId: shot.id,
      name: "Take A / стабильный свет",
      status: "candidate",
      durationSec: shot.durationTargetSec,
      continuityScore: 91,
      notes: "Хорошо удерживает лицо и текстуру костюма.",
      summary: "Чистый проход камеры, хороший контроль контрового света.",
      lineage: ["first frame", "character refs", "style preset"],
    },
    {
      id: `take-${shot.id}-b`,
      shotId: shot.id,
      name: "Take B / усиленный контраст",
      status: "candidate",
      durationSec: shot.durationTargetSec,
      continuityScore: 84,
      notes: "Есть риск drift в тенях на лице.",
      summary: "Более драматичный контраст, но слабее consistency.",
      lineage: ["same prompt", "stronger negative instructions"],
    },
  ];

  const job: GenerationJob = {
    id: `job-${shot.id}-${Date.now()}`,
    shotId: shot.id,
    shotTitle: shot.title,
    title: `Генерация — ${shot.title}`,
    provider: "Mock VFX Core",
    model: "analog-film-v1",
    status: "succeeded",
    type: "generate-video",
    progress: 100,
    createdAt: now,
    updatedAt: now,
    startedAt: now,
    costEstimateUsd: 2.8,
    costLabel: "$2.80",
    outputTakeIds: takes.map((take) => take.id),
    outputs: [
      { label: "Режим", value: "image-to-video + first frame control" },
      { label: "Continuity", value: "hero lock + style lock + lighting lock" },
      { label: "Следующий шаг", value: "сравнить takes и утвердить мастер-дубль" },
    ],
    summary: "Mock workflow завершён и подготовил два candidate takes.",
  };

  return { job, takes };
}
