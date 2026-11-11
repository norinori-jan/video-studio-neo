# Implementation Roadmap

## Phase 0 — Design and technical proofs
- Freeze v1 user stories and project schema.
- Verify Tauri 2 + React + Rust build on a development machine.
- On macOS, prove media probing, local playback/preview, and one local FFmpeg export path.
- Decide the preview/render technology based on measured behavior, not assumption.

**Exit gate:** a minimal Mac app can open, inspect, preview, and export a short fixture entirely offline.

## Phase 1 — Project foundation
- Native app shell and project manager.
- Create/open/save, atomic writes, autosave snapshots, recovery prompt.
- Media import, metadata, thumbnails, relink workflow.

**Exit gate:** project survives app restart and missing media is reported without data loss.

## Phase 2 — Shared editor core
- Canonical timeline model, rational timebase, clip/track commands.
- Selection, snapping, split, trim, move, undo/redo.
- Preview controller and timeline synchronization.

**Exit gate:** deterministic timeline tests pass and preview position matches timeline position.

## Phase 3 — Simple mode and first export
- Arrange/trim/split, title overlays, BGM, fades.
- Preset export with progress/cancel/error handling.
- Validate output duration, dimensions, audio presence, and decodability.

**Exit gate:** a user can complete a small edit offline and export a playable file.

## Phase 4 — Professional mode foundation
- Multi-track editing, track controls, keyframe data model.
- More detailed audio and transform controls.
- Shared project can switch between modes without state loss.

**Exit gate:** same project produces equivalent edit results from both modes.

## Phase 5 — Quality and optional AI
- Proxy/cache management and performance profiling.
- Crash recovery, accessibility, packaging/signing/notarization.
- Optional local transcription/subtitle model after hardware and model-size evaluation.

**Exit gate:** release candidate passes macOS test matrix and offline workflow checks.

## Working rule
Do not label a phase complete based only on generated source. Record what was built, what was run, on which OS/hardware, and which tests passed.
