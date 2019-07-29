import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '@app/authentication/state/reducers';

@Component({
  selector: 'app-list-parameters',
  templateUrl: 'list-parameters.component.html'
})
export class ListParametersComponent implements OnInit {
  canViewCivility$: Observable<boolean>;

  public constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {
    this.canViewCivility$ = this.store.pipe(
      select(
        fromAuth.getAuthorized([
          'ROLE_CIVILITY_CREATE',
          'ROLE_CIVILITY_EDIT',
          'ROLE_CIVILITY_DELETE'
        ])
      )
    );
  }
}
