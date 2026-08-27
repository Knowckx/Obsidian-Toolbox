import type { ToolboxFeature } from '../../core/feature';
import { registerHelloWorldCommand } from './command';

export const HELLO_WORLD_FEATURE_ID = 'hello-world';

export const helloWorldFeature = {
	id: HELLO_WORLD_FEATURE_ID,
	register: ({ plugin }) => registerHelloWorldCommand(plugin),
} satisfies ToolboxFeature;
