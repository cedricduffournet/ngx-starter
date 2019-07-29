import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Credentials } from '@app/authentication/models/auth';
import { LoginViewActions } from '@app/authentication/state/actions';
import * as fromAuth from '@app/authentication/state/reducers';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginViewComponent implements OnInit, OnDestroy {
  processing$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(
    private store: Store<fromAuth.State>,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    // force close all modal, for example user can be updating an entity in modal
    // and be redirect to login page, in this case modal is not hiden
    this.closeAllModals();
    this.processing$ = this.store.pipe(select(fromAuth.getLoginViewProcessing));
    this.error$ = this.store.pipe(select(fromAuth.getLoginViewError));
  }

  onLogin(credentials: Credentials) {
    this.store.dispatch(LoginViewActions.login({ credentials }));
  }

  ngOnDestroy() {
    this.store.dispatch(LoginViewActions.clear());
  }

  private closeAllModals() {
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
  }
}
