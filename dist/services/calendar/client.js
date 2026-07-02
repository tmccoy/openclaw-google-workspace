/**
 * Google Calendar API client wrapper.
 */
import { google } from "googleapis";
function formatEventDateTime(dt) {
    if (!dt)
        return undefined;
    return dt.dateTime ?? dt.date ?? undefined;
}
function toCalendarEvent(event) {
    return {
        id: event.id ?? undefined,
        summary: event.summary ?? undefined,
        start: formatEventDateTime(event.start),
        end: formatEventDateTime(event.end),
        location: event.location ?? undefined,
        description: event.description ?? undefined,
        status: event.status ?? undefined,
        attendees: event.attendees?.map((a) => ({
            email: a.email,
            responseStatus: a.responseStatus ?? undefined,
        })),
        htmlLink: event.htmlLink ?? undefined,
    };
}
export function createCalendarClient(auth) {
    const calendar = google.calendar({ version: "v3", auth });
    return {
        async listEvents(calendarId, timeMin, timeMax, maxResults) {
            const res = await calendar.events.list({
                calendarId,
                timeMin,
                timeMax,
                maxResults,
                singleEvents: true,
                orderBy: "startTime",
            });
            return (res.data.items ?? []).map(toCalendarEvent);
        },
        async createEvent(calendarId, params) {
            const requestBody = {
                summary: params.summary,
                location: params.location,
                description: params.description,
                start: params.start,
                end: params.end ?? params.start,
            };
            if (params.attendees && params.attendees.length > 0) {
                requestBody.attendees = params.attendees.map((email) => ({ email }));
            }
            const res = await calendar.events.insert({
                calendarId,
                requestBody,
            });
            return toCalendarEvent(res.data);
        },
        async updateEvent(calendarId, params) {
            const requestBody = {};
            if (params.summary !== undefined)
                requestBody.summary = params.summary;
            if (params.location !== undefined)
                requestBody.location = params.location;
            if (params.description !== undefined)
                requestBody.description = params.description;
            if (params.start !== undefined)
                requestBody.start = params.start;
            if (params.end !== undefined)
                requestBody.end = params.end;
            const res = await calendar.events.patch({
                calendarId,
                eventId: params.eventId,
                requestBody,
            });
            return toCalendarEvent(res.data);
        },
        async deleteEvent(calendarId, eventId) {
            await calendar.events.delete({ calendarId, eventId });
        },
        async findNextMeeting(calendarId) {
            const now = new Date().toISOString();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            const res = await calendar.events.list({
                calendarId,
                timeMin: now,
                timeMax: endOfDay.toISOString(),
                maxResults: 1,
                singleEvents: true,
                orderBy: "startTime",
            });
            const items = res.data.items ?? [];
            if (items.length === 0)
                return null;
            return toCalendarEvent(items[0]);
        },
    };
}
//# sourceMappingURL=client.js.map