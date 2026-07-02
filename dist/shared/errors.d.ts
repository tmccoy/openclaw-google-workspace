/**
 * Domain error classes for the Google Workspace plugin.
 * Mirrors the error hierarchy from the Calendar plugin, generalized for all services.
 */
export declare class PluginConfigurationError extends Error {
    constructor(message: string);
}
export declare class AuthenticationRequiredError extends Error {
    readonly authUrl?: string;
    constructor(message: string, authUrl?: string);
}
export declare class ReadOnlyModeError extends Error {
    readonly service: string;
    constructor(service: string, action: string);
}
export declare class ServiceNotEnabledError extends Error {
    readonly service: string;
    constructor(service: string);
}
export declare class ExternalServiceError extends Error {
    readonly statusCode?: number;
    readonly service: string;
    constructor(service: string, message: string, statusCode?: number);
}
export declare class ResourceNotFoundError extends Error {
    readonly resource: string;
    constructor(resource: string, identifier: string);
}
export declare class ValidationError extends Error {
    readonly field?: string;
    constructor(message: string, field?: string);
}
//# sourceMappingURL=errors.d.ts.map