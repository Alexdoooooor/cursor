import { getProjectByIdOrSlug } from "@/lib/data/projects-store";
import { notFound } from "next/navigation";
import { ExportsPanel } from "@/components/exports/exports-panel";

type ExportsPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ExportsPage({ params }: ExportsPageProps) {
  const { projectId } = await params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    notFound();
  }

  return <ExportsPanel project={project} />;
}
