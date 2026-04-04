import { z } from "zod";

export const updateStorySchema = z.object({
  logline: z
    .string()
    .min(3, "Логлайн должен содержать минимум 3 символа.")
    .max(240, "Логлайн не должен быть длиннее 240 символов."),
  synopsis: z
    .string()
    .min(10, "Синопсис должен содержать минимум 10 символов.")
    .max(4000, "Синопсис не должен быть длиннее 4000 символов."),
  mood: z
    .string()
    .min(2, "Укажите тональность.")
    .max(120, "Тональность не должна быть длиннее 120 символов.")
    .optional(),
});

export type UpdateStoryInput = z.infer<typeof updateStorySchema>;
