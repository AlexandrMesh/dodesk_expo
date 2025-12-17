import { connect } from 'react-redux';
import { updateTaskStatus } from '~redux/actions/tasksActions';
import { deriveSectionedTasks, deriveSubtasks, deriveTasks } from '~redux/selectors/tasksSelector';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import All from './All';

const mapStateToProps = (state: RootState) => ({
  tasks: deriveTasks(state),
  sectionedTasks: deriveSectionedTasks(state),
  subtasksMap: deriveSubtasks(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateTaskStatus: ({ taskId, status, completed_at }: { taskId: string; status: string; completed_at: number }) =>
    dispatch(updateTaskStatus({ taskId, status, completed_at }))
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
