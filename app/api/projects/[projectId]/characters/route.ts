import { NextRequest, NextResponse } from "next/server";

import {
  getProjectByIdOrSlug,
  updateProjectCharacters,
} from "@/lib/data/projects-store";
import { updateCharactersSchema } from "@/lib/validations/characters";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await context.params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    return NextResponse.json(
      { error: "Проект не найден." },
      { status: 404 },
    );
  }

  return NextResponse.json(project.characters);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await context.params;
  const body = await request.json();
  const parsed = updateCharactersSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Некорректный формат characters." },
      { status: 400 },
    );
  }

  const updatedProject = await updateProjectCharacters(
    projectId,
    parsed.data.characters,
  );

  if (!updatedProject) {
    return NextResponse.json(
      { error: "Проект не найден." },
      { status: 404 },
    );
  }

  return NextResponse.json({ characters: updatedProject.characters });
}
