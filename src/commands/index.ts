import type { PluginRegistration } from '../utils/types';

const commandRegistrations: readonly PluginRegistration[] = [];

export function registerCommands(plugin: Parameters<PluginRegistration>[0]): void {
	for (const register of commandRegistrations) {
		register(plugin);
	}
}
