# Next implementation backlog

## 0.5.x
- Unify the editor's runtime model and the persisted project format.
- Add project migration/versioning and media relink support.
- Harden timeline operations with frame-based timing and invariant tests.

## 0.6.x
1. Tauri 2 + Rust file dialogs, persistent media folder, SQLite, autosave.
2. FFmpeg/ffprobe integration, thumbnails, waveforms, proxy media, relink.
3. Drag trim handles, snapping, ripple edits, linked A/V, frame-accurate undo commands.
4. Multi-track preview compositor and mixed audio playback.

## Later
5. Keyframes, transitions, transforms, color tools, captions/subtitle formats.
6. Native FFmpeg export presets, progress, cancel, validation and logs.
7. Offline fonts/assets, macOS signing/notarization, FFmpeg licensing notices.
