import { z } from "zod";

const characterInputSchema = z.object({
  id: z.string().min(2, "У персонажа должен быть идентификатор."),
  name: z.string().min(2, "Укажите имя персонажа."),
  role: z.string().min(2, "Укажите роль персонажа."),
  bio: z.string().min(3, "Добавьте краткую биографию."),
  visualIdentity: z.string().min(3, "Опишите внешний образ."),
  costumeSets: z.array(z.string()).default([]),
  motionTraits: z.array(z.string()).default([]),
  continuityLocks: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  voiceProfile: z.string().min(1, "Укажите голосовой профиль."),
});

export const updateCharactersSchema = z.object({
  characters: z.array(characterInputSchema).min(1, "Нужен хотя бы один персонаж."),
});

export type UpdateCharactersInput = z.infer<typeof updateCharactersSchema>;
