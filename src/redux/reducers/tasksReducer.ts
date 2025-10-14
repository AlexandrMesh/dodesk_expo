import { createReducer } from '@reduxjs/toolkit';
import * as tasksActions from '~redux/actions/tasksActions';
import { ITask } from '~types/tasks';
import { COMPLETED } from '~constants/statuses';

export interface ITasksState {
  data: ITask[];
}

export const getDefaultTasksState = (): ITasksState => ({
  data: []
});

const defaultState = getDefaultTasksState();

export default createReducer(defaultState, (builder) => {
  builder
    .addCase(tasksActions.addTask, (state, action) => {
      state.data = [...state.data, action.payload];
    })
    .addCase(tasksActions.removeTask, (state, action) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    })
    .addCase(tasksActions.removeAllTasksFromTheList, (state, action) => {
      state.data = state.data.filter(({ listId }) => listId !== action.payload);
    })
    .addCase(tasksActions.updateTaskStatus, (state, { payload: { taskId, status, completed_at } }) => {
      state.data = state.data.map((item) =>
        (item.id === taskId ? { ...item, status, completed_at: status === COMPLETED ? completed_at as number : null } : item));
    })
    .addCase(tasksActions.updateTask, (state, { payload: { id, title, status, description } }) => {
      state.data = state.data.map((item) =>
        (item.id === id ? { ...item, title, status, description } : item));
    });
});
