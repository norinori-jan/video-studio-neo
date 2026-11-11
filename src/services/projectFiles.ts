import { ProjectSchema, type Project } from "../domain/project";

export function downloadProject(project: Project): void {
  const validated = ProjectSchema.parse({
    ...project,
    updatedAt: new Date().toISOString()
  });
  const blob = new Blob([JSON.stringify(validated, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${safeFileName(project.name)}.vsp.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function readProjectFile(file: File): Promise<Project> {
  const text = await file.text();
  const parsed: unknown = JSON.parse(text);
  return ProjectSchema.parse(parsed);
}

function safeFileName(value: string): string {
  return value.trim().replace(/[\\/:*?"<>|]/g, "-").slice(0, 80) || "video-studio-project";
}