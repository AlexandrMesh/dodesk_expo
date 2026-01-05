import { connect } from 'react-redux';
import { updateTask } from '~redux/actions/tasksActions';
import { deriveSelectedList } from '~redux/selectors/listsSelector';
import { deriveTask } from '~redux/selectors/tasksSelector';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import EditTask from './EditTask';

const mapStateToProps = (state: RootState, ownProps: any) => ({
  task: deriveTask(ownProps.route.params.taskId)(state),
  selectedList: deriveSelectedList(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateTask: (params: { id: string; title: string; status: string; description: string }) => dispatch(updateTask(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);


