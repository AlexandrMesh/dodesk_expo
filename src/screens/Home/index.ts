import { connect } from 'react-redux';
import { AppDispatch, RootState } from '~redux/store/configureStore';
import { deriveSelectedList } from '~redux/selectors/listsSelector';
import { showModal } from '~redux/actions/modalsActions';
import { LIST_MODAL } from '~constants/modalTypes';
import Home from './Home';

const mapStateToProps = (state: RootState) => ({
  selectedList: deriveSelectedList(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showListModal: () => dispatch(showModal(LIST_MODAL))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
