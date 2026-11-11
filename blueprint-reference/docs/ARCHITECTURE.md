# Technical Architecture — Proposed

## 1. High-level shape

```text
React + TypeScript UI
  ├─ Home / Project Manager
  ├─ Simple Editor ───────┐
  └─ Professional Editor ─┤
                          v
                  Shared Editor Core
                  ├─ Project model + commands/undo
                  ├─ Timeline + timebase
                  ├─ Media library + metadata
                  ├─ Preview coordination
                  └─ Export job model
                          |
                    Tauri command boundary
                          |
Rust native services
  ├─ Project/filesystem service
  ├─ Media probe + thumbnail/waveform jobs
  ├─ FFmpeg process supervisor
  ├─ Cache/proxy manager
  └─ SQLite metadata/index
                          |
             Bundled local FFmpeg executable
```

## 2. Proposed stack
- Desktop container: Tauri 2.
- UI: React + TypeScript.
- Native services: Rust.
- Project interchange: versioned JSON.
- Local index/history: SQLite.
- Media processing: bundled, locally invoked FFmpeg/ffprobe build with a documented license and codec configuration.
- Tests: TypeScript unit tests for editor state; Rust unit/integration tests for file/process services; fixture-based media tests; macOS end-to-end smoke tests.

This is a proposed stack, not yet an implemented or validated build.

## 3. Important design decisions
### Shared project model
Both editor modes dispatch commands to the same editor core. UI components must not maintain independent copies of clip timing or media state.

### Timeline timebase
Represent frame/time positions as integer ticks or rational values. Store project frame rate as numerator/denominator (e.g. 30000/1001), and convert at well-defined boundaries. Avoid accumulating floating-point seconds for frame-accurate edits.

### Non-destructive edit graph
A clip instance references a source-media asset and stores source in/out, timeline position, track, transform, audio parameters, effects, and keyframes. Rendering/export derives from the project graph.

### Media identity and relinking
Store a generated asset UUID, file size, duration, stream metadata, and optional content fingerprint. Use fingerprints cautiously; do not hash multi-gigabyte media synchronously on the UI thread. Relinking is user-confirmed.

### Native process supervision
Rust starts FFmpeg as a child process, parses progress, handles cancellation, captures bounded diagnostic output, and cleans temporary files. Never shell-concatenate user-controlled paths into a command string; pass arguments separately.

### Preview strategy
Start with native decoding/playback integration chosen after a macOS proof of concept. Keep preview abstraction separate from export. Do not assume FFmpeg CLI alone provides a low-latency interactive timeline preview.

## 4. Module boundaries
- `src/app`: app shell, routing, global state.
- `src/features/projects`: create/open/save/recovery UI.
- `src/features/media`: import, bin, metadata, relink.
- `src/features/editor-simple`: quick editing UI only.
- `src/features/editor-pro`: detailed editing UI only.
- `src/editor-core`: canonical project state, commands, undo/redo, selection.
- `src/timeline`: timeline math and view models.
- `src/preview`: preview controller and renderer adapter.
- `src-tauri/src/project`: project serialization and atomic save.
- `src-tauri/src/media`: probing, thumbnails, waveforms, cache.
- `src-tauri/src/export`: job queue, FFmpeg process supervisor, output validation.
- `src-tauri/binaries`: platform-specific bundled executables, added only after license/build pipeline is defined.

## 5. Security and privacy
- Restrict filesystem access to user-selected paths and app-managed directories.
- Validate all project files before use; treat project JSON as untrusted input.
- Keep Tauri capabilities minimal and explicit.
- No remote telemetry by default.
- Optional network features must be separately permissioned and clearly identified.

## 6. Packaging and licensing
- Build platform-specific FFmpeg binaries; do not assume one binary can be used on every OS/architecture.
- Record FFmpeg version, build configuration, enabled codecs, and license obligations.
- Review LGPL/GPL implications of selected build flags and distribution method before shipping.
- Validate hardware-accelerated paths on the actual Mac hardware; keep a software fallback where feasible.
