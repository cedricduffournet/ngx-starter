import { props, createAction } from '@ngrx/store';
import { Register } from '@app/authentication/models/auth';

export const register = createAction(
  '[Register View] Register user',
  props<{ register: Register }>()
);

export const clear = createAction('[Register View] Clear register view store');

export const loadCivilities = createAction(
  '[Register View] Load civility collection'
);
