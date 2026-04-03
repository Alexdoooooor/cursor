import { notFound } from "next/navigation";

import { WorldPanel } from "@/components/world/world-panel";
import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectWorldPage({ params }: PageProps) {
  const { projectId } = await params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    notFound();
  }

  return <WorldPanel project={project} />;
}
