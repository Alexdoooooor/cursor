import { notFound } from "next/navigation";

import { AudioPanel } from "@/components/audio/audio-panel";
import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

type AudioPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function AudioPage({ params }: AudioPageProps) {
  const { projectId } = await params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    notFound();
  }

  return <AudioPanel project={project} />;
}
