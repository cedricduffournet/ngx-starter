import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as fromAuth from '@app/authentication/state/reducers';
import { AuthActions } from '@app/authentication/state/actions';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutModalComponent {
  constructor(
    public bsModalRef: BsModalRef,
    private store: Store<fromAuth.State>
  ) {}

  onConfirm() {
    this.store.dispatch(AuthActions.logout());
    this.closeModal();
  }

  onCancel() {
    this.closeModal();
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
