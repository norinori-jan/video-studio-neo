# Implementation status — Video Studio Neo

## 0.2.0
- Added multi-file import for common video, audio, and image formats.
- Added file type, MIME type, file size, and last-modified metadata to the project asset model.
- Added session-only browser preview for imported video, audio, and image assets.
- Existing project JSON files remain compatible because the new metadata fields are optional.

## Limitations
- Browser object URLs are temporary and are not stored in project JSON. Re-import source media after reopening a project.
- Media is referenced, not copied into a managed project folder.
- No ffprobe/native media probing, thumbnails, timeline clip insertion, trim/split, or export yet.
- This release has not been built or tested in the user's environment.
