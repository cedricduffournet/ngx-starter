import { createReducer, on } from '@ngrx/store';
import { User } from '@app/user/models/User';

import { AuthApiActions } from '@app/authentication/state/actions';

export interface State {
  user: User | null;
}

export const INITIAL_STATE: State = {
  user: null
};

export const reducer = createReducer(
  INITIAL_STATE,
  on(
    AuthApiActions.logoutSuccess,
    AuthApiActions.loadLoggedUserFailure,
    () => INITIAL_STATE
  ),
  on(AuthApiActions.loadLoggedUserSuccess, (state, { user }) => ({
    ...state,
    user
  }))
);

export const getUser = (state: State) => state.user;
