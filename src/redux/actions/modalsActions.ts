import { createAction } from '@reduxjs/toolkit';

const PREFIX = 'MODALS';

export const showModal = createAction<string>(`${PREFIX}/SHOW_MODAL`);
export const hideModal = createAction(`${PREFIX}/HIDE_MODAL`);
