import {
  buildProjectFromInput,
  demoProjects,
  findProjectById,
  findProjectBySlug,
} from "@/lib/data/demo";
import { connectToDatabase, isDatabaseEnabled } from "@/lib/db/mongodb";
import {
  createProjectDocument,
  findProjectDocument,
  listProjectDocuments,
  updateProjectAssetsDocument,
  updateProjectCharactersDocument,
  updateProjectStoryDocument,
} from "@/lib/repositories/projects-repository";
import { createMockGeneration } from "@/lib/providers/mock-provider";
import { createProjectSchema, type CreateProjectInput } from "@/lib/validations/project";
import type { AssetRecord, Character, GenerationJob, Project, StoryBible } from "@/types/domain";

const projectStore = new Map<string, Project>();
const generationJobStore = new Map<string, GenerationJob>();

function ensureSeeded(): void {
  if (projectStore.size > 0) {
    return;
  }

  for (const project of demoProjects) {
    projectStore.set(project.id, project);
    for (const job of project.jobs) {
      generationJobStore.set(job.id, job);
    }
  }
}

export async function listProjects(): Promise<Project[]> {
  await connectToDatabase();
  ensureSeeded();
  const databaseProjects = isDatabaseEnabled()
    ? await listProjectDocuments()
    : [];

  for (const project of databaseProjects) {
    projectStore.set(project.id, project);
  }

  return Array.from(projectStore.values());
}

export async function getProjects(): Promise<Project[]> {
  return listProjects();
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  await connectToDatabase();
  ensureSeeded();

  if (isDatabaseEnabled()) {
    const databaseProject = await findProjectDocument(projectId);
    if (databaseProject) {
      projectStore.set(databaseProject.id, databaseProject);
      return databaseProject;
    }
  }

  return projectStore.get(projectId) ?? findProjectById(projectId) ?? null;
}

export async function getProjectBySlug(projectSlug: string): Promise<Project | null> {
  await connectToDatabase();
  ensureSeeded();

  if (isDatabaseEnabled()) {
    const databaseProject = await findProjectDocument(projectSlug);
    if (databaseProject) {
      projectStore.set(databaseProject.id, databaseProject);
      return databaseProject;
    }
  }

  for (const project of projectStore.values()) {
    if (project.slug === projectSlug || project.id === projectSlug) {
      return project;
    }
  }

  return findProjectBySlug(projectSlug) ?? findProjectById(projectSlug) ?? null;
}

export async function getProjectByIdOrSlug(identifier: string): Promise<Project | null> {
  return (await getProjectById(identifier)) ?? (await getProjectBySlug(identifier));
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  await connectToDatabase();
  ensureSeeded();

  const parsed = createProjectSchema.parse(input);
  const project = buildProjectFromInput(parsed);

  await createProjectDocument(project);
  projectStore.set(project.id, project);
  return project;
}

export async function createGenerationJob(
  projectId: string,
  shotId: string,
): Promise<GenerationJob> {
  await connectToDatabase();
  ensureSeeded();

  const project = await getProjectById(projectId);
  if (!project) {
    throw new Error("Проект не найден.");
  }

  const shot = project.shots.find((item) => item.id === shotId);
  if (!shot) {
    throw new Error("Шот не найден.");
  }

  const { job, takes } = createMockGeneration(shot);

  generationJobStore.set(job.id, job);
  project.jobs = [job, ...project.jobs];
  project.takes = [...takes, ...project.takes];
  shot.takes = takes;
  shot.status = "сгенерирован";

  if (!project.timeline.some((clip) => clip.shotId === shot.id)) {
    project.timeline.push({
      id: `${job.id}-clip`,
      shotId: shot.id,
      takeId: takes[0]?.id ?? "",
      label: shot.title,
      startSec: project.timeline.reduce((sum, clip) => sum + clip.durationSec, 0),
      durationSec: shot.durationTargetSec,
      lane: "видео",
    });
  }

  return job;
}

export function getGenerationJobById(jobId: string): GenerationJob | null {
  ensureSeeded();
  return generationJobStore.get(jobId) ?? null;
}

export async function updateProjectStoryBible(
  projectId: string,
  story: Pick<StoryBible, "logline" | "synopsis" | "mood">,
): Promise<Project | null> {
  await connectToDatabase();
  ensureSeeded();

  const project = await getProjectByIdOrSlug(projectId);
  if (!project) {
    return null;
  }

  project.logline = story.logline;
  project.synopsis = story.synopsis;
  project.storyBible = {
    ...project.storyBible,
    ...story,
  };

  await updateProjectStoryDocument(project.id, project.storyBible);
  projectStore.set(project.id, project);
  return project;
}

export async function updateProjectCharacters(
  projectId: string,
  characters: Character[],
): Promise<Project | null> {
  await connectToDatabase();
  ensureSeeded();

  const project = await getProjectByIdOrSlug(projectId);
  if (!project) {
    return null;
  }

  project.characters = characters;
  project.stats.characters = characters.length;

  await updateProjectCharactersDocument(project.id, characters);
  projectStore.set(project.id, project);
  return project;
}

export async function updateProjectAssets(
  projectId: string,
  assets: AssetRecord[],
): Promise<Project | null> {
  await connectToDatabase();
  ensureSeeded();

  const project = await getProjectByIdOrSlug(projectId);
  if (!project) {
    return null;
  }

  project.assets = assets;
  project.stats.assets = assets.length;

  await updateProjectAssetsDocument(project.id, assets);
  projectStore.set(project.id, project);
  return project;
}
