import { Plugin } from 'obsidian';
import { registerTransposeTableCommand } from './features/transpose-table/command';

export default class ObToolboxPlugin extends Plugin {
	onload(): void {
		registerTransposeTableCommand(this);
	}
}
