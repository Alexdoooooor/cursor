import { NextResponse } from "next/server";

import {
  createGenerationJob,
  getProjectByIdOrSlug,
} from "@/lib/data/projects-store";

export async function POST(request: Request) {
  const payload = await request.json();
  const projectId = String(payload.projectId ?? "");
  const shotId = String(payload.shotId ?? "");

  if (!projectId || !shotId) {
    return NextResponse.json(
      { error: "projectId и shotId обязательны." },
      { status: 400 },
    );
  }

  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    return NextResponse.json({ error: "Проект не найден." }, { status: 404 });
  }

  const shot = project.shots.find((item) => item.id === shotId);

  if (!shot) {
    return NextResponse.json({ error: "Шот не найден." }, { status: 404 });
  }

  const job = await createGenerationJob(projectId, shotId);

  return NextResponse.json(job, { status: 201 });
}
