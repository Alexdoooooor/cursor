import { notFound } from "next/navigation";

import { ProjectOverview } from "@/components/projects/project-overview";
import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectOverview project={project} />;
}
