import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromCivilities from '@app/civility/state/reducers';
import { CivilityUpdateModalActions } from '@app/civility/state/actions';
import { Civility } from '@app/civility/models/civility';

@Component({
  selector: 'app-civility-update-modal',
  templateUrl: 'civility-update-modal.component.html'
})
export class CivilityUpdateModalComponent implements OnInit, OnDestroy {
  updated$: Observable<boolean>;
  updating$: Observable<boolean>;
  subscription: Subscription;
  selectedCivility$: Observable<Civility>;

  constructor(
    public bsModalRef: BsModalRef,
    public store: Store<fromCivilities.State>
  ) {}

  ngOnInit() {
    this.selectedCivility$ = this.store.pipe(
      select(fromCivilities.getSelectedCivility)
    );
    this.updated$ = this.store.pipe(
      select(fromCivilities.getCivilityEntitiesUpdated)
    );
    this.updating$ = this.store.pipe(
      select(fromCivilities.getCivilityEntitiesUpdating)
    );

    this.subscription = this.updated$
      .pipe(filter(updated => updated))
      .subscribe(() => this.bsModalRef.hide());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  onUpdate(data: { id: number; civility: Civility }) {
    this.store.dispatch(CivilityUpdateModalActions.updateCivility({ data }));
  }
}
