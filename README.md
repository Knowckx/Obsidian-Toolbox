# Obsidian Toolbox

Obsidian Toolbox is a collection of small, local-first editing tools for Obsidian.

## Features

### Clean paste

Use **Clean paste** to read clipboard content, convert HTML to Markdown when available, normalize Markdown whitespace, and insert the result at the current selection.

- Command ID: `clean-paste`
- No default hotkey is assigned; assign one in **Settings → Hotkeys** if needed.
- Ordinary paste is not intercepted.
- Markdown fenced code blocks and structural formatting are preserved.

HTML-specific cleanup rules are not implemented yet; HTML is currently passed directly to Obsidian's Markdown converter.

### Transpose Markdown table

Place the cursor inside a Markdown table and run **Transpose Markdown table**. The plugin locates the complete table, transposes its entire cell matrix, and replaces it in place.

```text
M rows × N columns → N rows × M columns
```

The Markdown separator row is syntax rather than table data. It is removed before the transpose and regenerated afterward. Column alignment is reset to the neutral `---` form because the original column alignment cannot be mapped unambiguously after transposition.

- Command ID: `transpose-markdown-table`
- Default hotkey: none
- Supported in source mode and Live Preview.
- Unescaped `|` characters delimit cells; use `\|` for a pipe inside a cell.
- Missing cells in irregular data rows are padded with empty cells.

Example:

```markdown
| A | B | C |
| --- | --- | --- |
| 1 | 2 | 3 |
| 4 | 5 | 6 |
```

becomes:

```markdown
| A | 1 | 4 |
| --- | --- | --- |
| B | 2 | 5 |
| C | 3 | 6 |
```

### Hello World

The **Show hello message** command displays a simple Obsidian Notice. It is retained as a minimal feature-module example.

## Development

Requirements:

- Node.js 22.13 or later
- pnpm 11.24.0

Install dependencies:

```powershell
pnpm install --frozen-lockfile
```

Start the watch build:

```powershell
pnpm dev
```

Create a production build:

```powershell
pnpm build
```

Run lint checks:

```powershell
pnpm lint
```

The production bundle is generated as `main.js` in the project root.

## Manual installation

Copy the release artifacts into your vault:

```text
<Vault>/.obsidian/plugins/obsidian-toolbox/
├─ main.js
├─ manifest.json
└─ styles.css  (if present)
```

Reload Obsidian, then enable the plugin under **Settings → Community plugins**.

## Privacy

The plugin operates locally. It does not include telemetry or transmit vault content to external services.

See [the feature status checklist](.ai.doc/功能状态清单.md) for implementation progress and known issues.
