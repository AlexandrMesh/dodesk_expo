import { combineReducers } from 'redux';
import lists from './listsReducer';
import tasks from './tasksReducer';
import modals from './modalsReducer';

export default combineReducers({
  lists,
  tasks,
  modals
});
