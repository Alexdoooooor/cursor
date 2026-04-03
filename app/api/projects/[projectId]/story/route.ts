import { NextResponse } from "next/server";

import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

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
