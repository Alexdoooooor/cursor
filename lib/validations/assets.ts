import { z } from "zod";

export const updateAssetsSchema = z.object({
  assets: z.array(
    z.object({
      id: z.string().min(1, "У ассета должен быть идентификатор."),
      name: z.string().min(2, "Название ассета должно содержать минимум 2 символа."),
      type: z.enum(["image", "video", "audio", "reference"]),
      origin: z.string().min(2, "Укажите происхождение ассета."),
      canonical: z.boolean(),
      tags: z.array(z.string().min(1)).default([]),
      usedIn: z.array(z.string().min(1)).default([]),
      checksum: z.string().min(3, "Контрольная сумма должна быть заполнена."),
    }),
  ),
});

export type UpdateAssetsInput = z.infer<typeof updateAssetsSchema>;
