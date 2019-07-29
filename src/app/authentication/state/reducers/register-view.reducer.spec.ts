import { reducer } from '@app/authentication/state/reducers/register-view.reducer';
import * as fromRegisterView from '@app/authentication/state/reducers/register-view.reducer';
import { User } from '@app/user/models/User';
import { Register } from '@app/authentication/models/auth';
import {
  RegisterViewActions,
  AuthApiActions
} from '@app/authentication/state/actions';

describe('RegisterViewReducer ', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('CLEAR', () => {
    it('shoud restore state to initial state', () => {
      const initialState = {
        processing: true,
        errorUserExist: true,
        status: 'success',
        userRegistered: {
          firstname: 'firstname'
        }
      } as fromRegisterView.State;

      const action = RegisterViewActions.clear();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('REGISTER', () => {
    it('should set processing to true', () => {
      const initialState = {
        processing: true
      } as fromRegisterView.State;

      const register = {
        firstname: 'firstname'
      } as Register;

      const action = RegisterViewActions.register({ register });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('REGISTER_SUCCESS', () => {
    it('should set processing to false, status to success and userRegistered', () => {
      const initialState = {
        processing: true,
        userRegistered: null
      } as fromRegisterView.State;

      const userRegistered = {
        firstname: 'firstname'
      } as User;

      const action = AuthApiActions.registerSuccess({ userRegistered });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('REGISTER_FAILURE', () => {
    it('should set processing to false,status to error and userExist to true', () => {
      const initialState = {
        processing: true,
        userRegistered: null,
        status: 'init'
      } as fromRegisterView.State;

      const action = AuthApiActions.registerFailure({ error: true });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });
});
