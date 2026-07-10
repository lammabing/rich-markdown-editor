# Changelog

## [Unreleased]

### Added
- GitHub social preview banner image
- Repository metadata in package.json
- GitHub repository configuration

### Changed
- Updated README with banner image and refined title
- Cleaned up leftover agent artifact files

## [0.0.0] - Initial Development

### Added
- Real-time markdown rendering with TipTap/ProseMirror
- Slash command palette for inserting elements
- GFM support: tables, task lists, strikethrough, autolinks
- Text formatting: underline, highlight, colored text (8 colors)
- Math/LaTeX support: inline and block equations via KaTeX
- CriticMarkup: deletion, insertion, highlight
- Content blocks: alerts/callouts (5 types), emoji picker, HTML blocks, footnotes
- Syntax-highlighted code blocks (multiple languages via lowlight)
- File operations: save as Markdown, open .md files, export HTML, print
- Autosave with localStorage draft recovery (all browsers)
- File System Access API autosave (Chrome/Edge)
- Google Font selection dropdown in toolbar
- WSL2 mirrored network configuration support
- Browser extension warning on startup (DarkReader compatibility)

### Changed
- Default font to Inter with refined font sizes
- Debouncing for WSL/Windows browser performance
- Stabilized onChange callback to prevent unnecessary re-renders

### Fixed
- Blank page issues with math content
- Block math equation rendering
- Tooltip positioning (show below buttons)
- Debouncing to avoid content loss on fast typing
- WSL2-to-Windows browser performance (3-5x improvement)
- Numbered list round-trip conversion
- Debug logging overhead removal
