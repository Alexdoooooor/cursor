import { describe, expect, it } from "vitest";

import { getProjectByIdOrSlug, listProjects } from "@/lib/data/projects-store";

describe("demo data", () => {
  it("возвращает демо-проекты", async () => {
    const projects = await listProjects();

    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]?.title).toBeTruthy();
  });

  it("находит проект по идентификатору или slug", async () => {
    const project = await getProjectByIdOrSlug("project-aurora");

    expect(project).not.toBeNull();
    expect(project?.title).toContain("Полуночный");
  });
});
