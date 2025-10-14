import { createAction } from '@reduxjs/toolkit';
import { IList } from '~types/lists';

const PREFIX = 'LISTS';

export const addList = createAction<IList>(`${PREFIX}/ADD_LIST`);
export const selectListId = createAction<string>(`${PREFIX}/SELECT_LIST_ID`);
export const selectDefaultList = createAction<string>(`${PREFIX}/SELECT_DEFAULT_LIST`);
export const removeList = createAction<string>(`${PREFIX}/REMOVE_LIST`);
export const updateList = createAction<{ id: string; title: string }>(`${PREFIX}/UPDATE_LIST`);
