import { htmlToMarkdown, Notice, type Editor, type Plugin } from 'obsidian';
import { readClipboardContent, type ClipboardContent } from './clipboard';
import { cleanHtml } from './transform-html';
import { cleanMarkdown } from './transform-markdown';

export const CLEAN_PASTE_COMMAND_ID = 'clean-paste';

export function registerCleanPasteCommand(plugin: Plugin): void {
	plugin.addCommand({
		id: CLEAN_PASTE_COMMAND_ID,
		name: 'Clean paste',
		hotkeys: [
			{
				modifiers: ['Mod', 'Shift'],
				key: 'V',
			},
		],
		editorCallback: async (editor) => executeCleanPaste(editor),
	});
}

async function executeCleanPaste(editor: Editor): Promise<void> {
	try {
		const clipboardContent = await readClipboardContent();
		const markdown = convertClipboardContent(clipboardContent);

		if (markdown === null || markdown.length === 0) {
			new Notice('Clipboard does not contain pasteable text.');
			return;
		}

		editor.replaceSelection(markdown);
	} catch {
		new Notice('Unable to read the clipboard.');
	}
}

function convertClipboardContent(content: ClipboardContent): string | null {
	if (content.html !== null && content.html.length > 0) {
		const html = cleanHtml(content.html);
		return cleanMarkdown(htmlToMarkdown(html));
	}

	if (content.plainText !== null && content.plainText.length > 0) {
		return cleanMarkdown(content.plainText);
	}

	return null;
}
