import { TestBed } from '@angular/core/testing';

import { cold } from 'jasmine-marbles';
import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { authConfig } from '@app/authentication/auth.config';
import {
  AuthService,
  LOCAL_STORAGE_TOKEN,
  storageFactory
} from '@app/authentication/services';
import * as fromAuth from '@app/authentication/state/reducers';
import { User } from '@app/user/models/User';
import { Register } from '@app/authentication/models/auth';
import { HttpService } from '@app/core/services';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpService;

  let store: MockStore<fromAuth.State>;
  const localStorageFake: Storage & any = {
    removeItem: jest.fn(),
    setItem: jest.fn(),
    getItem: jest.fn()
  };
  let localStorageToken: any;
  const authInfo = {
    access_token: 'access',
    expires_in: 1000,
    token_type: 'type',
    refresh_token: 'refresh'
  };
  let loggedUser: MemoizedSelector<fromAuth.State, User | null>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            getPublic: jest.fn(),
            post: jest.fn(),
            postPublic: jest.fn(),
            postHost: jest.fn()
          }
        },
        {
          provide: LOCAL_STORAGE_TOKEN,
          useValue: localStorageFake
        },
        provideMockStore()
      ]
    });

    service = TestBed.get(AuthService);
    http = TestBed.get(HttpService);
    localStorageToken = TestBed.get(LOCAL_STORAGE_TOKEN);
    store = TestBed.get(Store);

    loggedUser = store.overrideSelector(fromAuth.getLoggedUser, null);
  });

  it('storageFactory retrieve localStorage', () => {
    expect(storageFactory()).toBe(localStorage);
  });

  describe('Get and refresh token', () => {
    beforeEach(
      () =>
        (localStorageToken.getItem = jest.fn(() => JSON.stringify(authInfo)))
    );

    it('should retrieve token from local storage', () => {
      const expected = cold('(a|)', { a: authInfo });
      expect(service.getToken()).toBeObservable(expected);
      expect(localStorageToken.getItem).toBeCalledWith('authentication');
    });

    it('should refresh token and return new token', () => {
      const newAuthInfo = {
        access_token: 'newAccess',
        expires_in: 'newExpires',
        token_type: 'newType',
        refresh_token: 'refresh'
      };
      const response = cold('-a|', { a: newAuthInfo });
      const expected = cold('-b|', { b: newAuthInfo });
      http.postHost = jest.fn(() => response);
      expect(service.refreshToken()).toBeObservable(expected);
      expect(http.postHost).toHaveBeenCalledWith('/oauth/v2/proxy', {
        refresh_token: authInfo.refresh_token,
        grant_type: 'refresh_token'
      });
    });
  });

  describe('set and clear token in localstorage', () => {
    it('should store token in local storage', () => {
      const expected = cold('(a|)', { a: authInfo });
      expect(service.setToken(authInfo)).toBeObservable(expected);
      expect(localStorageToken.setItem).toHaveBeenCalledWith(
        'authentication',
        JSON.stringify(authInfo)
      );
    });

    it('should clear token in local storage', () => {
      const expected = cold('(a|)', { a: true });
      expect(service.clearToken()).toBeObservable(expected);
      expect(localStorageToken.removeItem).toHaveBeenCalledWith(
        'authentication'
      );
    });
  });

  describe('Token not in storage', () => {
    it('should emit error if local storage has not info', () => {
      const expected = cold('#', {}, 'No local storage');
      expect(service.getToken()).toBeObservable(expected);
      expect(localStorageToken.getItem).toHaveBeenCalledWith('authentication');
    });
  });

  describe('confirmResetting', () => {
    it('should call the confirm api to check token and return ok result', () => {
      const token = '1234';
      const response = cold('-a|', { a: 'ok' });
      const expected = cold('-b|', { b: 'ok' });
      http.getPublic = jest.fn(() => response);
      expect(service.confirmResetting(token)).toBeObservable(expected);
      expect(http.getPublic).toHaveBeenCalledWith(`/reset/confirm/${token}`);
    });
  });

  describe('confirmRegistration', () => {
    it('should call the confirm api to check token and return ok result', () => {
      const token = '1234';
      const response = cold('-a|', { a: 'success' });
      const expected = cold('-b|', { b: 'success' });
      http.getPublic = jest.fn(() => response);
      expect(service.confirmRegistration(token)).toBeObservable(expected);
      expect(http.getPublic).toHaveBeenCalledWith(`/register/confirm/${token}`);
    });
  });

  describe('register', () => {
    it('should call the register api and return user registered', () => {
      const origin = window.location.origin;
      const confirmationUrl = `${origin}/#/${authConfig.path.registerConfirm}/token`;
      const register = {
        firstname: 'firstname',
        lastname: 'lastname',
        confirmationUrl
      } as Register;

      const response = cold('-a|', { a: register });
      const expected = cold('-b|', { b: register });
      http.postPublic = jest.fn(() => response);
      expect(service.register(register)).toBeObservable(expected);
      expect(http.postPublic).toHaveBeenCalledWith('/register', register);
    });

    it('should call the register api and return error if user already exist', () => {
      const origin = window.location.origin;
      const confirmationUrl = `${origin}/#/${authConfig.path.registerConfirm}/token`;
      const register = {
        firstname: '',
        confirmationUrl
      } as Register;
      const errors = {
        error: {
          errors: {
            children: {
              email: 'User exist'
            }
          }
        }
      };
      const response = cold('-#', {}, errors);
      const expected = cold('-#', {}, { error: { email: 'User exist' } });
      http.postPublic = jest.fn(() => response);
      expect(service.register(register)).toBeObservable(expected);
      expect(http.postPublic).toHaveBeenCalledWith('/register', register);
    });

    it('should call the register api and return error', () => {
      const origin = window.location.origin;
      const confirmationUrl = `${origin}/#/${authConfig.path.registerConfirm}/token`;
      const register = {
        firstname: '',
        confirmationUrl
      } as Register;
      const errors = {
        error: 'Error api'
      };
      const response = cold('-#', {}, errors);
      const expected = cold('-#', {}, errors);
      http.postPublic = jest.fn(() => response);
      expect(service.register(register)).toBeObservable(expected);
      expect(http.postPublic).toHaveBeenCalledWith('/register', register);
    });
  });

  describe('login', () => {
    it('should call the login api and return result', () => {
      const credentials = {
        login: 'testLogin',
        password: 'testPassword'
      };
      const response = cold('-a|', { a: authInfo });
      const expected = cold('-b|', { b: authInfo });
      http.postHost = jest.fn(() => response);
      expect(service.login(credentials)).toBeObservable(expected);
      expect(http.postHost).toHaveBeenCalledWith('/oauth/v2/proxy', {
        username: credentials.login,
        password: credentials.password,
        grant_type: 'password'
      });
    });
  });

  describe('reset', () => {
    it('should call reset password api and return result', () => {
      const username = 'test@test.fr';
      const origin = window.location.origin;
      const confirmationUrl = `${origin}/#/${authConfig.path.passwordResetConfirm}/token`;
      const response = cold('-a|', { a: 'ok' });
      const expected = cold('-b|', { b: 'ok' });
      http.postPublic = jest.fn(() => response);
      expect(service.reset({ username })).toBeObservable(expected);
      expect(http.postPublic).toHaveBeenCalledWith('/reset/mail', {
        username,
        confirmationUrl
      });
    });
  });

  describe('resetPassword', () => {
    it('should send new password to api and return result', () => {
      const token = 'token';

      const newPassword = {
        plainPassword: {
          first: 'Newpassword',
          second: 'Newpassword'
        }
      };

      const response = cold('-a|', { a: { result: 'ok' } });
      const expected = cold('-b|', { b: { result: 'ok' } });
      http.postPublic = jest.fn(() => response);
      expect(service.resetPassword(newPassword, token)).toBeObservable(
        expected
      );
      expect(http.postPublic).toHaveBeenCalledWith(`/reset/${token}`, {
        fos_user_resetting: newPassword
      });
    });
  });

  describe('getLoggedUser', () => {
    it('should retrieve logged user from store', () => {
      const user = {
        firstname: '',
        lastname: ''
      } as User;

      const expected = cold('(-a|)', { a: user });
      http.get = jest.fn(() => expected);

      loggedUser.setResult(user);
      expect(service.getLoggedUser(false)).toBeObservable(expected);
      expect(http.get).not.toHaveBeenCalled();
    });

    it('should retrieve logged user from http if reload forced', () => {
      const user = {
        firstname: '',
        lastname: ''
      } as User;

      const response = cold('-a|', { a: user });
      const expected = cold('-b|', { b: user });

      http.get = jest.fn(() => response);

      expect(service.getLoggedUser(true)).toBeObservable(expected);

      expect(http.get).toHaveBeenCalledWith('/users/me');
    });

    it('should retrieve logged user from http if store not initialised', () => {
      const user = {
        firstname: '',
        lastname: ''
      };

      const expected = cold('(-a|)', { a: user });
      const response = cold('(-b|)', { b: user });
      http.get = jest.fn(() => response);
      loggedUser.setResult(null);
      expect(service.getLoggedUser(false)).toBeObservable(expected);
      expect(http.get).toHaveBeenCalledWith('/users/me');
    });
  });
});
