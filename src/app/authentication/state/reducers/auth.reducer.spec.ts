import { reducer } from '@app/authentication/state/reducers/auth.reducer';
import * as fromAuth from '@app/authentication/state/reducers/auth.reducer';
import { User } from '@app/user/models/User';
import { AuthApiActions } from '@app/authentication/state/actions';

describe('AuthReducer ', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOG_OUT_SUCCESS', () => {
    it('should logout user', () => {
      const initialState = {
        user: {
          firstname: 'firstname'
        }
      } as fromAuth.State;

      const action = AuthApiActions.logoutSuccess();
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_LOGGED_USER_FAILURE', () => {
    it('should unset logged user on logged failure', () => {
      const initialState = {
        user: {
          firstname: 'firstname'
        }
      } as fromAuth.State;
      const action = AuthApiActions.loadLoggedUserFailure({ error: {} });
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_LOGGED_USER_SUCCESS', () => {
    const user = {
      firstname: 'firstname',
      lastname: 'lastname'
    } as User;

    it('should load user info', () => {
      const action = AuthApiActions.loadLoggedUserSuccess({ user });
      const result = reducer(fromAuth.INITIAL_STATE, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('getUser', () => {
      it('should return user', () => {
        const initialState = {
          user: {
            firstname: 'firstname',
            lastname: 'firstname'
          }
        } as fromAuth.State;

        const result = fromAuth.getUser(initialState);

        expect(result).toMatchSnapshot();
      });
    });
  });
});
