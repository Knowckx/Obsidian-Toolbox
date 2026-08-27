import { transposeMarkdownTable } from './transform';

export interface MarkdownTableRange {
	fromLine: number;
	toLine: number;
	markdown: string;
}

export function findMarkdownTableAtLine(
	lines: readonly string[],
	cursorLine: number,
): MarkdownTableRange | null {
	for (const candidateLine of [cursorLine, cursorLine - 1, cursorLine + 1]) {
		const tableRange = findMarkdownTableContainingLine(lines, candidateLine);

		if (tableRange !== null) {
			return tableRange;
		}
	}

	return null;
}

function findMarkdownTableContainingLine(
	lines: readonly string[],
	targetLine: number,
): MarkdownTableRange | null {
	if (!isPotentialTableRow(lines[targetLine])) {
		return null;
	}

	let blockStart = targetLine;
	let blockEnd = targetLine;

	while (blockStart > 0 && isPotentialTableRow(lines[blockStart - 1])) {
		blockStart -= 1;
	}

	while (
		blockEnd < lines.length - 1 &&
		isPotentialTableRow(lines[blockEnd + 1])
	) {
		blockEnd += 1;
	}

	for (let separatorLine = blockStart + 1; separatorLine <= blockEnd; separatorLine += 1) {
		const headerLine = separatorLine - 1;

		if (targetLine < headerLine) {
			continue;
		}

		const markdown = lines.slice(headerLine, blockEnd + 1).join('\n');

		if (transposeMarkdownTable(markdown) !== null) {
			return {
				fromLine: headerLine,
				toLine: blockEnd,
				markdown,
			};
		}
	}

	return null;
}

function isPotentialTableRow(line: string | undefined): boolean {
	return line !== undefined && line.trim().length > 0 && line.includes('|');
}
