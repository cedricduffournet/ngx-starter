import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormModule } from '@app/shared/form';
import { LangSwitcherModule } from '@app/shared/lang-switcher';
import { LogoModule } from '@app/shared/logo';
import { LoginViewComponent } from '@app/authentication/containers';
import {
  AuthLayoutComponent,
  LoginFormComponent
} from '@app/authentication/components';
import * as fromAuth from '@app/authentication/state/reducers';

import { LoginViewActions } from '@app/authentication/state/actions';

describe('LoginView', () => {
  let fixture: ComponentFixture<LoginViewComponent>;
  let component: LoginViewComponent;
  let store: MockStore<fromAuth.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ModalModule.forRoot(),
        LogoModule,
        LangSwitcherModule,
        FormModule
      ],
      declarations: [
        AuthLayoutComponent,
        LoginViewComponent,
        LoginFormComponent
      ],
      providers: [provideMockStore()]
    });

    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a login event on submit', () => {
    const credentials: any = {};
    const action = LoginViewActions.login({ credentials });

    component.onLogin(credentials);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
