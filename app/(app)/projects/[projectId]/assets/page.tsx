import { notFound } from "next/navigation";

import { AssetsPanel } from "@/components/assets/assets-panel";
import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

type ProjectAssetsPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectAssetsPage({
  params,
}: ProjectAssetsPageProps) {
  const { projectId } = await params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    notFound();
  }

  return <AssetsPanel project={project} />;
}
