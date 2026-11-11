import { z } from "zod";

export const FrameRateSchema = z.object({
  numerator: z.number().int().positive(),
  denominator: z.number().int().positive()
});

export const AssetSchema = z.object({
  id: z.string().uuid(),
  kind: z.enum(["video", "audio", "image", "subtitle"]),
  name: z.string().min(1),
  path: z.string().min(1),
  storage: z.enum(["project-relative", "external"]),
  durationTicks: z.number().int().nonnegative().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  mimeType: z.string().optional(),
  sizeBytes: z.number().int().nonnegative().optional(),
  lastModified: z.number().int().nonnegative().optional()
});

export const ClipSchema = z.object({
  id: z.string().uuid(),
  assetId: z.string().uuid(),
  timelineStart: z.number().int().nonnegative(),
  sourceIn: z.number().int().nonnegative(),
  sourceOut: z.number().int().positive(),
  gainDb: z.number().default(0),
  opacity: z.number().min(0).max(1).default(1)
}).refine((clip) => clip.sourceOut > clip.sourceIn, {
  message: "sourceOut must be greater than sourceIn"
});

export const TrackSchema = z.object({
  id: z.string().uuid(),
  kind: z.enum(["video", "audio", "title", "subtitle"]),
  name: z.string(),
  muted: z.boolean().default(false),
  locked: z.boolean().default(false),
  clips: z.array(ClipSchema)
});

export const ProjectSchema = z.object({
  format: z.literal("video-studio-project"),
  version: z.literal(1),
  id: z.string().uuid(),
  name: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
  mode: z.enum(["simple", "professional"]),
  settings: z.object({
    width: z.number().int().min(16),
    height: z.number().int().min(16),
    frameRate: FrameRateSchema,
    audioSampleRate: z.union([z.literal(44100), z.literal(48000), z.literal(96000)])
  }),
  assets: z.array(AssetSchema),
  tracks: z.array(TrackSchema),
  metadata: z.record(z.unknown()).default({})
});

export type Project = z.infer<typeof ProjectSchema>;
export type Asset = z.infer<typeof AssetSchema>;
export type Clip = z.infer<typeof ClipSchema>;
export type Track = z.infer<typeof TrackSchema>;

export function createProject(name = "名称未設定プロジェクト"): Project {
  const now = new Date().toISOString();
  return {
    format: "video-studio-project",
    version: 1,
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: now,
    mode: "simple",
    settings: {
      width: 1920,
      height: 1080,
      frameRate: { numerator: 30, denominator: 1 },
      audioSampleRate: 48000
    },
    assets: [],
    tracks: [
      { id: crypto.randomUUID(), kind: "video", name: "ビデオ 1", muted: false, locked: false, clips: [] },
      { id: crypto.randomUUID(), kind: "audio", name: "オーディオ 1", muted: false, locked: false, clips: [] },
      { id: crypto.randomUUID(), kind: "title", name: "タイトル", muted: false, locked: false, clips: [] }
    ],
    metadata: {}
  };
}

export function projectDurationTicks(project: Project): number {
  return project.tracks.reduce((max, track) => {
    const trackEnd = track.clips.reduce(
      (end, clip) => Math.max(end, clip.timelineStart + (clip.sourceOut - clip.sourceIn)),
      0
    );
    return Math.max(max, trackEnd);
  }, 0);
}