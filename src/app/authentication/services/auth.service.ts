import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { flatMap, map, take, catchError } from 'rxjs/operators';

import {
  AuthToken,
  Credentials,
  Register,
  ResetPassword,
  SendResetPassword
} from '@app/authentication/models/auth';
import { authConfig } from '@app/authentication/auth.config';
import * as fromAuth from '@app/authentication/state/reducers';
import { HttpService } from '@app/core/services/http.service';
import { User } from '@app/user/models/User';
import { formExceptionNormalize } from '@app/shared/utils/form-exception-normalizer';

export function storageFactory() {
  return localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken('ad-authentication', {
  factory: storageFactory
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private store: Store<fromAuth.State>,
    @Inject(LOCAL_STORAGE_TOKEN) private storage: Storage
  ) {}

  clearToken(): Observable<boolean> {
    this.storage.removeItem(authConfig.storageKey);
    return of(true);
  }

  confirmResetting(token: string): Observable<object> {
    return this.httpService.getPublic(`/reset/confirm/${token}`);
  }

  confirmRegistration(token: string): Observable<object> {
    return this.httpService.getPublic(`/register/confirm/${token}`);
  }

  getLoggedUser(forceReload?: boolean): Observable<User> {
    if (forceReload) {
      return this.getMe();
    }
    return this.store.pipe(
      select(fromAuth.getLoggedUser),
      flatMap(loggedUser => {
        if (loggedUser) {
          return of(loggedUser);
        }
        return this.getMe();
      }),
      take(1)
    );
  }

  getMe(): Observable<User> {
    return this.httpService.get<User>('/users/me');
  }

  getToken() {
    const localStorageObj = this.storedToken;

    if (localStorageObj) {
      return of(localStorageObj);
    }
    return throwError('No local storage');
  }

  get storedToken() {
    const localStorageObj = this.storage.getItem(authConfig.storageKey);

    if (localStorageObj) {
      return JSON.parse(localStorageObj);
    }

    return undefined;
  }

  login(
    credentials: Credentials,
    grantType = 'password'
  ): Observable<AuthToken> {
    return this.httpService
      .postHost('/oauth/v2/proxy', {
        username: credentials.login,
        password: credentials.password,
        grant_type: grantType
      })
      .pipe(map(res => res as AuthToken));
  }

  refreshToken(): Observable<AuthToken> {
    const authToken = this.storedToken;
    const refreshToken = authToken.refresh_token;

    return this.httpService
      .postHost('/oauth/v2/proxy', {
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
      .pipe(map(res => res as AuthToken));
  }

  register(register: Register): Observable<User> {
    const origin = window.location.origin;
    const confirmationUrl = `${origin}/#/${authConfig.path.registerConfirm}/token`;
    const post = {
      ...register,
      confirmationUrl
    };

    return this.httpService.postPublic('/register', post).pipe(
      map(user => user as User),
      catchError(errors => {
        const error = formExceptionNormalize(errors);
        if (error && error.email) {
          return throwError({ error });
        } else {
          return throwError(errors);
        }
      })
    );
  }

  reset(username: SendResetPassword): Observable<string> {
    const origin = window.location.origin;
    const confirmationUrl = `${origin}/#/${authConfig.path.passwordResetConfirm}/token`;
    const post = {
      ...username,
      confirmationUrl
    };
    return this.httpService
      .postPublic('/reset/mail', post)
      .pipe(map(res => res as string));
  }

  resetPassword(password: ResetPassword, token: string): Observable<object> {
    return this.httpService.postPublic(`/reset/${token}`, {
      fos_user_resetting: password
    });
  }

  setToken(auth: AuthToken): Observable<AuthToken> {
    this.storage.setItem(authConfig.storageKey, JSON.stringify(auth));
    return of(auth);
  }
}
