/**
 * Contacts tool definitions.
 * 2 tools: search, get
 */
import type { ResolvedWorkspaceConfig } from "../../config/schema.js";
import { type ToolResult } from "../../shared/formatting.js";
interface ToolDefinition {
    name: string;
    label: string;
    description: string;
    parameters: Record<string, unknown>;
    execute: (toolCallId: string, params: Record<string, unknown>) => Promise<ToolResult>;
}
export declare function buildContactsTools(config: ResolvedWorkspaceConfig): ToolDefinition[];
export {};
//# sourceMappingURL=tools.d.ts.map