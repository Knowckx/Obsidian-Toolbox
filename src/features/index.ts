import type { ToolboxFeature } from '../core/feature';
import { cleanPasteFeature } from './clean-paste';
import { helloWorldFeature } from './hello-world';

export const FEATURES = [
	helloWorldFeature,
	cleanPasteFeature,
] as const satisfies readonly ToolboxFeature[];
