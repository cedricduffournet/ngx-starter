import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as fromAuth from '@app/authentication/state/reducers';

import { AuthFacade } from '@app/authentication/state/auth.facade';
import { hot } from 'jasmine-marbles';

describe('CivilityListViewComponent', () => {
  let store: MockStore<fromAuth.State>;
  let facade: AuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthFacade,
        provideMockStore({
          selectors: [
            {
              selector: fromAuth.getLoggedUser,
              value: {
                firstname: 'firstname',
                roles: ['TEST_CREATE']
              }
            }
          ]
        })
      ]
    });

    store = TestBed.get(Store);
    facade = TestBed.get(AuthFacade);
  });

  it('should return false if user do not have role', () => {
    const expected = hot('a', { a: false });

    expect(facade.isAuthorized(['NOT_AUTORIZED'])).toBeObservable(expected);
  });

  it('should return false if user have one of role', () => {
    const expected = hot('a', { a: true });

    expect(facade.isAuthorized(['TEST_ROLE', 'TEST_CREATE'])).toBeObservable(
      expected
    );
  });
});
