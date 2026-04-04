import { notFound } from "next/navigation";

import { StoryboardPanel } from "@/components/storyboard/storyboard-panel";
import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

type StoryboardPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function StoryboardPage({ params }: StoryboardPageProps) {
  const { projectId } = await params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    notFound();
  }

  return <StoryboardPanel project={project} />;
}
