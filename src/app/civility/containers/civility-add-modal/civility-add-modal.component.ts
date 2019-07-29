import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromCivilities from '@app/civility/state/reducers';
import { CivilityAddModalActions } from '@app/civility/state/actions';
import { Civility } from '@app/civility/models/civility';

@Component({
  selector: 'app-civility-add-modal',
  templateUrl: 'civility-add-modal.component.html'
})
export class CivilityAddModalComponent implements OnInit, OnDestroy {
  added$: Observable<boolean>;
  adding$: Observable<boolean>;
  subscription: Subscription;
  selectedCivility$: Observable<Civility>;

  constructor(
    public bsModalRef: BsModalRef,
    private store: Store<fromCivilities.State>
  ) {}

  ngOnInit() {
    this.added$ = this.store.pipe(
      select(fromCivilities.getCivilityCollectionAdded)
    );
    this.adding$ = this.store.pipe(
      select(fromCivilities.getCivilityCollectionAdding)
    );

    this.subscription = this.added$
      .pipe(filter(added => added))
      .subscribe(() => this.bsModalRef.hide());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  onAdd(civility: Civility) {
    this.store.dispatch(CivilityAddModalActions.addCivility({ civility }));
  }
}
