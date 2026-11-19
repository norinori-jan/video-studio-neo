import {describe, expect, it} from 'vitest';
import {blankProject} from './model';
import {ProjectSchema} from './validation';
import {createProject, projectDurationSeconds} from "./project";
import {serializeProject, validateRelinkFile} from '../services/io';

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

describe("canonical project domain facade", () => {
  it("creates a project accepted by the editor project schema", () => {
    const project = createProject("統合テスト");
    expect(project.name).toBe("統合テスト");
    expect(ProjectSchema.safeParse(project).success).toBe(true);
  });

  it("calculates timeline duration in seconds from editor clips", () => {
    const project = createProject();
    project.tracks[0].clips.push({
      id: "clip-1",
      name: "sample",
      kind: "video",
      start: 3,
      sourceIn: 0,
      duration: 8,
      color: "#fff",
      volume: 1
    });
    expect(projectDurationSeconds(project)).toBe(11);
  });
});


describe('persistent project assets', () => {
  it('keeps imported media metadata in the project schema', () => {
    const project = blankProject();
    project.assets.push({
      id: 'asset-1',
      name: 'iphone-video.mp4',
      kind: 'video',
      mime: 'video/mp4',
      size: 1024,
      duration: 12.5,
      url: 'blob:temporary-session-url',
      width: 1920,
      height: 1080
    });
    const parsed = ProjectSchema.safeParse(project);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.assets).toHaveLength(1);
      expect(parsed.data.assets[0].name).toBe('iphone-video.mp4');
    }
  });

  it('loads legacy projects without an assets field as an empty media library', () => {
    const {assets: _assets, ...legacyProject} = blankProject();
    const parsed = ProjectSchema.safeParse(legacyProject);
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.assets).toEqual([]);
  });

  it('does not serialize temporary browser object URLs', () => {
    const project = blankProject();
    project.assets.push({
      id: 'asset-1',
      name: 'clip.mp4',
      kind: 'video',
      mime: 'video/mp4',
      size: 100,
      duration: 5,
      url: 'blob:temporary-session-url'
    });
    const serialized = serializeProject(project);
    expect(serialized).toContain('clip.mp4');
    expect(serialized).not.toContain('blob:temporary-session-url');
  });
});


describe('media relinking metadata checks',()=>{
 const saved={name:'camera.mp4',size:2048,mime:'video/mp4'};
 it('accepts matching metadata',()=>expect(()=>validateRelinkFile(saved,{name:'camera.mp4',size:2048,type:'video/mp4'})).not.toThrow());
 it('rejects a different filename',()=>expect(()=>validateRelinkFile(saved,{name:'other.mp4',size:2048,type:'video/mp4'})).toThrow('ファイル名'));
 it('rejects a different size',()=>expect(()=>validateRelinkFile(saved,{name:'camera.mp4',size:1024,type:'video/mp4'})).toThrow('サイズ'));
 it('rejects a different MIME type',()=>expect(()=>validateRelinkFile(saved,{name:'camera.mp4',size:2048,type:'video/quicktime'})).toThrow('形式'));
});
