import { reducer } from '@app/authentication/state/reducers/login-view.reducer';
import * as fromLoginView from '@app/authentication/state/reducers/login-view.reducer';
import { User } from '@app/user/models/User';
import { AuthToken } from '@app/authentication/models/auth';
import {
  LoginViewActions,
  AuthApiActions
} from '@app/authentication/state/actions';

describe('LoginViewReducer ', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('CLEAR', () => {
    it('should return default state on clear', () => {
      const initialState = {
        processing: true,
        error: true
      };
      const action = LoginViewActions.clear();
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });
  describe('LOGIN', () => {
    it('should set processing to true', () => {
      const credentials = {
        login: 'login',
        password: 'password'
      };
      const action = LoginViewActions.login({ credentials });
      const result = reducer(fromLoginView.INITIAL_STATE, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should set processing to false', () => {
      const authToken = {
        access_token: 'token'
      } as AuthToken;

      const initialState = {
        processing: true
      } as fromLoginView.State;

      const action = AuthApiActions.loginSuccess({ authToken });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_LOGGED_USER_SUCCESS', () => {
    it('should set processing to false', () => {
      const user = {
        firstname: 'user'
      } as User;

      const initialState = {
        processing: true
      } as fromLoginView.State;

      const action = AuthApiActions.loadLoggedUserSuccess({ user });
      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN_FAILURE & LOAD_LOGGED_USER_FAILURE', () => {
    function authenticationFailed(
      action:
        | typeof AuthApiActions.loadLoggedUserFailure
        | typeof AuthApiActions.loginFailure,
      initialState: any
    ) {
      const createAction = action({ error: true });
      const result = reducer(initialState, createAction);
      expect(result).toMatchSnapshot();
    }

    it('should set processing to false and error to true ', () => {
      const initialState = {
        processing: true,
        error: false
      } as fromLoginView.State;

      authenticationFailed(AuthApiActions.loginFailure, initialState);
      authenticationFailed(AuthApiActions.loadLoggedUserFailure, initialState);
    });
  });
});
