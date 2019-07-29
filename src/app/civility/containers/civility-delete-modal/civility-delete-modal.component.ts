import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromCivilities from '@app/civility/state/reducers';
import { CivilityDeleteModalActions } from '@app/civility/state/actions';
import { Civility } from '@app/civility/models/civility';

@Component({
  selector: 'app-civility-delete-modal',
  templateUrl: 'civility-delete-modal.component.html'
})
export class CivilityDeleteModalComponent implements OnInit, OnDestroy {
  deleted$: Observable<boolean>;
  deleting$: Observable<boolean>;
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
    this.deleted$ = this.store.pipe(
      select(fromCivilities.getCivilityCollectionDeleted)
    );
    this.deleting$ = this.store.pipe(
      select(fromCivilities.getCivilityCollectionDeleting)
    );

    this.subscription = this.deleted$
      .pipe(filter(deleted => deleted))
      .subscribe(() => this.bsModalRef.hide());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

  onDelete(civility: Civility) {
    this.store.dispatch(
      CivilityDeleteModalActions.deleteCivility({ civility })
    );
  }
}
