import { connect } from 'react-redux';
import { deriveSelectedList } from '~redux/selectors/listsSelector';
import { addTask } from '~redux/actions/tasksActions';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { ITask } from '~types/tasks';
import AddTask from './AddTask';

const mapStateToProps = (state: RootState) => ({
  selectedList: deriveSelectedList(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addTask: (params: ITask) => dispatch(addTask(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
