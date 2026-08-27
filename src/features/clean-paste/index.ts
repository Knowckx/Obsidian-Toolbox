import type { ToolboxFeature } from '../../core/feature';
import {
	CLEAN_PASTE_COMMAND_ID,
	registerCleanPasteCommand,
} from './command';

export const CLEAN_PASTE_FEATURE_ID = CLEAN_PASTE_COMMAND_ID;

export const cleanPasteFeature = {
	id: CLEAN_PASTE_FEATURE_ID,
	register: ({ plugin }) => registerCleanPasteCommand(plugin),
} satisfies ToolboxFeature;
