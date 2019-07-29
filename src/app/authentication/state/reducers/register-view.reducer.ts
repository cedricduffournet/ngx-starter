import { createReducer, on } from '@ngrx/store';
import { User } from '@app/user/models/User';

import {
  RegisterViewActions,
  AuthActions,
  AuthApiActions
} from '@app/authentication/state/actions';

export interface State {
  processing: boolean;
  errorUserExist: boolean;
  status: 'init' | 'success' | 'error';
  userRegistered: User | null;
}

export const INITIAL_STATE: State = {
  processing: false,
  errorUserExist: false,
  status: 'init',
  userRegistered: null
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(RegisterViewActions.clear, () => INITIAL_STATE),
  on(RegisterViewActions.register, state => ({
    ...state,
    processing: true,
    errorUserExist: false,
    status: 'init',
    userRegistered: null
  })),
  on(AuthApiActions.registerSuccess, (state, { userRegistered }) => ({
    ...state,
    processing: false,
    errorUserExist: false,
    status: 'success',
    userRegistered
  })),
  on(AuthApiActions.registerFailure, state => ({
    ...state,
    processing: false,
    errorUserExist: true,
    status: 'error',
    userRegistered: null
  }))
);

export const getProcessing = (state: State) => state.processing;
export const getErrorUserExist = (state: State) => state.errorUserExist;
export const getStatus = (state: State) => state.status;
export const getUserRegistered = (state: State) => state.userRegistered;
