# ADR-001: Proposed Desktop Stack

- Status: Proposed; requires a macOS proof of concept.
- Decision candidate: Tauri 2 + React/TypeScript + Rust, with local FFmpeg/ffprobe and SQLite metadata.

## Context
The product must be a Mac desktop editor with local file access, background media jobs, a shared editing model, and no mandatory cloud dependency.

## Why this candidate
- React/TypeScript supports a complex editor UI and reusable Simple/Professional surfaces.
- Rust provides native filesystem/process boundaries and predictable job supervision.
- Tauri offers a smaller native shell than bundling a full browser runtime.
- FFmpeg provides a broad local media-processing foundation.

## Risks / unresolved proofs
- Interactive preview and scrubbing are not solved merely by invoking FFmpeg CLI.
- FFmpeg codec availability and license obligations depend on the exact build configuration.
- Large media, high-resolution timelines, and multiple tracks need profiling on the actual Mac.
- Tauri permissions and media-path handling require security review.

## Consequences
Proceed with architecture and a small technical proof, but do not commit to a final preview engine or encoder feature matrix until measured on macOS.
