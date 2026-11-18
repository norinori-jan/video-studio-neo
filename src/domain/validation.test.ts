import {describe, expect, it} from 'vitest';
import {blankProject} from './model';
import {ProjectSchema} from './validation';

describe('project file validation', () => {
  it('accepts a newly created project', () => {
    expect(ProjectSchema.safeParse(blankProject()).success).toBe(true);
  });

  it('rejects an unsupported schema version', () => {
    const project = {...blankProject(), schemaVersion: 99};
    expect(ProjectSchema.safeParse(project).success).toBe(false);
  });

  it('rejects clips with invalid timing or volume', () => {
    const project = blankProject();
    project.tracks[0].clips.push({
      id: 'clip-1',
      name: 'Broken clip',
      kind: 'video',
      start: -1,
      sourceIn: 0,
      duration: 4,
      color: '#fff',
      volume: 2
    });
    expect(ProjectSchema.safeParse(project).success).toBe(false);
  });

  it('rejects projects with invalid dimensions', () => {
    const project = {...blankProject(), width: 0};
    expect(ProjectSchema.safeParse(project).success).toBe(false);
  });
});
