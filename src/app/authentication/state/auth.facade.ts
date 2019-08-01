import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '@app/authentication/state/reducers';

@Injectable()
export class AuthFacade {
  loggedUser$ = this.store.pipe(select(fromAuth.getLoggedUser));

  constructor(private store: Store<fromAuth.State>) {}

  isAuthorized(roles: string[]): Observable<boolean> {
    return this.store.pipe(select(fromAuth.getAuthorized, { roles }));
  }
}
