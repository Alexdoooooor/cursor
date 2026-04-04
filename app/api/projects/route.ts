import { NextResponse } from "next/server";

import { createProject, listProjects } from "@/lib/data/projects-store";
import { createProjectSchema } from "@/lib/validations/project";

export async function GET() {
  const projects = await listProjects();

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createProjectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Некорректные данные проекта." },
      { status: 400 },
    );
  }

  const project = await createProject(parsed.data);

  return NextResponse.json({ projectId: project.id, project }, { status: 201 });
}
