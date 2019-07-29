import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpProgressActions } from '@app/core/state/actions';
import * as fromRoot from '@app/core/state/reducers';

@Injectable()
export class HttpProgressInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromRoot.State>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(HttpProgressActions.begin({ url: request.url }));
    return next.handle(request).pipe(
      finalize(() => {
        this.store.dispatch(HttpProgressActions.complete({ url: request.url }));
      })
    );
  }
}
