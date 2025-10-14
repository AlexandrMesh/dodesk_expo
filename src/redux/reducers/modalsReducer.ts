import { createReducer } from '@reduxjs/toolkit';
import * as modalsActions from '~redux/actions/modalsActions';

export interface IModalsState {
  activeModal: string;
}

export const getDefaultListsState = (): IModalsState => ({
  activeModal: ''
});

const defaultState = getDefaultListsState();

export default createReducer(defaultState, (builder) => {
  builder
    .addCase(modalsActions.showModal, (state, action) => {
      state.activeModal = action.payload;
    })
    .addCase(modalsActions.hideModal, (state) => {
      state.activeModal = '';
    });
});
