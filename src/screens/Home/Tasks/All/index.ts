import { connect } from 'react-redux';
import { addTask, updateTaskStatus } from '~redux/actions/tasksActions';
import { deriveSelectedList } from '~redux/selectors/listsSelector';
import { deriveSectionedTasks, deriveSubtasks, deriveTasks } from '~redux/selectors/tasksSelector';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { ITask } from '~types/tasks';
import All from './All';

const mapStateToProps = (state: RootState) => ({
  tasks: deriveTasks(state),
  sectionedTasks: deriveSectionedTasks(state),
  subtasksMap: deriveSubtasks(state),
  selectedList: deriveSelectedList(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateTaskStatus: ({ taskId, status, completed_at }: { taskId: string; status: string; completed_at: number }) =>
    dispatch(updateTaskStatus({ taskId, status, completed_at })),
  addTask: (task: ITask) => dispatch(addTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
