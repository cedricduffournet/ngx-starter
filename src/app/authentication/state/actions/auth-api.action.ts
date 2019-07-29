import { props, createAction } from '@ngrx/store';

import { User } from '@app/user/models/User';
import { AuthToken } from '@app/authentication/models/auth';

export const loginSuccess = createAction(
  '[Auth/API] Login success',
  props<{ authToken: AuthToken }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login failure',
  props<{ error: any }>()
);

export const registerSuccess = createAction(
  '[Auth/API] Register success',
  props<{ userRegistered: User }>()
);

export const registerFailure = createAction(
  '[Auth/API] Register failure',
  props<{ error: any }>()
);

export const loadLoggedUserSuccess = createAction(
  '[Auth/API] Load logged user success',
  props<{ user: User }>()
);

export const loadLoggedUserFailure = createAction(
  '[Auth/API] Load logged user failure',
  props<{ error: any }>()
);

export const loadTokenSuccess = createAction(
  '[Auth/API] load token success',
  props<{ authToken: AuthToken }>()
);

export const loadTokenFailure = createAction(
  '[Auth/API] load token failure',
  props<{ error: string }>()
);

export const logoutSuccess = createAction('[Auth] log out success');
