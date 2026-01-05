import { connect } from 'react-redux';
import { addTask } from '~redux/actions/tasksActions';
import { deriveSelectedList } from '~redux/selectors/listsSelector';
import { deriveTask } from '~redux/selectors/tasksSelector';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { ITask } from '~types/tasks';
import AddTask from './AddTask';

const mapStateToProps = (state: RootState, ownProps: any) => ({
  selectedList: deriveSelectedList(state),
  parentTask: ownProps.route.params?.parentId ? deriveTask(ownProps.route.params.parentId)(state) : null
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addTask: (params: ITask) => dispatch(addTask(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
