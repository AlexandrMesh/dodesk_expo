import { connect } from 'react-redux';
import { deriveTask } from '~redux/selectors/tasksSelector';
import { removeTask } from '~redux/actions/tasksActions';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import FullTask from './FullTask';

const mapStateToProps = (state: RootState, ownProps: any) => ({
  task: deriveTask(ownProps.route.params.taskId)(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  removeTask: (id: string) => dispatch(removeTask(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullTask);
