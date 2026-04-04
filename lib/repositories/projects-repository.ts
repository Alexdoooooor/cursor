import { Types } from "mongoose";

import type { AssetRecord, Character, Project, StoryBible } from "@/types/domain";
import {
  connectToDatabase,
  hasActiveDatabaseConnection,
  isDatabaseEnabled,
} from "@/lib/db/mongodb";
import { ProjectModel } from "@/lib/db/models";

function serializeProject(project: Project): Project {
  return JSON.parse(JSON.stringify(project)) as Project;
}

function stripMongoId(project: Project & { _id?: Types.ObjectId }): Project {
  const plain = { ...project };
  delete (plain as { _id?: Types.ObjectId })._id;
  return serializeProject(plain);
}

export async function listProjectDocuments(): Promise<Project[]> {
  if (!isDatabaseEnabled()) {
    return [];
  }

  try {
    await connectToDatabase();
    if (!hasActiveDatabaseConnection()) {
      return [];
    }

    const projects = await ProjectModel.find({}, null, {
      lean: true,
      sort: { createdAt: -1 },
    });

    return projects.map((project) =>
      stripMongoId(project as Project & { _id?: Types.ObjectId }),
    );
  } catch {
    return [];
  }
}

export async function findProjectDocument(identifier: string): Promise<Project | null> {
  if (!isDatabaseEnabled()) {
    return null;
  }

  try {
    await connectToDatabase();
    if (!hasActiveDatabaseConnection()) {
      return null;
    }

    const project =
      (await ProjectModel.findOne({ id: identifier }, null, { lean: true })) ??
      (await ProjectModel.findOne({ slug: identifier }, null, { lean: true }));

    return project
      ? stripMongoId(project as Project & { _id?: Types.ObjectId })
      : null;
  } catch {
    return null;
  }
}

export async function createProjectDocument(project: Project): Promise<Project> {
  if (!isDatabaseEnabled()) {
    return project;
  }

  try {
    await connectToDatabase();
    if (!hasActiveDatabaseConnection()) {
      return project;
    }

    await ProjectModel.findOneAndUpdate(
      { id: project.id },
      { ...project, updatedAtIso: new Date().toISOString() },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  } catch {
    return project;
  }

  return project;
}

export async function updateProjectStoryDocument(
  projectId: string,
  storyBible: StoryBible,
): Promise<void> {
  if (!isDatabaseEnabled()) {
    return;
  }

  try {
    await connectToDatabase();
    if (!hasActiveDatabaseConnection()) {
      return;
    }

    await ProjectModel.findOneAndUpdate(
      { id: projectId },
      {
        $set: {
          logline: storyBible.logline,
          synopsis: storyBible.synopsis,
          storyBible,
          latestActivity: "только что",
          updatedAtIso: new Date().toISOString(),
        },
      },
    );
  } catch {
    return;
  }
}

export async function updateProjectCharactersDocument(
  projectId: string,
  characters: Character[],
): Promise<void> {
  if (!isDatabaseEnabled()) {
    return;
  }

  try {
    await connectToDatabase();
    if (!hasActiveDatabaseConnection()) {
      return;
    }

    await ProjectModel.findOneAndUpdate(
      { id: projectId },
      {
        $set: {
          characters,
          "stats.characters": characters.length,
          latestActivity: "только что",
          updatedAtIso: new Date().toISOString(),
        },
      },
    );
  } catch {
    return;
  }
}

export async function updateProjectAssetsDocument(
  projectId: string,
  assets: AssetRecord[],
): Promise<void> {
  if (!isDatabaseEnabled()) {
    return;
  }

  try {
    await connectToDatabase();
    if (!hasActiveDatabaseConnection()) {
      return;
    }

    await ProjectModel.findOneAndUpdate(
      { id: projectId },
      {
        $set: {
          assets,
          "stats.assets": assets.length,
          latestActivity: "только что",
          updatedAtIso: new Date().toISOString(),
        },
      },
    );
  } catch {
    return;
  }
}

export async function replaceProjectDocument(project: Project): Promise<Project> {
  return createProjectDocument(project);
}
