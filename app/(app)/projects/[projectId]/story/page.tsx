import { StoryBiblePanel } from "@/components/story/story-bible-panel";
import { getProjectBySlug } from "@/lib/data/projects-store";
import { notFound } from "next/navigation";

type StoryPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { projectId } = await params;
  const project = await getProjectBySlug(projectId);

  if (!project) {
    notFound();
  }

  return <StoryBiblePanel project={project} />;
}
