import { z } from 'zod';

const AssetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: z.enum(['video', 'audio', 'image']),
  mime: z.string(),
  size: z.number().finite().nonnegative(),
  duration: z.number().finite().nonnegative(),
  url: z.string().min(1),
  width: z.number().finite().positive().optional(),
  height: z.number().finite().positive().optional()
}).passthrough();

const ClipSchema = z.object({
  id: z.string().min(1),
  assetId: z.string().min(1).optional(),
  name: z.string().min(1),
  kind: z.enum(['video', 'audio', 'image', 'text']),
  start: z.number().finite().nonnegative(),
  sourceIn: z.number().finite().nonnegative(),
  duration: z.number().finite().positive(),
  color: z.string().min(1),
  text: z.string().optional(),
  volume: z.number().finite().min(0).max(1)
}).passthrough();

const TrackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: z.enum(['video', 'audio', 'image', 'text']),
  muted: z.boolean(),
  clips: z.array(ClipSchema)
}).passthrough();

export const ProjectSchema = z.object({
  schemaVersion: z.literal(1),
  name: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  fps: z.number().finite().positive(),
  duration: z.number().finite().nonnegative(),
  tracks: z.array(TrackSchema),
  updatedAt: z.string().min(1)
}).passthrough();

export type ProjectValidationError = z.ZodError;
