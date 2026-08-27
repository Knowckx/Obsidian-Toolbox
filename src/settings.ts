import type { Plugin } from 'obsidian';

export async function loadSettings<T extends object>(
	plugin: Plugin,
	defaults: T,
): Promise<T> {
	const savedSettings = (await plugin.loadData()) as Partial<T> | null;
	return Object.assign({}, defaults, savedSettings);
}

export async function saveSettings<T extends object>(
	plugin: Plugin,
	settings: T,
): Promise<void> {
	await plugin.saveData(settings);
}
