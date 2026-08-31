# OB Toolbox

OB Toolbox provides a local-first Markdown table transpose command for Obsidian.

## Transpose Markdown table

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
<Vault>/.obsidian/plugins/ob-toolbox/
├─ main.js
├─ manifest.json
└─ styles.css  (if present)
```

Reload Obsidian, then enable the plugin under **Settings → Community plugins**.

## Privacy

The plugin operates locally. It does not include telemetry or transmit vault content to external services.
