/**
 * Tasks tool definitions.
 * 3 tools: list, create, complete
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
export declare function buildTasksTools(config: ResolvedWorkspaceConfig): ToolDefinition[];
export {};
//# sourceMappingURL=tools.d.ts.map