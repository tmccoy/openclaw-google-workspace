/**
 * Drive tool definitions.
 * 4 tools: list_files, read_file, search, create_file
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
export declare function buildDriveTools(config: ResolvedWorkspaceConfig): ToolDefinition[];
export {};
//# sourceMappingURL=tools.d.ts.map