/**
 * Output formatting helpers for tool results.
 */
export interface ToolResult {
    content: Array<{
        type: "text";
        text: string;
    }>;
    details: unknown;
}
export declare function textResult(text: string): ToolResult;
export declare function errorResult(error: unknown): ToolResult;
export declare function formatEmailSummary(message: {
    id: string;
    threadId?: string;
    from?: string;
    to?: string;
    subject?: string;
    date?: string;
    snippet?: string;
    body?: string;
}): string;
export declare function formatEmailList(messages: Array<{
    id: string;
    from?: string;
    subject?: string;
    date?: string;
    snippet?: string;
}>): string;
export declare function formatEventDetails(event: {
    id?: string;
    summary?: string;
    start?: string;
    end?: string;
    location?: string;
    description?: string;
    status?: string;
    attendees?: Array<{
        email: string;
        responseStatus?: string;
    }>;
    htmlLink?: string;
}): string;
export declare function formatEventList(events: Array<{
    id?: string;
    summary?: string;
    start?: string;
    end?: string;
    location?: string;
}>): string;
export declare function formatFileInfo(file: {
    id?: string;
    name?: string;
    mimeType?: string;
    size?: string;
    modifiedTime?: string;
    webViewLink?: string;
    parents?: string[];
}): string;
export declare function formatFileList(files: Array<{
    id?: string;
    name?: string;
    mimeType?: string;
    modifiedTime?: string;
}>): string;
export declare function formatContactInfo(person: {
    resourceName?: string;
    displayName?: string;
    emails?: Array<{
        value: string;
    }>;
    phones?: Array<{
        value: string;
    }>;
    organizations?: Array<{
        name?: string;
        title?: string;
    }>;
}): string;
export declare function truncateBody(text: string, maxLength: number): string;
//# sourceMappingURL=formatting.d.ts.map