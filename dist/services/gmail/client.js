/**
 * Gmail API client wrapper.
 * Provides typed methods for common Gmail operations.
 */
import { google } from "googleapis";
function parseHeaders(headers) {
    const map = {};
    if (!headers)
        return map;
    for (const h of headers) {
        if (h.name && h.value) {
            map[h.name.toLowerCase()] = h.value;
        }
    }
    return map;
}
function extractBody(payload) {
    if (!payload)
        return "";
    // Simple text/plain body
    if (payload.mimeType === "text/plain" && payload.body?.data) {
        return Buffer.from(payload.body.data, "base64url").toString("utf-8");
    }
    // Multipart — look for text/plain first, then text/html
    if (payload.parts) {
        const textPart = payload.parts.find((p) => p.mimeType === "text/plain");
        if (textPart?.body?.data) {
            return Buffer.from(textPart.body.data, "base64url").toString("utf-8");
        }
        const htmlPart = payload.parts.find((p) => p.mimeType === "text/html");
        if (htmlPart?.body?.data) {
            const html = Buffer.from(htmlPart.body.data, "base64url").toString("utf-8");
            // Strip HTML tags for a rough plaintext version
            return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        }
        // Recurse into nested multipart
        for (const part of payload.parts) {
            const nested = extractBody(part);
            if (nested)
                return nested;
        }
    }
    return "";
}
function messageToEmail(msg) {
    const headers = parseHeaders(msg.payload?.headers);
    return {
        id: msg.id,
        threadId: msg.threadId ?? undefined,
        from: headers["from"],
        to: headers["to"],
        cc: headers["cc"],
        subject: headers["subject"],
        date: headers["date"],
        snippet: msg.snippet ?? undefined,
        body: extractBody(msg.payload),
        labelIds: msg.labelIds ?? undefined,
    };
}
function messageSummary(msg) {
    const headers = parseHeaders(msg.payload?.headers);
    return {
        id: msg.id,
        threadId: msg.threadId ?? undefined,
        from: headers["from"],
        subject: headers["subject"],
        date: headers["date"],
        snippet: msg.snippet ?? undefined,
    };
}
function buildMimeMessage(params) {
    const lines = [];
    lines.push(`To: ${params.to}`);
    if (params.cc)
        lines.push(`Cc: ${params.cc}`);
    if (params.bcc)
        lines.push(`Bcc: ${params.bcc}`);
    lines.push(`Subject: ${params.subject}`);
    lines.push("Content-Type: text/plain; charset=utf-8");
    lines.push("MIME-Version: 1.0");
    lines.push("");
    lines.push(params.body);
    return lines.join("\r\n");
}
export function createGmailClient(auth) {
    const gmail = google.gmail({ version: "v1", auth });
    return {
        async searchMessages(query, maxResults) {
            const res = await gmail.users.messages.list({
                userId: "me",
                q: query,
                maxResults,
            });
            const messageIds = res.data.messages ?? [];
            if (messageIds.length === 0)
                return [];
            // Fetch each message with metadata
            const messages = await Promise.all(messageIds.slice(0, maxResults).map(async (m) => {
                const full = await gmail.users.messages.get({
                    userId: "me",
                    id: m.id,
                    format: "metadata",
                    metadataHeaders: ["From", "To", "Subject", "Date", "Cc"],
                });
                return messageSummary(full.data);
            }));
            return messages;
        },
        async getMessage(messageId) {
            const res = await gmail.users.messages.get({
                userId: "me",
                id: messageId,
                format: "full",
            });
            return messageToEmail(res.data);
        },
        async listUnread(maxResults) {
            return this.searchMessages("is:unread in:inbox", maxResults);
        },
        async listByLabel(label, maxResults) {
            // Try to find the label ID first
            const labelsRes = await gmail.users.labels.list({ userId: "me" });
            const labels = labelsRes.data.labels ?? [];
            const match = labels.find((l) => l.name?.toLowerCase() === label.toLowerCase());
            if (match?.id) {
                const res = await gmail.users.messages.list({
                    userId: "me",
                    labelIds: [match.id],
                    maxResults,
                });
                const messageIds = res.data.messages ?? [];
                if (messageIds.length === 0)
                    return [];
                const messages = await Promise.all(messageIds.slice(0, maxResults).map(async (m) => {
                    const full = await gmail.users.messages.get({
                        userId: "me",
                        id: m.id,
                        format: "metadata",
                        metadataHeaders: ["From", "To", "Subject", "Date"],
                    });
                    return messageSummary(full.data);
                }));
                return messages;
            }
            // Fallback to search
            return this.searchMessages(`label:${label}`, maxResults);
        },
        async sendEmail(params) {
            const raw = buildMimeMessage(params);
            const encoded = Buffer.from(raw)
                .toString("base64url");
            const res = await gmail.users.messages.send({
                userId: "me",
                requestBody: { raw: encoded },
            });
            return {
                id: res.data.id,
                threadId: res.data.threadId,
            };
        },
    };
}
//# sourceMappingURL=client.js.map