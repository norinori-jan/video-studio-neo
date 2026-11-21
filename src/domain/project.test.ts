import { describe, expect, it } from "vitest";
import {
  createProject,
  projectDurationSeconds,
  ProjectSchema,
} from "./project";

describe("project model", () => {
  it("creates a valid empty project", () => {
    const project = createProject();

    expect(ProjectSchema.safeParse(project).success).toBe(true);
    expect(project.tracks).toHaveLength(4);
    expect(project.assets).toEqual([]);
  });

  it("calculates timeline duration from clip positions", () => {
    const project = createProject();

    project.tracks[0].clips.push({
      id: "clip-1",
      name: "Test clip",
      kind: "video",
      start: 10,
      sourceIn: 2,
      duration: 5,
      color: "#fff",
      volume: 1,
    });

    expect(projectDurationSeconds(project)).toBe(15);
  });
});
