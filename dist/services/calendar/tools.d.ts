/**
 * Calendar tool definitions.
 * 5 tools: list_events, create_event, update_event, delete_event, find_next_meeting
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
export declare function buildCalendarTools(config: ResolvedWorkspaceConfig): ToolDefinition[];
export {};
//# sourceMappingURL=tools.d.ts.map