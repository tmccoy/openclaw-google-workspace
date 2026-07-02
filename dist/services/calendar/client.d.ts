/**
 * Google Calendar API client wrapper.
 */
import type { OAuth2Client } from "google-auth-library";
export interface CalendarEvent {
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
}
export interface CreateEventParams {
    summary: string;
    start: {
        dateTime?: string;
        date?: string;
        timeZone?: string;
    };
    end?: {
        dateTime?: string;
        date?: string;
        timeZone?: string;
    };
    location?: string;
    description?: string;
    attendees?: string[];
}
export interface UpdateEventParams {
    eventId: string;
    summary?: string;
    start?: {
        dateTime?: string;
        date?: string;
        timeZone?: string;
    };
    end?: {
        dateTime?: string;
        date?: string;
        timeZone?: string;
    };
    location?: string;
    description?: string;
}
export interface CalendarClient {
    listEvents(calendarId: string, timeMin: string, timeMax: string, maxResults: number): Promise<CalendarEvent[]>;
    createEvent(calendarId: string, params: CreateEventParams): Promise<CalendarEvent>;
    updateEvent(calendarId: string, params: UpdateEventParams): Promise<CalendarEvent>;
    deleteEvent(calendarId: string, eventId: string): Promise<void>;
    findNextMeeting(calendarId: string): Promise<CalendarEvent | null>;
}
export declare function createCalendarClient(auth: OAuth2Client): CalendarClient;
//# sourceMappingURL=client.d.ts.map