import { connect } from 'react-redux';
import { removeTask, updateTaskStatus } from '~redux/actions/tasksActions';
import { deriveSubtasks, deriveTask } from '~redux/selectors/tasksSelector';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import FullTask from './FullTask';

const mapStateToProps = (state: RootState, ownProps: any) => {
  const taskId = ownProps.route.params.taskId;
  const subtasksMap = deriveSubtasks(state);
  
  return {
    task: deriveTask(taskId)(state),
    subtasks: subtasksMap[taskId] || []
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  removeTask: (id: string) => dispatch(removeTask(id)),
  updateTaskStatus: (payload: { taskId: string; status: string; completed_at: number }) => 
    dispatch(updateTaskStatus(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullTask);
