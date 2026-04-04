import { NextResponse } from "next/server";

import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

export async function GET(
  _request: Request,
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

  return NextResponse.json({ project });
}
