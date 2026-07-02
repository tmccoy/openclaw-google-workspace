/**
 * Google Contacts (People API) client wrapper.
 */
import type { OAuth2Client } from "google-auth-library";
export interface Contact {
    resourceName?: string;
    displayName?: string;
    emails?: Array<{
        value: string;
    }>;
    phones?: Array<{
        value: string;
    }>;
    organizations?: Array<{
        name?: string;
        title?: string;
    }>;
}
export interface ContactsClient {
    searchContacts(query: string, maxResults: number): Promise<Contact[]>;
    getContact(resourceName: string): Promise<Contact>;
}
export declare function createContactsClient(auth: OAuth2Client): ContactsClient;
//# sourceMappingURL=client.d.ts.map