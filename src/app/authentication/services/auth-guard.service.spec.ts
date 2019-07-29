import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';

import { cold, hot } from 'jasmine-marbles';
import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthGuard } from '@app/authentication/services';
import * as fromAuth from '@app/authentication/state/reducers';
import { User } from '@app/user/models/User';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore<fromAuth.AuthState>;
  let route: ActivatedRouteSnapshot;
  let isLogged: MemoizedSelector<fromAuth.State, boolean>;
  let loggedUser: MemoizedSelector<fromAuth.State, User | null>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: ActivatedRouteSnapshot,
          useValue: {
            data: []
          }
        },
        provideMockStore()
      ]
    });

    store = TestBed.get(Store);
    guard = TestBed.get(AuthGuard);
    route = TestBed.get(ActivatedRouteSnapshot);

    isLogged = store.overrideSelector(fromAuth.getIsLogged, false);
    loggedUser = store.overrideSelector(fromAuth.getLoggedUser, null);
  });

  it('should return false if user is not logged in', () => {
    const expected = hot('-');

    expect(guard.canActivate(route)).toBeObservable(expected);
  });

  it('should return false if user is connected but has not sufficient role', () => {
    const user = {
      firstname: 'firsnametest',
      lastname: 'lastnametest',
      roles: ['']
    } as User;
    loggedUser.setResult(user);
    isLogged.setResult(true);
    route.data = { roles: ['ROLE_GUARD'] };
    const expected = cold('(-a|)', { a: false });

    expect(guard.canActivate(route)).toBeObservable(expected);
  });

  it('should return true if user is connected with sufficient role', () => {
    const user = {
      firstname: 'firsnametest',
      lastname: 'lastnametest',
      roles: ['ROLE_GUARD']
    } as User;
    loggedUser.setResult(user);
    isLogged.setResult(true);
    route.data = { roles: ['ROLE_GUARD'] };
    const expected = cold('(-a|)', { a: true });

    expect(guard.canActivate(route)).toBeObservable(expected);
  });
});
