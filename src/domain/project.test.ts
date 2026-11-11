import { describe, expect, it } from "vitest";
import { createProject, projectDurationTicks, ProjectSchema } from "./project";

describe("project model", () => {
  it("creates a valid empty project", () => {
    const project = createProject();
    expect(ProjectSchema.safeParse(project).success).toBe(true);
    expect(project.tracks).toHaveLength(3);
  });

  it("calculates timeline duration from clip positions", () => {
    const project = createProject();
    project.tracks[0].clips.push({
      id: crypto.randomUUID(),
      assetId: crypto.randomUUID(),
      timelineStart: 100,
      sourceIn: 20,
      sourceOut: 220,
      gainDb: 0,
      opacity: 1
    });
    expect(projectDurationTicks(project)).toBe(300);
  });
});