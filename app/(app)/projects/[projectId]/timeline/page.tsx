import { notFound } from "next/navigation";

import { TimelinePanel } from "@/components/timeline/timeline-panel";
import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

type TimelinePageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function TimelinePage({ params }: TimelinePageProps) {
  const { projectId } = await params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    notFound();
  }

  return <TimelinePanel project={project} />;
}
