/**
 * Shared OAuth2 authentication service for all Google Workspace services.
 * Single credential file, single token file, scopes computed from enabled services.
 *
 * Adapted from the Calendar plugin's google-calendar-auth.ts, generalized for multi-service use.
 */
import type { OAuth2Client } from "google-auth-library";
import type { ResolvedWorkspaceConfig } from "../config/schema.js";
export declare function getRequiredScopes(config: ResolvedWorkspaceConfig): string[];
export interface AuthorizationRequest {
    url: string;
    scopes: string[];
    enabledServices: string[];
}
export interface GoogleWorkspaceAuthService {
    createAuthorizationUrl(): Promise<AuthorizationRequest>;
    exchangeCodeForToken(code: string): Promise<void>;
    hasStoredToken(): Promise<boolean>;
    createAuthenticatedClient(): Promise<OAuth2Client>;
    getRequiredScopes(): string[];
    getEnabledServices(): string[];
    checkScopeGaps(): Promise<{
        authorized: string[];
        missing: string[];
    } | null>;
}
export declare function createAuthService(config: ResolvedWorkspaceConfig): GoogleWorkspaceAuthService;
//# sourceMappingURL=google-auth.d.ts.map