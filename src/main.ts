import { Plugin } from 'obsidian';
import { registerCommands } from './commands';
import { registerFeatures } from './core/feature-registry';
import { FEATURES } from './features';
import { registerUi } from './ui';

export default class ObToolboxPlugin extends Plugin {
	async onload(): Promise<void> {
		await registerFeatures(this, FEATURES);
		registerCommands(this);
		registerUi(this);
	}
}
