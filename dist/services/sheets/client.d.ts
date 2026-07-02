/**
 * Google Sheets API client wrapper.
 */
import type { OAuth2Client } from "google-auth-library";
export interface SheetData {
    range: string;
    values: string[][];
}
export interface SheetsClient {
    readRange(spreadsheetId: string, range: string): Promise<SheetData>;
    writeRange(spreadsheetId: string, range: string, values: string[][]): Promise<{
        updatedCells: number;
        updatedRange: string;
    }>;
}
export declare function createSheetsClient(auth: OAuth2Client): SheetsClient;
//# sourceMappingURL=client.d.ts.map