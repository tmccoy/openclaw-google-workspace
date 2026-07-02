/**
 * Gmail API client wrapper.
 * Provides typed methods for common Gmail operations.
 */
import type { OAuth2Client } from "google-auth-library";
export interface EmailMessage {
    id: string;
    threadId?: string;
    from?: string;
    to?: string;
    cc?: string;
    subject?: string;
    date?: string;
    snippet?: string;
    body?: string;
    labelIds?: string[];
}
export interface GmailClient {
    searchMessages(query: string, maxResults: number): Promise<EmailMessage[]>;
    getMessage(messageId: string): Promise<EmailMessage>;
    listUnread(maxResults: number): Promise<EmailMessage[]>;
    listByLabel(label: string, maxResults: number): Promise<EmailMessage[]>;
    sendEmail(params: {
        to: string;
        subject: string;
        body: string;
        cc?: string;
        bcc?: string;
    }): Promise<{
        id: string;
        threadId: string;
    }>;
}
export declare function createGmailClient(auth: OAuth2Client): GmailClient;
//# sourceMappingURL=client.d.ts.map