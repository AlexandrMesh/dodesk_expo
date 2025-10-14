import { connect } from 'react-redux';
import { AppDispatch } from '~redux/store/configureStore';
import { getAppInfo } from '~redux/actions/appActions';
import UpdateAppAlert from './UpdateAppAlert';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getAppInfo: () => dispatch(getAppInfo()).unwrap()
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAppAlert);
