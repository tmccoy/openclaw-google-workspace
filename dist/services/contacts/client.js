/**
 * Google Contacts (People API) client wrapper.
 */
import { google } from "googleapis";
const PERSON_FIELDS = "names,emailAddresses,phoneNumbers,organizations";
function toContact(person) {
    const p = person;
    return {
        resourceName: p.resourceName ?? undefined,
        displayName: p.names?.[0]?.displayName ?? undefined,
        emails: p.emailAddresses
            ?.filter((e) => e.value)
            .map((e) => ({ value: e.value })),
        phones: p.phoneNumbers
            ?.filter((ph) => ph.value)
            .map((ph) => ({ value: ph.value })),
        organizations: p.organizations?.map((o) => ({
            name: o.name ?? undefined,
            title: o.title ?? undefined,
        })),
    };
}
export function createContactsClient(auth) {
    const people = google.people({ version: "v1", auth });
    return {
        async searchContacts(query, maxResults) {
            const res = await people.people.searchContacts({
                query,
                pageSize: maxResults,
                readMask: PERSON_FIELDS,
            });
            const results = res.data.results ?? [];
            return results
                .filter((r) => r.person)
                .map((r) => toContact(r.person));
        },
        async getContact(resourceName) {
            const res = await people.people.get({
                resourceName,
                personFields: PERSON_FIELDS,
            });
            return toContact(res.data);
        },
    };
}
//# sourceMappingURL=client.js.map