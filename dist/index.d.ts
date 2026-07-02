/**
 * OpenClaw Google Workspace Plugin — Entry Point
 *
 * Registers auth tools (always) and service-specific tools (conditionally)
 * based on which services are enabled in the plugin config.
 */
declare const _default: {
    id: string;
    name: string;
    description: string;
    configSchema: import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginConfigSchema;
    register: NonNullable<import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginDefinition["register"]>;
} & Pick<import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginDefinition, "kind">;
export default _default;
//# sourceMappingURL=index.d.ts.map