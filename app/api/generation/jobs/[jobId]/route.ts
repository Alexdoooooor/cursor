import { NextResponse } from "next/server";

import { getGenerationJobById } from "@/lib/data/projects-store";

type RouteContext = {
  params: Promise<{
    jobId: string;
  }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const { jobId } = await params;
  const job = await getGenerationJobById(jobId);

  if (!job) {
    return NextResponse.json({ error: "Задача не найдена." }, { status: 404 });
  }

  return NextResponse.json({ job });
}
