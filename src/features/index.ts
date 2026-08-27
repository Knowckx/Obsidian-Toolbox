import type { ToolboxFeature } from '../core/feature';
import { cleanPasteFeature } from './clean-paste';

export const FEATURES = [
	cleanPasteFeature,
] as const satisfies readonly ToolboxFeature[];
