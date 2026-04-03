"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { projectTemplateOptions } from "@/lib/data/demo";
import { createProjectSchema } from "@/lib/validations/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function NewProjectForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState<(typeof projectTemplateOptions)[number]["value"]>(
    projectTemplateOptions[0]?.value ?? "film",
  );
  const [genre, setGenre] = useState("Научная фантастика");
  const [duration, setDuration] = useState("480");
  const [aspectRatio, setAspectRatio] = useState("21:9");
  const [synopsis, setSynopsis] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError("");

    const payload = {
      title: String(formData.get("title") ?? ""),
      format: String(formData.get("format") ?? ""),
      genre: String(formData.get("genre") ?? ""),
      targetDurationSec: Number(formData.get("targetDurationSec") ?? 0),
      aspectRatio: String(formData.get("aspectRatio") ?? ""),
      synopsis: String(formData.get("synopsis") ?? ""),
    };

    const parsed = createProjectSchema.safeParse(payload);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Проверьте заполнение формы.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        throw new Error("Не удалось создать проект.");
      }

      const result = (await response.json()) as { project: { id: string; slug: string } };
      router.push(`/projects/${result.project.slug}`);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось создать проект.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Название проекта</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Например: Полночный экспресс памяти"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="format">Формат</Label>
          <select
            id="format"
            name="format"
            value={format}
            onChange={(event) =>
              setFormat(event.target.value as (typeof projectTemplateOptions)[number]["value"])
            }
            className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none ring-0 transition focus:border-cyan-400/60"
          >
            {projectTemplateOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-950">
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="genre">Жанр / тон</Label>
          <Input
            id="genre"
            name="genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            placeholder="Техно-нуар, драма, магический реализм"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetDurationSec">Целевая длительность, секунд</Label>
          <Input
            id="targetDurationSec"
            name="targetDurationSec"
            type="number"
            min={15}
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="aspectRatio">Aspect ratio</Label>
          <Input
            id="aspectRatio"
            name="aspectRatio"
            value={aspectRatio}
            onChange={(event) => setAspectRatio(event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="synopsis">Краткий синопсис</Label>
        <Textarea
          id="synopsis"
          name="synopsis"
          value={synopsis}
          onChange={(event) => setSynopsis(event.target.value)}
          placeholder="Опишите идею проекта, конфликт, мир и ожидаемый визуальный результат."
          rows={6}
        />
      </div>

      {error ? (
        <p className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          После создания проект сразу попадёт в production shell: story bible, герои, шоты и очередь генерации.
        </p>
        <Button type="submit" disabled={isSubmitting || title.trim().length < 3}>
          {isSubmitting ? "Создаём проект…" : "Создать проект"}
        </Button>
      </div>
    </form>
  );
}
