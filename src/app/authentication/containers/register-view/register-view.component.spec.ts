import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store, MemoizedSelector } from '@ngrx/store';

import { TranslateModule } from '@ngx-translate/core';

import { RegisterViewComponent } from '@app/authentication/containers';
import * as fromAuth from '@app/authentication/state/reducers';
import {
  AuthLayoutComponent,
  RegisterFormComponent
} from '@app/authentication/components';
import { RegisterViewActions } from '@app/authentication/state/actions';
import { Register } from '@app/authentication/models/auth';
import { LangSwitcherModule } from '@app/shared/lang-switcher';
import { LogoModule } from '@app/shared/logo';
import { FormModule } from '@app/shared/form';
import { User } from '@app/user/models/User';

describe('LoginView', () => {
  let fixture: ComponentFixture<RegisterViewComponent>;
  let component: RegisterViewComponent;
  let store: MockStore<fromAuth.State>;
  let status: MemoizedSelector<fromAuth.State, 'init' | 'success' | 'error'>;
  let userRegistered: MemoizedSelector<fromAuth.State, User | null>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthLayoutComponent,
        RegisterViewComponent,
        RegisterFormComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        LangSwitcherModule,
        LogoModule,
        FormModule
      ],
      providers: [provideMockStore()]
    });

    fixture = TestBed.createComponent(RegisterViewComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    status = store.overrideSelector(fromAuth.getRegisterViewStatus, 'init');
    userRegistered = store.overrideSelector(
      fromAuth.getRegisterViewUserRegistered,
      null
    );
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch loadCivilities on init', () => {
    fixture.detectChanges();

    const action = RegisterViewActions.loadCivilities();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a register event on submit', () => {
    const register: any = {};
    const action = RegisterViewActions.register({ register });

    component.onRegister(register);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch a clear event on destroy', () => {
    const action = RegisterViewActions.clear();

    fixture.destroy();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call getEmailRegistered on sucesss registration', () => {
    spyOn(component, 'getEmailRegistered').and.callThrough();
    component.registered = { email: 'test@test.com' } as Register;
    status.setResult('success');
    fixture.detectChanges();
    expect(component.getEmailRegistered).toHaveBeenCalled();
  });
});
