export function transposeMarkdownTable(markdown: string): string | null {
	const lineEnding = markdown.includes('\r\n') ? '\r\n' : '\n';
	const trailingLineEnding = markdown.endsWith(lineEnding) ? lineEnding : '';
	const content = trailingLineEnding.length > 0
		? markdown.slice(0, -trailingLineEnding.length)
		: markdown;
	const lines = content.replace(/\r\n?/g, '\n').split('\n');

	if (lines.length < 2 || lines.some((line) => line.trim().length === 0)) {
		return null;
	}

	const parsedRows = lines.map(parseTableRow);

	if (parsedRows.some((row) => row === null)) {
		return null;
	}

	const rows = parsedRows as string[][];
	const header = rows[0];
	const separator = rows[1];

	if (
		header === undefined ||
		separator === undefined ||
		separator.length !== header.length ||
		separator.some((cell) => !/^:?-{3,}:?$/.test(cell))
	) {
		return null;
	}

	const contentRows = [header, ...rows.slice(2)];
	const columnCount = Math.max(...contentRows.map((row) => row.length));
	const transposedRows = Array.from({ length: columnCount }, (_, columnIndex) =>
		contentRows.map((row) => row[columnIndex] ?? ''),
	);
	const firstTransposedRow = transposedRows[0];

	if (firstTransposedRow === undefined) {
		return null;
	}

	const outputSeparator = Array.from(
		{ length: contentRows.length },
		() => '---',
	);
	const outputRows = [firstTransposedRow, outputSeparator, ...transposedRows.slice(1)];

	return outputRows.map(formatTableRow).join(lineEnding) + trailingLineEnding;
}

function parseTableRow(line: string): string[] | null {
	let row = line.trim();

	if (!hasUnescapedPipe(row)) {
		return null;
	}

	if (row.startsWith('|')) {
		row = row.slice(1);
	}

	if (row.endsWith('|') && !isEscaped(row, row.length - 1)) {
		row = row.slice(0, -1);
	}

	const cells: string[] = [];
	let cellStart = 0;

	for (let index = 0; index < row.length; index += 1) {
		if (row[index] === '|' && !isEscaped(row, index)) {
			cells.push(row.slice(cellStart, index).trim());
			cellStart = index + 1;
		}
	}

	cells.push(row.slice(cellStart).trim());
	return cells;
}

function hasUnescapedPipe(line: string): boolean {
	for (let index = 0; index < line.length; index += 1) {
		if (line[index] === '|' && !isEscaped(line, index)) {
			return true;
		}
	}

	return false;
}

function isEscaped(value: string, index: number): boolean {
	let slashCount = 0;

	for (let cursor = index - 1; cursor >= 0 && value[cursor] === '\\'; cursor -= 1) {
		slashCount += 1;
	}

	return slashCount % 2 === 1;
}
function formatTableRow(cells: string[]): string {
	return `| ${cells.join(' | ')} |`;
}
