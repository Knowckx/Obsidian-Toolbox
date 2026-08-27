import { Notice, type Editor, type Plugin } from 'obsidian';
import { findMarkdownTableAtLine } from './table-range';
import { transposeMarkdownTable } from './transform';

export const TRANSPOSE_TABLE_COMMAND_ID = 'transpose-markdown-table';

export function registerTransposeTableCommand(plugin: Plugin): void {
	plugin.addCommand({
		id: TRANSPOSE_TABLE_COMMAND_ID,
		name: 'Transpose Markdown table',
		editorCallback: (editor) => executeTransposeTable(editor),
	});
}

function executeTransposeTable(editor: Editor): void {
	const tableRange = findMarkdownTableAtLine(
		Array.from({ length: editor.lineCount() }, (_, line) => editor.getLine(line)),
		editor.getCursor().line,
	);

	if (tableRange === null) {
		new Notice('No Markdown table found at the current position.');
		return;
	}

	editor.setSelection(
		{ line: tableRange.fromLine, ch: 0 },
		{ line: tableRange.toLine, ch: editor.getLine(tableRange.toLine).length },
	);

	const transposedTable = transposeMarkdownTable(editor.getSelection());

	if (transposedTable === null) {
		return;
	}

	editor.replaceSelection(transposedTable);
}
