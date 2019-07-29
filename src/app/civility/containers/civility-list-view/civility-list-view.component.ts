import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Civility } from '@app/civility/models/civility';
import { User } from '@app/user/models/User';
import { Authorization } from '@app/core/models/authorization.model';
import { CivilityListViewActions } from '@app/civility/state/actions';
import * as fromAuth from '@app/authentication/state/reducers';
import * as fromCivilities from '@app/civility/state/reducers';

@Component({
  selector: 'app-civility-list-view',
  templateUrl: './civility-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CivilityListViewComponent implements OnInit {
  civilities$: Observable<Civility[]>;
  loggedUser$: Observable<User | null>;
  authorization$: Observable<Authorization>;

  public constructor(
    private store: Store<fromCivilities.State & fromAuth.State>
  ) {}

  public ngOnInit() {
    this.civilities$ = this.store.pipe(select(fromCivilities.getCivilities));
    this.loggedUser$ = this.store.pipe(select(fromAuth.getLoggedUser));
    this.authorization$ = this.store.pipe(
      select(fromCivilities.getCivilityAuthorization)
    );
    this.store.dispatch(CivilityListViewActions.loadCivilities());
  }

  onAdd() {
    this.store.dispatch(CivilityListViewActions.showAddCivilityModal());
  }

  onUpdate(id: number) {
    this.store.dispatch(CivilityListViewActions.selectCivility({ id }));
    this.store.dispatch(CivilityListViewActions.showUpdateCivilityModal());
  }

  onDelete(id: number): void {
    this.store.dispatch(CivilityListViewActions.selectCivility({ id }));
    this.store.dispatch(CivilityListViewActions.showDeleteCivilityModal());
  }
}
