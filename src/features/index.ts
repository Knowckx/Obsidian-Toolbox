import type { ToolboxFeature } from '../core/feature';
import { cleanPasteFeature } from './clean-paste';
import { helloWorldFeature } from './hello-world';
import { transposeTableFeature } from './transpose-table';

export const FEATURES = [
	helloWorldFeature,
	cleanPasteFeature,
	transposeTableFeature,
] as const satisfies readonly ToolboxFeature[];
