import { createAction } from '@reduxjs/toolkit';
import { ITask } from '~types/tasks';

const PREFIX = 'TASKS';

export const addTask = createAction<ITask>(`${PREFIX}/ADD_TASK`);
export const removeTask = createAction<string>(`${PREFIX}/REMOVE_TASK`);
export const updateTaskStatus = createAction<{ taskId: string; status: string; completed_at?: number }>(`${PREFIX}/UPDATE_TASK_STATUS`);
export const removeAllTasksFromTheList = createAction<string>(`${PREFIX}/REMOVE_ALL_TASKS_FROM_THE_LIST`);
export const updateTask = createAction<{ id: string; title: string; status: string; description: string }>(`${PREFIX}/UPDATE_TASK`);
