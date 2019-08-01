import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Civility } from '@app/civility/models/civility';
import { CivilityFacade } from '@app/civility/state/civility.facade';

@Component({
  selector: 'app-civility-add-modal',
  templateUrl: 'civility-add-modal.component.html'
})
export class CivilityAddModalComponent implements OnInit, OnDestroy {
  added$: Observable<boolean>;
  adding$: Observable<boolean>;
  subscription: Subscription;

  constructor(public bsModalRef: BsModalRef, private facade: CivilityFacade) {}

  ngOnInit() {
    this.added$ = this.facade.added$;
    this.adding$ = this.facade.adding$;

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
    this.facade.addCivility(civility);
  }
}
