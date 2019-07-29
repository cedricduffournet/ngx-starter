import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { User } from '@app/user/models/User';
import { Register } from '@app/authentication/models/auth';
import { RegisterViewActions } from '@app/authentication/state/actions';
import * as fromAuth from '@app/authentication/state/reducers';
import * as fromCivilities from '@app/civility/state/reducers';
import { Civility } from '@app/civility/models/civility';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-register-view',
  templateUrl: 'register-view.component.html'
})
export class RegisterViewComponent implements OnInit, OnDestroy {
  registered: Register;
  processing$: Observable<boolean>;
  status$: Observable<'init' | 'success' | 'error'>;
  errorUserExist$: Observable<boolean>;
  userRegistered$: Observable<User | null>;
  civilities$: Observable<Civility[]>;
  username: string;
  errorMail = false;
  msgErrorMail = '';

  constructor(public store: Store<fromAuth.State & fromCivilities.State>) {}

  ngOnInit() {
    this.processing$ = this.store.pipe(
      select(fromAuth.getRegisterViewProcessing)
    );
    this.status$ = this.store.pipe(select(fromAuth.getRegisterViewStatus));
    this.errorUserExist$ = this.store.pipe(
      select(fromAuth.getRegisterViewErrorUserExist)
    );
    this.userRegistered$ = this.store.pipe(
      select(fromAuth.getRegisterViewUserRegistered)
    );
    this.civilities$ = this.store.pipe(select(fromCivilities.getCivilities));
    this.store.dispatch(RegisterViewActions.loadCivilities());
  }

  ngOnDestroy() {
    this.store.dispatch(RegisterViewActions.clear());
  }

  onRegister(register: Register) {
    this.registered = register;
    this.store.dispatch(RegisterViewActions.register({ register }));
  }

  getEmailRegistered() {
    return this.registered.email;
  }
}
