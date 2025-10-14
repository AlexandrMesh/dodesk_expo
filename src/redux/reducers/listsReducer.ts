import { createReducer } from '@reduxjs/toolkit';
import * as listsActions from '~redux/actions/listsActions';
import { DEFAULT_TITLE_ID } from '~constants/lists';
import { EN, RU } from '~constants/languages';
import { IList } from '~types/lists';

export interface IListsState {
  selectedListId: string;
  data: IList[];
}

export const getDefaultListsState = (): IListsState => ({
  selectedListId: DEFAULT_TITLE_ID,
  data: [
    { id: DEFAULT_TITLE_ID, title: 'Список дел', language: RU },
    { id: DEFAULT_TITLE_ID, title: 'To-Do list', language: EN }
  ]
});

const defaultState = getDefaultListsState();

export default createReducer(defaultState, (builder) => {
  builder
    .addCase(listsActions.addList, (state, action) => {
      state.data = [...state.data, action.payload];
    })
    .addCase(listsActions.selectListId, (state, action) => {
      state.selectedListId = action.payload;
    })
    .addCase(listsActions.selectDefaultList, (state, action) => {
      state.selectedListId = state.selectedListId === action.payload ? getDefaultListsState().selectedListId : state.selectedListId;
    })
    .addCase(listsActions.removeList, (state, action) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    })
    .addCase(listsActions.updateList, (state, { payload: { id, title } }) => {
      state.data = state.data.map((item) => (item.id === id ? { ...item, title } : item));
    });
});
