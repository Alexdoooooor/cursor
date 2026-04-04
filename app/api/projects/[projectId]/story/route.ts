import { NextResponse } from "next/server";

import {
  getProjectByIdOrSlug,
  updateProjectStoryBible,
} from "@/lib/data/projects-store";
import { updateStorySchema } from "@/lib/validations/story";

type RouteContext = {
  params: Promise<{ projectId: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { projectId } = await context.params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    return NextResponse.json(
      { message: "Проект не найден." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    storyBible: {
      logline: project.logline,
      synopsis: project.synopsis,
      acts: project.storyBible.acts,
      mood: project.storyBible.mood,
    },
    scenes: project.scenes,
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { projectId } = await context.params;
  const rawPayload = await request.json();
  const parsed = updateStorySchema.safeParse(rawPayload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Некорректные данные story bible." },
      { status: 400 },
    );
  }

  const project = await updateProjectStoryBible(projectId, {
    logline: parsed.data.logline,
    synopsis: parsed.data.synopsis,
    mood: parsed.data.mood ?? "",
  });

  if (!project) {
    return NextResponse.json(
      { message: "Проект не найден." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    storyBible: project.storyBible,
    project,
  });
}
