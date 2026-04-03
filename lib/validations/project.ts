import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Название должно содержать минимум 3 символа.")
    .max(120, "Название не должно превышать 120 символов."),
  format: z.enum(["film", "series", "ad", "music-video", "animation", "short"]),
  aspectRatio: z.enum(["16:9", "9:16", "1:1", "2.39:1"]),
  genre: z
    .string()
    .min(2, "Укажите жанр.")
    .max(80, "Жанр не должен быть длиннее 80 символов."),
  targetDurationSec: z.coerce
    .number()
    .min(15, "Минимальная длительность — 15 секунд.")
    .max(7200, "Максимальная длительность — 7200 секунд."),
  synopsis: z
    .string()
    .min(10, "Кратко опишите идею проекта.")
    .max(1000, "Синопсис не должен быть длиннее 1000 символов."),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
