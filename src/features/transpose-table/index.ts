import type { ToolboxFeature } from '../../core/feature';
import {
	TRANSPOSE_TABLE_COMMAND_ID,
	registerTransposeTableCommand,
} from './command';

export const TRANSPOSE_TABLE_FEATURE_ID = TRANSPOSE_TABLE_COMMAND_ID;

export const transposeTableFeature = {
	id: TRANSPOSE_TABLE_FEATURE_ID,
	register: ({ plugin }) => registerTransposeTableCommand(plugin),
} satisfies ToolboxFeature;
