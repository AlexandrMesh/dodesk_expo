import { createSelector } from 'reselect';
import { EN } from '~constants/languages';
import { DEFAULT_TITLE_ID } from '~constants/lists';
import { RootState } from '~redux/store/configureStore';
import i18n from '~translations/i18n';

type StateWithLists = Pick<RootState, 'lists'>;

const getLists = (state: StateWithLists) => state.lists;

export const getListsData = (state: StateWithLists) => getLists(state).data;
export const getSelectedListId = (state: StateWithLists) => getLists(state).selectedListId;

export const deriveListsData = createSelector([getListsData], (lists) => lists.filter(({ language }) => language === i18n.language));

export const deriveList = (listId: string) => createSelector([getListsData], (lists) => lists.find(({ id }) => id === listId));

export const deriveSelectedList = createSelector(
  [deriveListsData, getSelectedListId],
  (lists, selectedListId) =>
    lists.find(({ id }) => id === selectedListId) ||
    lists.find(({ id }) => id === DEFAULT_TITLE_ID) || { id: DEFAULT_TITLE_ID, title: 'To-Do list', language: EN }
);
