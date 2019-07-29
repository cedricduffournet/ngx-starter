import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';

import { LangSwitcherModule } from '@app/shared/lang-switcher';
import { LogoModule } from '@app/shared/logo';
import { FormModule } from '@app/shared/form';
import { SendResetPasswordViewComponent } from '@app/authentication/containers';
import {
  AuthLayoutComponent,
  SendResetPasswordFormComponent
} from '@app/authentication/components';
import { AuthService } from '@app/authentication/services';

describe('SendResetPasswordView', () => {
  let fixture: ComponentFixture<SendResetPasswordViewComponent>;
  let component: SendResetPasswordViewComponent;
  let authService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthLayoutComponent,
        SendResetPasswordViewComponent,
        SendResetPasswordFormComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        LangSwitcherModule,
        LogoModule,
        FormModule
      ],
      providers: [{ provide: AuthService, useValue: { reset: jest.fn() } }]
    });
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(SendResetPasswordViewComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display success message on submit reset form', async(() => {
    const username = 'test@test.fr';
    const expectedResponse = 'mailSended';
    authService.reset = jest.fn(() => of(expectedResponse));
    component.onReset({ username });
    component.status$.subscribe(status =>
      expect(status).toBe(expectedResponse)
    );
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  }));

  it('should display error not found message on submit reset form', async(() => {
    const username = 'test@test.fr';
    const expectedResponse = {
      status: 404,
      response: 'errorTokenNotFound'
    };
    authService.reset = jest.fn(() => throwError(expectedResponse));
    component.onReset({ username });
    component.status$.subscribe(status =>
      expect(status).toBe(expectedResponse.response)
    );
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  }));

  it('should display error already sent message on submit reset form', async(() => {
    const username = 'test@test.fr';
    const expectedResponse = {
      status: 400,
      response: 'mailAlreadySended'
    };
    authService.reset = jest.fn(() => throwError(expectedResponse));
    component.onReset({ username });
    component.status$.subscribe(status =>
      expect(status).toBe(expectedResponse.response)
    );
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  }));

  it('should display initial view when error code is unknown', async(() => {
    const username = 'test@test.fr';
    const expectedResponse = {
      status: 500
    };
    authService.reset = jest.fn(() => throwError(expectedResponse));
    component.onReset({ username });
    component.status$.subscribe(status => expect(status).toBe('init'));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  }));
});
