const HTML_MIME_TYPE = 'text/html';
const TEXT_MIME_TYPE = 'text/plain';

export interface ClipboardContent {
	html: string | null;
	plainText: string | null;
}

export async function readClipboardContent(): Promise<ClipboardContent> {
	const clipboard = navigator.clipboard;

	if (typeof clipboard.read !== 'function') {
		return {
			html: null,
			plainText: await clipboard.readText(),
		};
	}

	const items = await clipboard.read();
	let html: string | null = null;
	let plainText: string | null = null;

	for (const item of items) {
		if (html === null && item.types.includes(HTML_MIME_TYPE)) {
			html = await readClipboardItem(item, HTML_MIME_TYPE);
		}

		if (plainText === null && item.types.includes(TEXT_MIME_TYPE)) {
			plainText = await readClipboardItem(item, TEXT_MIME_TYPE);
		}
	}

	return { html, plainText };
}

async function readClipboardItem(
	item: ClipboardItem,
	mimeType: string,
): Promise<string> {
	const blob = await item.getType(mimeType);
	return blob.text();
}
