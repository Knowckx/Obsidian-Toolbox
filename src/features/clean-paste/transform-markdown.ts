export function cleanMarkdown(markdown: string): string {
	const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
	const cleanedLines: string[] = [];
	let activeFence: MarkdownFence | null = null;
	let hasPendingBlankLine = false;

	for (const line of lines) {
		if (activeFence !== null) {
			cleanedLines.push(line);

			if (isClosingFence(line, activeFence)) {
				activeFence = null;
			}

			continue;
		}

		const openingFence = getOpeningFence(line);

		if (openingFence !== null) {
			appendPendingBlankLine(cleanedLines, hasPendingBlankLine);
			hasPendingBlankLine = false;
			cleanedLines.push(line);
			activeFence = openingFence;
			continue;
		}

		if (line.trim().length === 0) {
			hasPendingBlankLine = cleanedLines.length > 0;
			continue;
		}

		appendPendingBlankLine(cleanedLines, hasPendingBlankLine);
		hasPendingBlankLine = false;
		cleanedLines.push(line);
	}

	return cleanedLines.join('\n');
}

interface MarkdownFence {
	character: '`' | '~';
	length: number;
}

function appendPendingBlankLine(lines: string[], pending: boolean): void {
	if (pending && lines.length > 0) {
		lines.push('');
	}
}

function getOpeningFence(line: string): MarkdownFence | null {
	const match = /^[ \t]{0,3}(`{3,}|~{3,})/.exec(line);
	const marker = match?.[1];

	if (marker === undefined) {
		return null;
	}

	const character = marker[0];

	if (character !== '`' && character !== '~') {
		return null;
	}

	return {
		character,
		length: marker.length,
	};
}

function isClosingFence(line: string, fence: MarkdownFence): boolean {
	const match = /^[ \t]{0,3}(`{3,}|~{3,})[ \t]*$/.exec(line);
	const marker = match?.[1];

	return (
		marker !== undefined &&
		marker[0] === fence.character &&
		marker.length >= fence.length
	);
}
