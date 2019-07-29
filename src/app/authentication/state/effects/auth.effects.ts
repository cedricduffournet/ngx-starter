import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap, tap, exhaustMap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import {
  RegisterViewActions,
  LoginViewActions,
  AuthActions,
  AuthApiActions
} from '@app/authentication/state/actions';

import { LogoutModalComponent } from '@app/authentication/containers';

import { AuthService } from '@app/authentication/services/auth.service';
import { Credentials, AuthToken } from '@app/authentication/models/auth';
import { User } from '@app/user/models/User';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';

@Injectable()
export class AuthEffects {
  public constructor(
    private actions$: Actions,
    private service: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginViewActions.login),
      map(action => action.credentials),
      exhaustMap((credentials: Credentials) =>
        this.service.login(credentials).pipe(
          map(authToken => AuthApiActions.loginSuccess({ authToken })),
          catchError(() => of(AuthApiActions.loginFailure({ error: true })))
        )
      )
    )
  );

  loadToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadToken),
      exhaustMap(() => {
        return this.service.getToken().pipe(
          map((authToken: AuthToken) =>
            AuthApiActions.loadTokenSuccess({ authToken })
          ),
          catchError(error => {
            return of(AuthApiActions.loadTokenFailure({ error }));
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loadTokenSuccess, AuthApiActions.loginSuccess),
      map(action => action.authToken),
      exhaustMap((authToken: AuthToken) => {
        return this.service
          .setToken(authToken)
          .pipe(map(() => AuthActions.loadLoggedUser()));
      })
    )
  );

  loadLoggedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadLoggedUser),
      exhaustMap(() => {
        return this.service.getLoggedUser().pipe(
          map((user: User) => AuthApiActions.loadLoggedUserSuccess({ user })),
          catchError(error => {
            return of(
              AuthApiActions.loadLoggedUserFailure({ error: error.message })
            );
          })
        );
      })
    )
  );

  loadTokenFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loadTokenFailure),
      exhaustMap(() => of(AuthActions.logout()))
    )
  );

  reloadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.reloadUser),
      exhaustMap(() =>
        this.service.getLoggedUser(true).pipe(
          map((user: User) => AuthApiActions.loadLoggedUserSuccess({ user })),
          catchError(error =>
            of(AuthApiActions.loadLoggedUserFailure({ error: error.error }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterViewActions.register),
      map(action => action.register),
      exhaustMap(register =>
        this.service.register(register).pipe(
          map((userRegistered: User) =>
            AuthApiActions.registerSuccess({ userRegistered })
          ),
          catchError(error =>
            of(AuthApiActions.registerFailure({ error: error.error }))
          )
        )
      )
    )
  );

  showLogoutModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.showLogoutModal),
        tap(() => {
          this.modalService.show(LogoutModalComponent, CRUD_MODAL_CONFIG);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout, AuthApiActions.loadLoggedUserFailure),
      mergeMap(() => {
        this.router.navigate(['/login']);
        return this.service
          .clearToken()
          .pipe(map(() => AuthApiActions.logoutSuccess()));
      })
    )
  );
}
