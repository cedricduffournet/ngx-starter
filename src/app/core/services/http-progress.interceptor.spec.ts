import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpProgressActions } from '@app/core/state/actions';
import { HttpProgressInterceptor } from '@app/core/services';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromRoot from '@app/core/state/reducers';

describe('HttpProgressInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let store: MockStore<fromRoot.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpProgressInterceptor,
          multi: true
        }
      ]
    });
    http = TestBed.get(HttpClient);
    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(store, 'dispatch');
  });

  it('should dispatch a HttpProgressActions.begin when http request begin, and ttpProgressActions.complete when it ends', async(() => {
    const actionBegin = HttpProgressActions.begin({ url: '/test' });
    const actionComplete = HttpProgressActions.complete({ url: '/test' });
    http.get('/test').subscribe(response => {
      expect(response).toBe(1);
    });
    const req = httpMock.expectOne({ url: '/test' });
    expect(store.dispatch).toHaveBeenLastCalledWith(actionBegin);
    req.flush(1);
    expect(store.dispatch).toHaveBeenLastCalledWith(actionComplete);
    httpMock.verify();
  }));

  it('should dispatch a HttpProgressActions.complete on http error', async(() => {
    const actionComplete = HttpProgressActions.complete({ url: '/test' });
    http.get('/test').subscribe(
      () => {
        fail('shoud error');
      },
      () => {}
    );
    httpMock.expectOne({ url: '/test' }).flush(null, {
      status: 404,
      statusText: 'error'
    });
    expect(store.dispatch).toHaveBeenLastCalledWith(actionComplete);
    httpMock.verify();
  }));
});
