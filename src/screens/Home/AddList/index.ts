import { connect } from 'react-redux';
import { addList, selectListId } from '~redux/actions/listsActions';
import { deriveListsData } from '~redux/selectors/listsSelector';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { IList } from '~types/lists';
import AddList from './AddList';

const mapStateToProps = (state: RootState) => ({
  listData: deriveListsData(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addList: (params: IList) => dispatch(addList(params)),
  selectListId: (id: string) => dispatch(selectListId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddList);
