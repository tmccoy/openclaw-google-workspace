/**
 * Google Tasks API client wrapper.
 */
import type { OAuth2Client } from "google-auth-library";
export interface TaskItem {
    id?: string;
    title?: string;
    notes?: string;
    due?: string;
    status?: string;
    completed?: string;
    updated?: string;
}
export interface TaskList {
    id?: string;
    title?: string;
}
export interface TasksClient {
    listTasks(taskListId: string, showCompleted: boolean): Promise<TaskItem[]>;
    createTask(taskListId: string, params: {
        title: string;
        notes?: string;
        due?: string;
    }): Promise<TaskItem>;
    completeTask(taskListId: string, taskId: string): Promise<TaskItem>;
    listTaskLists(): Promise<TaskList[]>;
}
export declare function createTasksClient(auth: OAuth2Client): TasksClient;
//# sourceMappingURL=client.d.ts.map