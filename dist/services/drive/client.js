/**
 * Google Drive API client wrapper.
 */
import { google } from "googleapis";
// Google Workspace MIME types that support export
const EXPORTABLE_TYPES = {
    "application/vnd.google-apps.document": "text/plain",
    "application/vnd.google-apps.spreadsheet": "text/csv",
    "application/vnd.google-apps.presentation": "text/plain",
    "application/vnd.google-apps.drawing": "image/png",
};
export function createDriveClient(auth) {
    const drive = google.drive({ version: "v3", auth });
    const FILE_FIELDS = "id, name, mimeType, size, modifiedTime, webViewLink, parents";
    return {
        async listFiles({ query, folderId, maxResults }) {
            const qParts = [];
            if (folderId) {
                qParts.push(`'${folderId}' in parents`);
            }
            if (query) {
                qParts.push(query);
            }
            qParts.push("trashed = false");
            const res = await drive.files.list({
                q: qParts.join(" and "),
                pageSize: maxResults,
                fields: `files(${FILE_FIELDS})`,
                orderBy: "modifiedTime desc",
            });
            return (res.data.files ?? []);
        },
        async getFile(fileId) {
            const res = await drive.files.get({
                fileId,
                fields: FILE_FIELDS,
            });
            return res.data;
        },
        async readFileContent(fileId, exportMimeType) {
            // First get file metadata to determine type
            const meta = await drive.files.get({
                fileId,
                fields: "id, name, mimeType, size",
            });
            const mimeType = meta.data.mimeType ?? "";
            // Google Workspace files need export
            if (mimeType in EXPORTABLE_TYPES) {
                const targetMime = exportMimeType ?? EXPORTABLE_TYPES[mimeType];
                const res = await drive.files.export({ fileId, mimeType: targetMime }, { responseType: "text" });
                const content = typeof res.data === "string" ? res.data : String(res.data);
                return content;
            }
            // Regular files — check size (limit to ~1MB for text content)
            const size = parseInt(meta.data.size ?? "0", 10);
            if (size > 1_048_576) {
                return `[File too large to read inline: ${meta.data.name} (${(size / 1024 / 1024).toFixed(1)} MB). Use Google Drive to view this file.]`;
            }
            // Text-based files
            if (mimeType.startsWith("text/") ||
                mimeType === "application/json" ||
                mimeType === "application/xml" ||
                mimeType === "application/javascript") {
                const res = await drive.files.get({ fileId, alt: "media" }, { responseType: "text" });
                return typeof res.data === "string" ? res.data : String(res.data);
            }
            // Binary files — return metadata only
            return `[Binary file: ${meta.data.name} (${mimeType}, ${(size / 1024).toFixed(1)} KB). Cannot display inline — use Google Drive to view.]`;
        },
        async searchFiles(query, maxResults) {
            const q = `fullText contains '${query.replace(/'/g, "\\'")}' and trashed = false`;
            const res = await drive.files.list({
                q,
                pageSize: maxResults,
                fields: `files(${FILE_FIELDS})`,
                orderBy: "modifiedTime desc",
            });
            return (res.data.files ?? []);
        },
        async createFile({ name, content, mimeType, parentFolderId }) {
            const requestBody = {
                name,
                mimeType: mimeType ?? "text/plain",
            };
            if (parentFolderId) {
                requestBody.parents = [parentFolderId];
            }
            const res = await drive.files.create({
                requestBody,
                media: {
                    mimeType: mimeType ?? "text/plain",
                    body: content,
                },
                fields: FILE_FIELDS,
            });
            return res.data;
        },
    };
}
//# sourceMappingURL=client.js.map