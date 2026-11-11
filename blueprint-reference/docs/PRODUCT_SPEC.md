# Product Specification — Video Studio v1

## 1. Product goal
Create a local-first desktop video editor that supports both quick editing and detailed editing without splitting work into separate applications. A user can begin in Simple mode and continue the same project in Professional mode without losing edits.

## 2. Product principles
1. **Local by default:** source media, project state, caches, previews, and exports remain on the user's Mac unless the user explicitly chooses otherwise.
2. **Offline core:** project creation, import, editing, preview, save, and export must not require an account, cloud service, or CDN.
3. **One editing model:** Simple and Professional modes are two interfaces over one timeline/project model.
4. **Non-destructive editing:** source files are not overwritten. Edits are stored as project instructions.
5. **Recoverability:** autosave, crash recovery, and clear media relinking are first-class requirements.
6. **Progressive complexity:** simple tasks stay simple; advanced controls are available without forcing them into the quick workflow.

## 3. Target platform
- Initial target: Apple Silicon macOS desktop, packaged as a signed/notarized native application when distribution is prepared.
- Development should remain portable enough to run automated tests on Windows where practical, but macOS is the release target.
- Do not hard-code a specific Apple chip generation or assume today's model will still be current when the user purchases a MacBook Pro.

## 4. Application areas
### 4.1 Home / Project Manager
- Create project, open project, open recent project.
- Show project name, last-opened time, and missing-media status.
- Import media into a project-managed media folder or link to files in place.
- Provide an explicit choice between copying media into the project and referencing original locations.
- Show export history and reveal output in Finder.

### 4.2 Simple mode
- Add and reorder video clips.
- Trim clip start/end and split at playhead.
- Basic crop/fit/fill and aspect-ratio presets.
- Add text/captions with basic styling.
- Add background music, adjust volume, fade in/out, and mute source audio.
- Apply a small, curated set of transitions and visual presets.
- Export using common presets (for example 1080p MP4); actual options depend on available local encoders.

### 4.3 Professional mode
- Multi-track video, audio, and title/subtitle timeline.
- Frame/timecode-aware trimming, splitting, snapping, and track locking/muting/soloing.
- Clip transforms and opacity; keyframes for supported properties.
- Audio gain, fades, track mixing, and basic automation.
- Color controls and effect stack with enable/disable and ordering.
- Transitions with editable duration and parameters.
- Detailed export settings, subject to validated encoder support.

### 4.4 Shared preview and timeline
- One canonical timeline model shared by both modes.
- Preview must reflect project state and selected time accurately.
- Playback may use proxy/preview media for responsiveness, while export uses source media unless the user chooses otherwise.
- Timeline timebase must be rational (numerator/denominator), not a floating-point FPS assumption.

## 5. Project and media behavior
- Project file is portable JSON with a versioned schema.
- Media references use project-relative paths when media is copied into the project; external references store a path plus a stable media identity and can be relinked.
- Project save must be atomic (write temporary file, flush, then replace).
- Autosave snapshots are separate from the main project file.
- Never silently discard unavailable media or unsupported effects. Show a clear warning and preserve the project data.

## 6. Local AI (optional)
Potential opt-in features:
- Speech transcription and subtitle draft generation using a locally installed/downloaded model.
- Subtitle translation only if a local model is available, or if the user explicitly chooses a remote provider.
- Scene/shot suggestions as an optional assistive feature.

Constraints:
- Core editing cannot depend on AI.
- Model download is an explicit action; show model size, storage requirement, and whether network access is needed.
- No media is uploaded to a remote service by default.
- AI-generated results are editable suggestions, never destructive changes.

## 7. v1 scope boundaries
### Included in v1
- Native desktop shell and local project manager.
- Create/open/save projects and autosave/recovery foundation.
- Import common video/audio/image formats supported by the chosen FFmpeg build.
- Media bin with metadata and missing-media handling.
- Shared timeline model and preview playback.
- Simple mode: arrange, trim, split, titles, BGM, basic fades, basic export preset.
- Professional mode foundation: multiple tracks, timebase-aware editing, track controls, basic keyframes.
- Local export pipeline with progress, cancellation, and error reporting.

### Deferred until after the foundation is stable
- Full advanced color grading, compositing, motion graphics, multicam, collaboration, cloud sync, mobile companion, plugin marketplace, and broad third-party plugin support.
- AI transcription is a separately gated milestone, not a prerequisite for v1 editing.

## 8. Non-functional requirements
- No mandatory network calls during core editing.
- No CDN-loaded runtime dependencies in the packaged application.
- Long media operations must be cancellable and report progress.
- UI must remain responsive during import, waveform generation, thumbnail generation, and export.
- Resource use must be bounded; proxy/cache cleanup controls are required.
- Logs must avoid recording private media contents or unnecessary absolute paths.
- Accessibility: keyboard navigation, visible focus, scalable UI, and clear status messages.

## 9. Acceptance gates
A milestone is not considered complete until it is tested on a real supported macOS environment. A successful code generation or Windows-side static check is not equivalent to a working Mac build.
