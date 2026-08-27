import type { Plugin } from 'obsidian';

export interface FeatureContext {
	plugin: Plugin;
}

export interface ToolboxFeature {
	id: string;
	register?(context: FeatureContext): Promise<void> | void;
}
