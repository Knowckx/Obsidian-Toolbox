# MD Toolbox

Transpose Markdown tables directly in Obsidian.

## Usage

1. Place the cursor anywhere inside a Markdown table.
2. Open the command palette and select **Transpose Markdown table**.

For example:

| A | B | C |
| --- | --- | --- |
| 1 | 2 | 3 |
| 4 | 5 | 6 |

becomes:

| A | 1 | 4 |
| --- | --- | --- |
| B | 2 | 5 |
| C | 3 | 6 |

The command works in source mode and Live Preview. After transposition, column alignment is reset to the default Markdown alignment. Missing cells in uneven rows are left empty.

## Manual installation

Install dependencies and build the plugin:

```text
pnpm install
pnpm build
```

Then copy the generated `main.js` and `manifest.json` into:

```text
<Vault>/.obsidian/plugins/ob-toolbox/
```

Reload Obsidian, then enable the plugin under **Settings → Community plugins**.

## Privacy

MD Toolbox works entirely locally. It does not collect analytics or send vault content to external services.
