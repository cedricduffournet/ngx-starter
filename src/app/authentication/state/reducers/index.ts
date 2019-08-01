import {
  createSelector,
  createFeatureSelector,
  Action,
  combineReducers
} from '@ngrx/store';

import { User } from '@app/user/models/User';
import * as fromRoot from '@app/core/state/reducers';
import * as fromAuth from '@app/authentication/state/reducers/auth.reducer';
import * as fromLoginView from '@app/authentication/state/reducers/login-view.reducer';
import * as fromRegisterView from '@app/authentication/state/reducers/register-view.reducer';

export interface AuthState {
  userConnected: fromAuth.State;
  loginView: fromLoginView.State;
  registerView: fromRegisterView.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    userConnected: fromAuth.reducer,
    loginView: fromLoginView.reducer,
    registerView: fromRegisterView.reducer
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const getUserConnectedState = createSelector(
  selectAuthState,
  auth => auth.userConnected
);
export const getLoggedUser = createSelector(
  getUserConnectedState,
  auth => auth.user
);
export const getIsLogged = createSelector(
  getLoggedUser,
  user => !!user
);

export const getAuthorized = createSelector(
  getLoggedUser,
  (user: User | null, props: any) => {
    if (!user) {
      return false;
    }
    return props.roles.some((element: string) => {
      return user.roles.some((element2: string) => {
        return element2 === element;
      });
    });
  }
);

export const selectLoginViewState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginView
);
export const getLoginViewError = createSelector(
  selectLoginViewState,
  fromLoginView.getError
);
export const getLoginViewProcessing = createSelector(
  selectLoginViewState,
  fromLoginView.getProcessing
);

export const selectRegisterViewState = createSelector(
  selectAuthState,
  (state: AuthState) => state.registerView
);
export const getRegisterViewProcessing = createSelector(
  selectRegisterViewState,
  fromRegisterView.getProcessing
);
export const getRegisterViewStatus = createSelector(
  selectRegisterViewState,
  fromRegisterView.getStatus
);
export const getRegisterViewErrorUserExist = createSelector(
  selectRegisterViewState,
  fromRegisterView.getErrorUserExist
);
export const getRegisterViewUserRegistered = createSelector(
  selectRegisterViewState,
  fromRegisterView.getUserRegistered
);
