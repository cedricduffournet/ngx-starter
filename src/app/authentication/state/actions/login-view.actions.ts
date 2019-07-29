import { props, createAction } from '@ngrx/store';
import { Credentials } from '@app/authentication/models/auth';

export const login = createAction(
  '[Login View] Login',
  props<{ credentials: Credentials }>()
);

export const clear = createAction('[Login View] Clear');
