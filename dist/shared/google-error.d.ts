/**
 * Normalize Google API errors into domain errors.
 * Adapted from the Calendar plugin's google-calendar-error.ts, generalized for all services.
 */
/**
 * Normalize a caught error from any Google API call into a domain error.
 *
 * @param error - The caught error
 * @param service - Service name for context (e.g., "Gmail", "Calendar")
 * @param action - What was being attempted (e.g., "search messages", "create event")
 */
export declare function normalizeGoogleError(error: unknown, service: string, action: string): Error;
//# sourceMappingURL=google-error.d.ts.map