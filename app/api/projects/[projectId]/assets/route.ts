import { NextResponse } from "next/server";

import {
  getProjectByIdOrSlug,
  updateProjectAssets,
} from "@/lib/data/projects-store";
import { updateAssetsSchema } from "@/lib/validations/assets";

export async function GET(
  _: Request,
  context: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await context.params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    return NextResponse.json({ message: "Проект не найден." }, { status: 404 });
  }

  return NextResponse.json({ assets: project.assets });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = await context.params;
  const body = await request.json();
  const parsed = updateAssetsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Некорректные данные assets." },
      { status: 400 },
    );
  }

  const updatedProject = await updateProjectAssets(projectId, parsed.data.assets);

  if (!updatedProject) {
    return NextResponse.json({ message: "Проект не найден." }, { status: 404 });
  }

  return NextResponse.json({ assets: updatedProject.assets });
}
