import { props, createAction } from '@ngrx/store';

export const loadCivilities = createAction('[Civility/View] Load civilities');

export type displayType = 'list' | 'add' | 'update' | 'delete';

export const showAddCivilityModal = createAction(
  '[Civility View] Show add civility popup'
);

export const showUpdateCivilityModal = createAction(
  '[Civility View] Show update civility modal'
);

export const showDeleteCivilityModal = createAction(
  '[Civility View] Show delete civility modal'
);

export const selectCivility = createAction(
  '[Civility/layout] Select civility',
  props<{ id: number }>()
);
