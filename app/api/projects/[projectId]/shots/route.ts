import { NextResponse } from "next/server";

import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

type RouteContext = {
  params: Promise<{ projectId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { projectId } = await context.params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    return NextResponse.json({ message: "Проект не найден." }, { status: 404 });
  }

  const shots = project.shots.map((shot) => {
    const scene = project.scenes.find((item) => item.id === shot.sceneId);

    return {
      ...shot,
      sceneTitle: scene?.title ?? "Без сцены",
    };
  });

  return NextResponse.json({ shots });
}
