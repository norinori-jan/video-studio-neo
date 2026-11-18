/**
 * Canonical project-domain entry point.
 *
 * The editor's persisted and runtime representation is currently defined by
 * ./model. Keep this module as a compatibility facade so consumers do not
 * accidentally introduce a second, incompatible project shape.
 */
import { blankProject } from "./model";
import type { Project } from "./model";

export { blankProject, endTime, id } from "./model";
export type { Asset, Clip, Kind, Project, Track } from "./model";
export { ProjectSchema } from "./validation";
export type { ProjectValidationError } from "./validation";

/** Create a project using the same shape used by the editor and project I/O. */
export function createProject(name = "名称未設定プロジェクト"): Project {
  return { ...blankProject(), name };
}

/** Timeline duration in seconds (the editor model stores time in seconds). */
export function projectDurationSeconds(project: Project): number {
  return project.tracks.reduce(
    (max, track) =>
      track.clips.reduce(
        (trackMax, clip) => Math.max(trackMax, clip.start + clip.duration),
        max
      ),
    0
  );
}
