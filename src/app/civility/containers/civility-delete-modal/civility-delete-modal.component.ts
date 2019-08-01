import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Civility } from '@app/civility/models/civility';
import { CivilityFacade } from '@app/civility/state/civility.facade';

@Component({
  selector: 'app-civility-delete-modal',
  templateUrl: 'civility-delete-modal.component.html'
})
export class CivilityDeleteModalComponent implements OnInit, OnDestroy {
  deleted$: Observable<boolean>;
  deleting$: Observable<boolean>;
  subscription: Subscription;
  selectedCivility$: Observable<Civility>;

  constructor(public bsModalRef: BsModalRef, public facade: CivilityFacade) {}

  ngOnInit() {
    this.selectedCivility$ = this.facade.selected$;
    this.deleted$ = this.facade.deleted$;
    this.deleting$ = this.facade.deleting$;

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
    this.facade.deleteCivility(civility);
  }
}
