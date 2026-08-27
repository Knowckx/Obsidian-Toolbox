import type { PluginRegistration } from '../utils/types';

const uiRegistrations: readonly PluginRegistration[] = [];

export function registerUi(plugin: Parameters<PluginRegistration>[0]): void {
	for (const register of uiRegistrations) {
		register(plugin);
	}
}
