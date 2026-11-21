# Next implementation backlog

## 0.5.x
- Project metadata is persisted; implement safe project schema versioning and migrations.
- Add media relinking by file selection, using stable metadata checks (name, size, MIME, duration).
- Add save/load/relink integration tests.
- Harden timeline operations with frame-based timing and invariant tests.

## 0.6.x
1. Tauri 2 + Rust file dialogs, persistent media folder, SQLite, autosave.
2. FFmpeg/ffprobe integration, thumbnails, waveforms, proxy media.
3. Drag trim handles, snapping, ripple edits, linked A/V, frame-accurate undo commands.
4. Multi-track video compositing, audio mixing, transitions, keyframes, color correction.
5. Export profiles, progress/cancel, error recovery, packaging and signing.

## Known prototype limitations
- Media binary data is not embedded in project JSON.
- Browser object URLs are session-scoped and intentionally excluded from saved project files.
- Media relinking is not implemented yet.
- The experimental browser capture exports only the currently active video element as WebM; it is not a full timeline render.
