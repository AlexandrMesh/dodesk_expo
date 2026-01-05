import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { createSelector } from 'reselect';
import { COMPLETED } from '~constants/statuses';
import { deriveSelectedList } from '~redux/selectors/listsSelector';
import { RootState } from '~redux/store/configureStore';
import i18n from '~translations/i18n';
import { ITask } from '~types/tasks';
import showRelativeDate from '~utils/relativeDate';

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
    .filter(({ language, listId, parentId }) => language === i18n.language && listId === selectedList?.id && !parentId)
    .sort((a, b) => Number(b.created_at) - Number(a.created_at))
);

export const deriveSubtasks = createSelector([getTasksData], (tasks) => {
  const subtasksMap: Record<string, ITask[]> = {};
  tasks
    .filter(({ parentId }) => !!parentId)
    .sort((a, b) => Number(a.created_at) - Number(b.created_at))
    .forEach((task) => {
      if (task.parentId) {
        if (!subtasksMap[task.parentId]) {
          subtasksMap[task.parentId] = [];
        }
        subtasksMap[task.parentId].push(task);
      }
    });
  return subtasksMap;
});

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
