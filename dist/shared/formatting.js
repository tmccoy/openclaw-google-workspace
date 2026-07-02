/**
 * Output formatting helpers for tool results.
 */
export function textResult(text) {
    return { content: [{ type: "text", text }], details: undefined };
}
export function errorResult(error) {
    const message = error instanceof Error ? error.message : String(error);
    return textResult(`Error: ${message}`);
}
export function formatEmailSummary(message) {
    const lines = [];
    lines.push(`**From:** ${message.from ?? "Unknown"}`);
    if (message.to)
        lines.push(`**To:** ${message.to}`);
    lines.push(`**Subject:** ${message.subject ?? "(no subject)"}`);
    if (message.date)
        lines.push(`**Date:** ${message.date}`);
    lines.push(`**ID:** ${message.id}`);
    if (message.body) {
        lines.push("");
        lines.push(truncateBody(message.body, 3000));
    }
    else if (message.snippet) {
        lines.push("");
        lines.push(message.snippet);
    }
    return lines.join("\n");
}
export function formatEmailList(messages) {
    if (messages.length === 0)
        return "No messages found.";
    return messages
        .map((m, i) => {
        const parts = [`${i + 1}. **${m.subject ?? "(no subject)"}**`];
        if (m.from)
            parts.push(`   From: ${m.from}`);
        if (m.date)
            parts.push(`   Date: ${m.date}`);
        if (m.snippet)
            parts.push(`   ${m.snippet}`);
        parts.push(`   ID: ${m.id}`);
        return parts.join("\n");
    })
        .join("\n\n");
}
export function formatEventDetails(event) {
    const lines = [];
    lines.push(`**${event.summary ?? "(no title)"}**`);
    if (event.start)
        lines.push(`Start: ${event.start}`);
    if (event.end)
        lines.push(`End: ${event.end}`);
    if (event.location)
        lines.push(`Location: ${event.location}`);
    if (event.status)
        lines.push(`Status: ${event.status}`);
    if (event.description) {
        lines.push(`Description: ${truncateBody(event.description, 500)}`);
    }
    if (event.attendees && event.attendees.length > 0) {
        lines.push(`Attendees: ${event.attendees.map((a) => `${a.email} (${a.responseStatus ?? "unknown"})`).join(", ")}`);
    }
    if (event.id)
        lines.push(`ID: ${event.id}`);
    if (event.htmlLink)
        lines.push(`Link: ${event.htmlLink}`);
    return lines.join("\n");
}
export function formatEventList(events) {
    if (events.length === 0)
        return "No events found.";
    return events
        .map((e, i) => {
        const parts = [`${i + 1}. **${e.summary ?? "(no title)"}**`];
        if (e.start)
            parts.push(`   Start: ${e.start}`);
        if (e.end)
            parts.push(`   End: ${e.end}`);
        if (e.location)
            parts.push(`   Location: ${e.location}`);
        if (e.id)
            parts.push(`   ID: ${e.id}`);
        return parts.join("\n");
    })
        .join("\n\n");
}
export function formatFileInfo(file) {
    const lines = [];
    lines.push(`**${file.name ?? "(unnamed)"}**`);
    if (file.mimeType)
        lines.push(`Type: ${file.mimeType}`);
    if (file.size)
        lines.push(`Size: ${formatBytes(parseInt(file.size, 10))}`);
    if (file.modifiedTime)
        lines.push(`Modified: ${file.modifiedTime}`);
    if (file.id)
        lines.push(`ID: ${file.id}`);
    if (file.webViewLink)
        lines.push(`Link: ${file.webViewLink}`);
    return lines.join("\n");
}
export function formatFileList(files) {
    if (files.length === 0)
        return "No files found.";
    return files
        .map((f, i) => {
        const parts = [`${i + 1}. **${f.name ?? "(unnamed)"}**`];
        if (f.mimeType)
            parts.push(`   Type: ${friendlyMimeType(f.mimeType)}`);
        if (f.modifiedTime)
            parts.push(`   Modified: ${f.modifiedTime}`);
        if (f.id)
            parts.push(`   ID: ${f.id}`);
        return parts.join("\n");
    })
        .join("\n\n");
}
export function formatContactInfo(person) {
    const lines = [];
    lines.push(`**${person.displayName ?? "(unnamed contact)"}**`);
    if (person.emails && person.emails.length > 0) {
        lines.push(`Email: ${person.emails.map((e) => e.value).join(", ")}`);
    }
    if (person.phones && person.phones.length > 0) {
        lines.push(`Phone: ${person.phones.map((p) => p.value).join(", ")}`);
    }
    if (person.organizations && person.organizations.length > 0) {
        const org = person.organizations[0];
        if (org.name)
            lines.push(`Organization: ${org.name}`);
        if (org.title)
            lines.push(`Title: ${org.title}`);
    }
    if (person.resourceName)
        lines.push(`Resource: ${person.resourceName}`);
    return lines.join("\n");
}
export function truncateBody(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength) + "\n\n... (truncated)";
}
function formatBytes(bytes) {
    if (isNaN(bytes) || bytes === 0)
        return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
function friendlyMimeType(mimeType) {
    const map = {
        "application/vnd.google-apps.document": "Google Doc",
        "application/vnd.google-apps.spreadsheet": "Google Sheet",
        "application/vnd.google-apps.presentation": "Google Slides",
        "application/vnd.google-apps.folder": "Folder",
        "application/vnd.google-apps.form": "Google Form",
        "application/pdf": "PDF",
        "text/plain": "Text",
        "text/csv": "CSV",
        "image/png": "PNG Image",
        "image/jpeg": "JPEG Image",
    };
    return map[mimeType] ?? mimeType;
}
//# sourceMappingURL=formatting.js.map