/**
 * Domain error classes for the Google Workspace plugin.
 * Mirrors the error hierarchy from the Calendar plugin, generalized for all services.
 */
export class PluginConfigurationError extends Error {
    constructor(message) {
        super(message);
        this.name = "PluginConfigurationError";
    }
}
export class AuthenticationRequiredError extends Error {
    authUrl;
    constructor(message, authUrl) {
        super(message);
        this.name = "AuthenticationRequiredError";
        this.authUrl = authUrl;
    }
}
export class ReadOnlyModeError extends Error {
    service;
    constructor(service, action) {
        super(`Cannot ${action}: ${service} is configured in read-only mode. ` +
            `Set services.${service}.readOnly to false in the plugin config to enable write operations.`);
        this.name = "ReadOnlyModeError";
        this.service = service;
    }
}
export class ServiceNotEnabledError extends Error {
    service;
    constructor(service) {
        super(`The ${service} service is not enabled. ` +
            `Set services.${service}.enabled to true in the plugin config.`);
        this.name = "ServiceNotEnabledError";
        this.service = service;
    }
}
export class ExternalServiceError extends Error {
    statusCode;
    service;
    constructor(service, message, statusCode) {
        super(message);
        this.name = "ExternalServiceError";
        this.service = service;
        this.statusCode = statusCode;
    }
}
export class ResourceNotFoundError extends Error {
    resource;
    constructor(resource, identifier) {
        super(`${resource} not found: ${identifier}`);
        this.name = "ResourceNotFoundError";
        this.resource = resource;
    }
}
export class ValidationError extends Error {
    field;
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}
//# sourceMappingURL=errors.js.map