import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptor, AuthService } from '@app/authentication/services';
import { AuthToken } from '@app/authentication/models/auth';
import { AuthActions } from '@app/authentication/state/actions';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromAuth from '@app/authentication/state/reducers';

describe('TokenInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let service: AuthService;
  let interceptor: TokenInterceptor;
  let store: MockStore<fromAuth.State>;

  function createInterceptor() {
    interceptor = new TokenInterceptor(service, store);
    return interceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore(),
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: createInterceptor,
          multi: true
        }
      ]
    });
    http = TestBed.get(HttpClient);
    service = TestBed.get(AuthService);
    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);

    service.setToken({
      access_token: 'access_token',
      expires_in: 10000,
      token_type: 'password',
      refresh_token: 'refresh_token'
    });
    spyOn(store, 'dispatch');
  });

  it('should add Authorization header with Bearer', async(() => {
    http.get('/test').subscribe(response => {
      expect(response).toBe(1);
    });
    const req = httpMock.expectOne(
      r =>
        r.headers.has('Authorization') &&
        r.headers.get('Authorization') === 'Bearer access_token'
    );
    req.flush(1);
    httpMock.verify();
  }));

  it('handle401Error should be called on http 401 error', async(() => {
    spyOn(
      TokenInterceptor.prototype as any,
      'handle401Error'
    ).and.callThrough();

    http.get('/test').subscribe(
      () => {
        fail('shoud error');
      },
      () => {
        expect(
          ((TokenInterceptor.prototype as any) as any).handle401Error
        ).toHaveBeenCalled();
      }
    );

    httpMock.expectOne({ url: '/test' }).flush(null, {
      status: 401,
      statusText: 'error'
    });

    httpMock.expectOne({ url: 'http://127.0.0.1:81/oauth/v2/proxy' }).flush(1);
    httpMock.expectOne({ url: '/test' });

    httpMock.verify();
  }));

  it('should throw error if http error code is not 401', async(() => {
    http.get('/test').subscribe(
      () => {
        fail('shoud error');
      },
      error => {
        expect(error.status).toBe(404);
      }
    );

    httpMock.expectOne({ url: '/test' }).flush(null, {
      status: 404,
      statusText: 'error'
    });
    httpMock.verify();
  }));

  it('should call refresh token and add new token in header', async(() => {
    interceptor.isRefreshingToken = false;
    const newAuthInfo: AuthToken = {
      access_token: 'newAccess',
      expires_in: 10000,
      token_type: 'newType',
      refresh_token: 'refresh'
    };

    service.refreshToken = jest.fn(() => of(newAuthInfo));

    http.get('/test').subscribe(res => {
      expect(res).toBe(1);
    });

    httpMock.expectOne({ url: '/test' }).flush(null, {
      status: 401,
      statusText: 'error'
    });

    const req = httpMock.expectOne(
      r =>
        r.headers.has('Authorization') &&
        r.headers.get('Authorization') === 'Bearer newAccess'
    );

    req.flush(1);
    httpMock.verify();
  }));

  it('should dispatch logout invalid_grant error after refresh', async(() => {
    interceptor.isRefreshingToken = false;
    http.get('/test').subscribe(
      () => {
        fail('shoud error');
      },
      err => {
        expect(err.error.error).toBe('invalid_grant');
      }
    );

    service.refreshToken = jest.fn(() =>
      throwError({
        error: {
          error: 'invalid_grant'
        }
      })
    );

    httpMock.expectOne({ url: '/test' }).flush(null, {
      status: 401,
      statusText: 'error'
    });

    httpMock.verify();

    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
  }));

  it('should dispatch logout if unauthorized_client after refresh', async(() => {
    interceptor.isRefreshingToken = false;
    http.get('/test').subscribe(
      () => {
        fail('shoud error');
      },
      err => {
        expect(err.error.error).toBe('unauthorized_client');
      }
    );

    service.refreshToken = jest.fn(() =>
      throwError({
        error: {
          error: 'unauthorized_client'
        }
      })
    );

    httpMock.expectOne({ url: '/test' }).flush(null, {
      status: 401,
      statusText: 'error'
    });

    httpMock.verify();

    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
  }));

  it('should not dispatch logout if error is not unauthorized_client or invalid_grant after refresh', async(() => {
    interceptor.isRefreshingToken = false;
    http.get('/test').subscribe(
      () => {
        fail('shoud error');
      },
      err => {
        expect(err).toStrictEqual({});
      }
    );

    service.refreshToken = jest.fn(() => throwError({}));

    httpMock.expectOne({ url: '/test' }).flush(null, {
      status: 401,
      statusText: 'error'
    });

    httpMock.verify();

    expect(store.dispatch).not.toHaveBeenCalledWith(AuthActions.logout());
  }));

  it('should call refresh token in header when tokenSubject received token', async(() => {
    http.get('/test').subscribe(() => {});
    interceptor.isRefreshingToken = true;
    httpMock.expectOne({ url: '/test' }).flush(null, {
      status: 401,
      statusText: 'error'
    });

    interceptor.tokenSubject.next('newAccessFromSubject');

    const req = httpMock.expectOne(r => {
      return (
        r.headers.has('Authorization') &&
        r.headers.get('Authorization') === 'Bearer newAccessFromSubject'
      );
    });
    req.flush(null);
    httpMock.verify();
  }));
});
