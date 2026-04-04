import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";

import {
  createProject,
  getProjectByIdOrSlug,
  listProjects,
  updateProjectAssets,
  updateProjectCharacters,
  updateProjectStoryBible,
} from "@/lib/data/projects-store";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongo.getUri();
  delete process.env.SKIP_DB_CONNECT;
});

afterAll(async () => {
  await mongo.stop();
});

describe("projects repository", () => {
  it("создаёт проект и находит его по slug", async () => {
    const created = await createProject({
      title: "Тестовый фильм памяти",
      format: "film",
      aspectRatio: "16:9",
      genre: "Драма",
      targetDurationSec: 90,
      synopsis: "История о памяти и городе.",
    });

    const found = await getProjectByIdOrSlug(created.slug);

    expect(found).not.toBeNull();
    expect(found?.title).toBe(created.title);
  });

  it("обновляет story bible, героев и assets", async () => {
    const project = (await listProjects())[0];
    expect(project).toBeTruthy();

    const updatedStory = await updateProjectStoryBible(project.id, {
      logline: "Новый логлайн",
      synopsis: "Новый синопсис",
      mood: "Мистическая тревога",
    });

    expect(updatedStory?.storyBible.logline).toBe("Новый логлайн");
    expect(updatedStory?.storyBible.mood).toBe("Мистическая тревога");

    const updatedCharacters = await updateProjectCharacters(project.id, [
      {
        id: "new-char",
        name: "Марк",
        role: "Наблюдатель",
        bio: "Следит за ритмом истории.",
        visualIdentity: "Высокий силуэт в тумане.",
        costumeSets: ["Пальто"],
        motionTraits: ["Медленный шаг"],
        continuityLocks: ["Силуэт"],
        tags: ["новый"],
        voiceProfile: "Баритон",
      },
    ]);

    expect(updatedCharacters?.characters).toHaveLength(1);
    expect(updatedCharacters?.stats.characters).toBe(1);

    const updatedAssets = await updateProjectAssets(project.id, [
      {
        id: "asset-new",
        name: "Новый keyframe",
        type: "image",
        origin: "Upload",
        canonical: true,
        tags: ["keyframe"],
        usedIn: ["Scene 1"],
        checksum: "ABC-123",
      },
    ]);

    expect(updatedAssets?.assets).toHaveLength(1);
    expect(updatedAssets?.stats.assets).toBe(1);
  });
});
