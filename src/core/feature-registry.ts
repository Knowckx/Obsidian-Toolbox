import type { Plugin } from 'obsidian';
import type { FeatureContext, ToolboxFeature } from './feature';

export async function registerFeatures(
	plugin: Plugin,
	features: readonly ToolboxFeature[],
): Promise<void> {
	const registeredFeatureIds = new Set<string>();
	const context: FeatureContext = { plugin };

	for (const feature of features) {
		if (registeredFeatureIds.has(feature.id)) {
			throw new Error(`Duplicate feature ID: ${feature.id}`);
		}

		registeredFeatureIds.add(feature.id);
		await feature.register?.(context);
	}
}
