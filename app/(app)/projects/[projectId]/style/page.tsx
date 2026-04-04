import { notFound } from "next/navigation";

import { StylePanel } from "@/components/styles/style-panel";
import { getProjectBySlug } from "@/lib/data/projects-store";

type StylePageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function StylePage({ params }: StylePageProps) {
  const { projectId } = await params;
  const project = await getProjectBySlug(projectId);

  if (!project) {
    notFound();
  }

  return <StylePanel project={project} />;
}
