import { connect } from 'react-redux';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { deriveListsData, deriveSelectedList } from '~redux/selectors/listsSelector';
import { getActiveModal } from '~redux/selectors/modalsSelector';
import { hideModal } from '~redux/actions/modalsActions';
import { LIST_MODAL } from '~constants/modalTypes';
import { selectListId, removeList, selectDefaultList } from '~redux/actions/listsActions';
import { removeAllTasksFromTheList } from '~redux/actions/tasksActions';
import ListModal from './ListModal';

const mapStateToProps = (state: RootState) => ({
  isVisible: getActiveModal(state) === LIST_MODAL,
  lists: deriveListsData(state),
  selectedList: deriveSelectedList(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  hideModal: () => dispatch(hideModal()),
  selectListId: (id: string) => dispatch(selectListId(id)),
  removeList: (listId: string) => {
    dispatch(removeAllTasksFromTheList(listId));
    dispatch(removeList(listId));
    dispatch(selectDefaultList(listId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListModal);
