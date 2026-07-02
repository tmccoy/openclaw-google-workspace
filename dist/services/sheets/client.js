/**
 * Google Sheets API client wrapper.
 */
import { google } from "googleapis";
export function createSheetsClient(auth) {
    const sheets = google.sheets({ version: "v4", auth });
    return {
        async readRange(spreadsheetId, range) {
            const res = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
            return {
                range: res.data.range ?? range,
                values: (res.data.values ?? []),
            };
        },
        async writeRange(spreadsheetId, range, values) {
            const res = await sheets.spreadsheets.values.update({
                spreadsheetId,
                range,
                valueInputOption: "USER_ENTERED",
                requestBody: { values },
            });
            return {
                updatedCells: res.data.updatedCells ?? 0,
                updatedRange: res.data.updatedRange ?? range,
            };
        },
    };
}
//# sourceMappingURL=client.js.map