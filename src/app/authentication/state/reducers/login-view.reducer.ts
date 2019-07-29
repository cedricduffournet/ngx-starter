import { createReducer, on } from '@ngrx/store';
import { User } from '@app/user/models/User';

import {
  LoginViewActions,
  AuthActions,
  AuthApiActions
} from '@app/authentication/state/actions';

export interface State {
  processing: boolean;
  error: boolean;
}

export const INITIAL_STATE: State = {
  processing: false,
  error: false
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(LoginViewActions.clear, () => INITIAL_STATE),
  on(LoginViewActions.login, AuthActions.loadLoggedUser, state => ({
    ...state,
    processing: true,
    error: false
  })),
  on(
    AuthApiActions.loginSuccess,
    AuthApiActions.loadLoggedUserSuccess,
    state => ({
      ...state,
      processing: false,
      error: false
    })
  ),
  on(
    AuthApiActions.loginFailure,
    AuthApiActions.loadLoggedUserFailure,
    state => ({
      ...state,
      processing: false,
      error: true
    })
  )
);

export const getProcessing = (state: State) => state.processing;
export const getError = (state: State) => state.error;
