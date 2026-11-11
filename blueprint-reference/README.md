# Video Studio — New Local-First Desktop App

This repository is a clean-slate design baseline for Video Studio. It is **not** a patch or repackaging of the uploaded browser app.

## Product direction
- One application with Simple and Professional editing modes.
- Both modes operate on the same project, media, timeline, preview, and export model.
- Editing and export work locally on the Mac. Network access is not required for core workflows.
- Optional AI features may use local models; cloud AI is never required for ordinary editing.
- Target platform: Apple Silicon MacBook Pro. Hardware-specific optimization is deferred until the actual Mac is selected.

## Documents
- `docs/PRODUCT_SPEC.md` — v1 scope and user-facing behavior.
- `docs/ARCHITECTURE.md` — proposed technical architecture and module boundaries.
- `docs/ROADMAP.md` — staged implementation plan and acceptance gates.
- `schemas/project-v1.schema.json` — initial project-file validation schema.
- `decisions/ADR-001-desktop-stack.md` — proposed stack and trade-offs.

## Status
Design baseline only. No application build has been produced or tested yet. The first implementation milestone is the native shell, project lifecycle, media import, and a local playback/preview path. Export is added only after timeline semantics and media handling are tested.
