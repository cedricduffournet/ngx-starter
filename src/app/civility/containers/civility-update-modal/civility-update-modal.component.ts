import { Component, OnInit, OnDestroy } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Civility } from '@app/civility/models/civility';
import { CivilityFacade } from '@app/civility/state/civility.facade';

@Component({
  selector: 'app-civility-update-modal',
  templateUrl: 'civility-update-modal.component.html'
})
export class CivilityUpdateModalComponent implements OnInit, OnDestroy {
  updated$: Observable<boolean>;
  updating$: Observable<boolean>;
  subscription: Subscription;
  selectedCivility$: Observable<Civility>;

  constructor(public bsModalRef: BsModalRef, public facade: CivilityFacade) {}

  ngOnInit() {
    this.selectedCivility$ = this.facade.selected$;
    this.updated$ = this.facade.updated$;
    this.updating$ = this.facade.updating$;

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
    this.facade.updateCivility(data);
  }
}
