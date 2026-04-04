import { notFound } from "next/navigation";

import { CharactersPanel } from "@/components/characters/characters-panel";
import { getProjectByIdOrSlug } from "@/lib/data/projects-store";

type CharactersPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function CharactersPage({ params }: CharactersPageProps) {
  const { projectId } = await params;
  const project = await getProjectByIdOrSlug(projectId);

  if (!project) {
    notFound();
  }

  return <CharactersPanel project={project} />;
}
