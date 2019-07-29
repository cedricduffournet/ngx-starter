import * as fromAuth from '@app/authentication/state/reducers';
import { User } from '@app/user/models/User';

describe('AuthReducer ', () => {
  const initialState: fromAuth.AuthState = {
    userConnected: {
      user: {
        firstname: 'firsnametest',
        lastname: 'lastnametest',
        roles: ['TEST_ROLE']
      } as User
    },
    loginView: {
      error: true,
      processing: true
    },
    registerView: {
      errorUserExist: true,
      processing: true,
      status: 'success',
      userRegistered: {
        firstname: 'firstname',
        lastname: 'lastname'
      } as User
    }
  };

  describe('Selectors', () => {
    describe('getUserConnectedState', () => {
      it('should return the connected state', () => {
        expect(
          fromAuth.getUserConnectedState.projector(initialState)
        ).toStrictEqual({
          user: {
            firstname: 'firsnametest',
            lastname: 'lastnametest',
            roles: ['TEST_ROLE']
          }
        });
      });
    });

    describe('getUserConnectedState', () => {
      it('should return the user connected', () => {
        expect(
          fromAuth.getLoggedUser.projector(initialState.userConnected)
        ).toStrictEqual({
          firstname: 'firsnametest',
          lastname: 'lastnametest',
          roles: ['TEST_ROLE']
        });
      });
    });

    describe('getIsLogged', () => {
      it('should return true if user is logged', () => {
        expect(
          fromAuth.getIsLogged.projector(initialState.userConnected.user)
        ).toBe(true);
      });
    });

    describe('getAuthorized', () => {
      it('should return true because user has ROLE', () => {
        expect(
          fromAuth
            .getAuthorized(['TEST_ROLE'])
            .projector(initialState.userConnected.user)
        ).toBe(true);
      });

      it('should return false because user has not ROLE', () => {
        expect(
          fromAuth
            .getAuthorized(['TEST_ROLE_UNKNOWN'])
            .projector(initialState.userConnected.user)
        ).toBe(false);
      });

      it('should return false because user is not logged', () => {
        expect(fromAuth.getAuthorized(['TEST_ROLE']).projector(null)).toBe(
          false
        );
      });
    });

    describe('selectLoginViewState', () => {
      it('should return loginViewState', () => {
        expect(
          fromAuth.selectLoginViewState.projector(initialState)
        ).toStrictEqual({
          error: true,
          processing: true
        });
      });
    });

    describe('getLoginViewError', () => {
      it('should return error in loginView', () => {
        expect(
          fromAuth.getLoginViewError.projector(initialState.loginView)
        ).toBe(true);
      });
    });

    describe('getLoginViewProcessing', () => {
      it('should return if processing in loginView', () => {
        expect(
          fromAuth.getLoginViewProcessing.projector(initialState.loginView)
        ).toBe(true);
      });
    });

    describe('selectRegisterViewState', () => {
      it('should return registerViewState', () => {
        expect(
          fromAuth.selectRegisterViewState.projector(initialState)
        ).toStrictEqual({
          errorUserExist: true,
          processing: true,
          status: 'success',
          userRegistered: {
            firstname: 'firstname',
            lastname: 'lastname'
          }
        });
      });
    });

    describe('getRegisterViewProcessing', () => {
      it('should return if processing in registerView', () => {
        expect(
          fromAuth.getRegisterViewProcessing.projector(
            initialState.registerView
          )
        ).toBe(true);
      });
    });

    describe('getRegisterViewStatus', () => {
      it('should return status in registerView', () => {
        expect(
          fromAuth.getRegisterViewStatus.projector(initialState.registerView)
        ).toBe('success');
      });
    });

    describe('getRegisterViewErrorUserExist', () => {
      it('should return if user exist when register', () => {
        expect(
          fromAuth.getRegisterViewErrorUserExist.projector(
            initialState.registerView
          )
        ).toBe(true);
      });
    });

    describe('getRegisterViewUserRegistered', () => {
      it('should return registered user', () => {
        expect(
          fromAuth.getRegisterViewUserRegistered.projector(
            initialState.registerView
          )
        ).toStrictEqual({
          firstname: 'firstname',
          lastname: 'lastname'
        });
      });
    });
  });
});
