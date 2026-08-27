import { Notice, type Plugin } from 'obsidian';
import { HELLO_MESSAGE } from './message';

export const SHOW_HELLO_MESSAGE_COMMAND_ID = 'show-hello-message';

export function registerHelloWorldCommand(plugin: Plugin): void {
	plugin.addCommand({
		id: SHOW_HELLO_MESSAGE_COMMAND_ID,
		name: 'Show hello message',
		callback: () => {
			new Notice(HELLO_MESSAGE);
		},
	});
}
