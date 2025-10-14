import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { COMPLETED } from '~constants/statuses';
import { deriveSelectedList } from '~redux/selectors/listsSelector';
import { RootState } from '~redux/store/configureStore';
import showRelativeDate from '~utils/relativeDate';
import { ITask } from '~types/tasks';
import i18n from '~translations/i18n';

type StateWithTasks = Pick<RootState, 'tasks'>;

const getTasks = (state: StateWithTasks) => state.tasks;

export const getTasksData = (state: StateWithTasks) => getTasks(state).data;

export const deriveTask = (taskId: string) =>
  createSelector(
    [getTasksData],
    (tasks) => tasks.find(({ id }) => id === taskId) || { id: '', title: '', status: '', created_at: 0, completed_at: 0, listId: '', language: '' }
  );

export const deriveTasks = createSelector([getTasksData, deriveSelectedList], (tasks, selectedList) =>
  tasks
    .filter(({ language, listId }) => language === i18n.language && listId === selectedList?.id)
    .sort((a, b) => Number(b.created_at) - Number(a.created_at))
);

export const deriveSectionedTasks = createSelector([deriveTasks], (tasks) =>
  map(
    groupBy(
      tasks.map((item) => ({ ...item, date: showRelativeDate(item.created_at) })),
      'date'
    ),
    (value: ITask[], key: string) => {
      const completedCount = (value.filter(({ status }) => status === COMPLETED) || []).length;
      const allCount = value.length;
      const completed = completedCount > 0 && completedCount === allCount;
      return {
        title: key,
        count: allCount,
        completed,
        completedCount: (value.filter(({ status }) => status === COMPLETED) || []).length,
        data: value
      };
    }
  )
);
