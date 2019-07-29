import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { AuthEffects } from '@app/authentication/state/effects';
import { AuthService } from '@app/authentication/services';
import { User } from '@app/user/models/User';
import {
  LoginViewActions,
  AuthActions,
  AuthApiActions,
  RegisterViewActions
} from '@app/authentication/state/actions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Register } from '@app/authentication/models/auth';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';
import { LogoutModalComponent } from '@app/authentication/containers';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Observable<any>;
  let router: Router;
  let service: any;
  let modal: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: {
            getToken: jest.fn(),
            login: jest.fn(),
            setToken: jest.fn(),
            getLoggedUser: jest.fn(),
            clearToken: jest.fn(),
            register: jest.fn()
          }
        },
        {
          provide: Router,
          useValue: { navigate: jest.fn() }
        },
        {
          provide: TranslateService,
          useValue: { instant: jest.fn() }
        },
        {
          provide: BsModalService,
          useValue: { show: jest.fn() }
        },
        provideMockStore()
      ]
    });
    effects = TestBed.get(AuthEffects);
    service = TestBed.get(AuthService);
    actions$ = TestBed.get(Actions);
    router = TestBed.get(Router);
    modal = TestBed.get(BsModalService);
  });

  describe('loadToken$', () => {
    it('should return a loadTokenSuccess with the token on success', () => {
      const authToken = {
        access_token: 'access',
        expires_in: 10000,
        token_type: 'type',
        refresh_token: 'refresh'
      };
      const action = AuthActions.loadToken();
      const success = AuthApiActions.loadTokenSuccess({ authToken });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: authToken });
      const expected = cold('--b', { b: success });
      service.getToken = jest.fn(() => response);
      expect(effects.loadToken$).toBeObservable(expected);
    });

    it('should return a loadTokenFail on error', () => {
      const action = AuthActions.loadToken();
      const fail = AuthApiActions.loadTokenFailure({
        error: 'No local storage'
      });
      const error = 'No local storage';

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: fail });
      service.getToken = jest.fn(() => response);
      expect(effects.loadToken$).toBeObservable(expected);
    });

    it('Should return a logout after load token failed', () => {
      const action = AuthApiActions.loadTokenFailure({
        error: 'No local storage'
      });
      const completion = AuthActions.logout();

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', { a: 'No local storage' });
      const expected = cold('-b', { b: completion });

      service.getToken = jest.fn(() => response);
      expect(effects.loadTokenFailed$).toBeObservable(expected);
    });
  });

  describe('login$', () => {
    it('should return a loginSuccess with the token on success', () => {
      const credentials = {
        login: 'testLogin@test.fr',
        password: 'testPassword'
      };

      const authToken = {
        access_token: 'access',
        expires_in: 10000,
        token_type: 'type',
        refresh_token: 'refresh'
      };

      const action = LoginViewActions.login({ credentials });
      const success = AuthApiActions.loginSuccess({ authToken });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: authToken });
      const expected = cold('--b', { b: success });
      service.login = jest.fn(() => response);
      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a loginFail when credential invalid', () => {
      const credentials = {
        login: 'testLogin',
        password: 'testPassword'
      };
      const error = { error: true };
      const action = LoginViewActions.login({ credentials });
      const fail = AuthApiActions.loginFailure(error);

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: fail });
      service.login = jest.fn(() => response);
      expect(effects.login$).toBeObservable(expected);
    });

    it('should dispatch a RouterNavigation action to / route', (done: any) => {
      const authToken = {
        access_token: 'access',
        expires_in: 10000,
        token_type: 'type',
        refresh_token: 'refresh'
      };
      const action = AuthApiActions.loginSuccess({ authToken });

      actions$ = of(action);

      effects.loginSuccess$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        done();
      });
    });
  });

  describe('logUser$', () => {
    it('should return a loadLogUser after logging success', () => {
      const authToken = {
        access_token: 'access',
        expires_in: 10000,
        token_type: 'type',
        refresh_token: 'refresh'
      };

      const action = AuthApiActions.loginSuccess({ authToken });
      const completion = AuthActions.loadLoggedUser();

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: authToken });
      const expected = cold('--b', { b: completion });
      service.setToken = jest.fn(() => response);
      expect(effects.logUser$).toBeObservable(expected);
    });

    it('should return a loadLogUser after token load success', () => {
      const authToken = {
        access_token: 'access',
        expires_in: 10000,
        token_type: 'type',
        refresh_token: 'refresh'
      };

      const action = AuthApiActions.loadTokenSuccess({ authToken });
      const completion = AuthActions.loadLoggedUser();

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: authToken });
      const expected = cold('--b', { b: completion });
      service.setToken = jest.fn(() => response);
      expect(effects.logUser$).toBeObservable(expected);
    });
  });

  describe('reloadUser$ ', () => {
    it('should return a loadLoggedUserSuccess when ask user reload', () => {
      const user = {} as User;
      user.firstname = 'firstname';
      user.lastname = 'lastname';

      const action = AuthActions.reloadUser();
      const success = AuthApiActions.loadLoggedUserSuccess({ user });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: user });
      const expected = cold('--b', { b: success });
      service.getLoggedUser = jest.fn(() => response);
      expect(effects.reloadUser$).toBeObservable(expected);
    });

    it('should return a loadLoggedUserFail when error during user reload', () => {
      const error = {
        error: {
          error: 'error'
        }
      };
      const action = AuthActions.reloadUser();
      const fail = AuthApiActions.loadLoggedUserFailure(error);

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: fail });
      service.getLoggedUser = jest.fn(() => response);
      expect(effects.reloadUser$).toBeObservable(expected);
    });
  });

  describe('register$ ', () => {
    const register = {
      email: 'register@test.com'
    } as Register;

    it('should return a registerSuccess when register', () => {
      const action = RegisterViewActions.register({ register });
      const success = AuthApiActions.registerSuccess({
        userRegistered: {
          email: 'register@test.com'
        } as User
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', {
        a: {
          email: 'register@test.com'
        }
      });
      const expected = cold('--b', { b: success });
      service.register = jest.fn(() => response);
      expect(effects.register$).toBeObservable(expected);
    });

    it('should return a registerFailure when error during register', () => {
      const error = {
        error: {
          error: 'error'
        }
      };
      const action = RegisterViewActions.register({ register });
      const fail = AuthApiActions.registerFailure(error);

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: fail });
      service.register = jest.fn(() => response);
      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('loadLoggedUser$', () => {
    it('should return a loadLoggedUserSuccess whith user when loading user', () => {
      const user = {} as User;
      user.firstname = 'firstname';
      user.lastname = 'lastname';

      const action = AuthActions.loadLoggedUser();
      const success = AuthApiActions.loadLoggedUserSuccess({ user });

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: user });
      const expected = cold('--b', { b: success });
      service.getLoggedUser = jest.fn(() => response);
      expect(effects.loadLoggedUser$).toBeObservable(expected);
    });

    it('should return a loadLoggedUserFail when error during loading user', () => {
      const error = {
        message: 'error'
      };
      const action = AuthActions.loadLoggedUser();
      const fail = AuthApiActions.loadLoggedUserFailure({
        error: error.message
      });

      actions$ = hot('-a-', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: fail });
      service.getLoggedUser = jest.fn(() => response);
      expect(effects.loadLoggedUser$).toBeObservable(expected);
    });
  });

  describe('showLogoutModal$', () => {
    it('should open a modal with LogoutModalComponent component', (done: any) => {
      const action = AuthActions.showLogoutModal();

      actions$ = of(action);

      effects.showLogoutModal$.subscribe(() => {
        expect(modal.show).toHaveBeenCalledWith(
          LogoutModalComponent,
          CRUD_MODAL_CONFIG
        );
        done();
      });
    });
  });

  describe('logout$', () => {
    it('should call logoutSuccess when user logout', () => {
      const action = AuthActions.logout();
      const success = AuthApiActions.logoutSuccess();

      actions$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: true });
      const expected = cold('--b', { b: success });
      service.clearToken = jest.fn(() => response);
      expect(effects.logout$).toBeObservable(expected);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
