import { RootState } from '~redux/store/configureStore';

type StateWithModals = Pick<RootState, 'modals'>;

const getModals = (state: StateWithModals) => state.modals;

export const getActiveModal = (state: StateWithModals) => getModals(state).activeModal;
