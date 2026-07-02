/**
 * Google Drive API client wrapper.
 */
import type { OAuth2Client } from "google-auth-library";
export interface DriveFile {
    id?: string;
    name?: string;
    mimeType?: string;
    size?: string;
    modifiedTime?: string;
    webViewLink?: string;
    parents?: string[];
}
export interface DriveClient {
    listFiles(params: {
        query?: string;
        folderId?: string;
        maxResults: number;
    }): Promise<DriveFile[]>;
    getFile(fileId: string): Promise<DriveFile>;
    readFileContent(fileId: string, exportMimeType?: string): Promise<string>;
    searchFiles(query: string, maxResults: number): Promise<DriveFile[]>;
    createFile(params: {
        name: string;
        content: string;
        mimeType?: string;
        parentFolderId?: string;
    }): Promise<DriveFile>;
}
export declare function createDriveClient(auth: OAuth2Client): DriveClient;
//# sourceMappingURL=client.d.ts.map