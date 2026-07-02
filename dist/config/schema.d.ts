/**
 * Plugin configuration types, defaults, and resolution with environment variable overrides.
 * Follows the pattern from the Calendar plugin's runtime-config.ts.
 */
export interface GmailServiceConfig {
    enabled: boolean;
    readOnly: boolean;
    maxSearchResults: number;
}
export interface CalendarServiceConfig {
    enabled: boolean;
    readOnly: boolean;
    defaultCalendarId: string;
    defaultTimeZone?: string;
    upcomingWindowDays: number;
}
export interface DriveServiceConfig {
    enabled: boolean;
    readOnly: boolean;
    maxSearchResults: number;
}
export interface ContactsServiceConfig {
    enabled: boolean;
    maxSearchResults: number;
}
export interface TasksServiceConfig {
    enabled: boolean;
}
export interface SheetsServiceConfig {
    enabled: boolean;
    readOnly: boolean;
}
export interface ServiceConfigMap {
    gmail: GmailServiceConfig;
    calendar: CalendarServiceConfig;
    drive: DriveServiceConfig;
    contacts: ContactsServiceConfig;
    tasks: TasksServiceConfig;
    sheets: SheetsServiceConfig;
}
export interface WorkspacePluginConfig {
    credentialsPath?: string;
    tokenPath?: string;
    oauthRedirectUri?: string;
    services?: {
        gmail?: Partial<GmailServiceConfig>;
        calendar?: Partial<CalendarServiceConfig>;
        drive?: Partial<DriveServiceConfig>;
        contacts?: Partial<ContactsServiceConfig>;
        tasks?: Partial<TasksServiceConfig>;
        sheets?: Partial<SheetsServiceConfig>;
    };
}
export interface ResolvedWorkspaceConfig {
    credentialsPath?: string;
    tokenPath?: string;
    oauthRedirectUri?: string;
    services: ServiceConfigMap;
}
/**
 * Resolve plugin config from the OpenClaw plugin API.
 * Environment variables take priority over config file values.
 */
export declare function resolvePluginConfig(api: {
    pluginConfig?: unknown;
}): ResolvedWorkspaceConfig;
//# sourceMappingURL=schema.d.ts.map