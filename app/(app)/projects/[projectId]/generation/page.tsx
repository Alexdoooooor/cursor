import { GenerationPanel } from "@/components/generation/generation-panel";
import { getProjectById } from "@/lib/data/projects-store";
import { notFound } from "next/navigation";

type ProjectGenerationPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectGenerationPage({
  params,
}: ProjectGenerationPageProps) {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return <GenerationPanel project={project} />;
}
