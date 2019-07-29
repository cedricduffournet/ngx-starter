import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpSentEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, take, switchMap, finalize, filter } from 'rxjs/operators';

import { AuthService } from '@app/authentication/services/auth.service';
import * as fromAuth from '@app/authentication/state/reducers';
import { AuthActions, AuthApiActions } from '@app/authentication/state/actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromAuth.State>
  ) {}

  isRefreshingToken = false;
  tokenSubject = new BehaviorSubject<string | null>(null);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
    | any
  > {
    const token = this.authService.storedToken;
    const accessToken = token ? token.access_token : throwError('No token');
    return next.handle(this.addTokenToRequest(request, accessToken)).pipe(
      catchError(err => {
        const errorResponse = err as HttpErrorResponse;
        switch (errorResponse.status) {
          case 401:
            return this.handle401Error(request, next);
          default:
            return throwError(err);
        }
      })
    );
  }

  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string | null
  ): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((authToken: any) => {
          this.tokenSubject.next(authToken.access_token);
          this.store.dispatch(AuthApiActions.loadTokenSuccess({ authToken }));
          return next.handle(
            this.addTokenToRequest(request, authToken.access_token)
          );
        }),
        catchError(err => {
          if (
            err.error &&
            (err.error.error === 'invalid_grant' ||
              err.error.error === 'unauthorized_client')
          ) {
            this.store.dispatch(AuthActions.logout());
          }
          return throwError(err);
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addTokenToRequest(request, token));
        })
      );
    }
  }
}
