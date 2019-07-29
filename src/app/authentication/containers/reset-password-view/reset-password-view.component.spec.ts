import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';

import { ResetPasswordViewComponent } from '@app/authentication/containers';
import {
  AuthLayoutComponent,
  ResetPasswordFormComponent
} from '@app/authentication/components';
import { LangSwitcherModule } from '@app/shared/lang-switcher';
import { LogoModule } from '@app/shared/logo';
import { AuthService } from '@app/authentication/services';
import { FormModule } from '@app/shared/form';

describe('ResetPasswordView', () => {
  let fixture: ComponentFixture<ResetPasswordViewComponent>;
  let component: ResetPasswordViewComponent;
  let authService: any;
  let activatedRoute: ActivationEnd;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthLayoutComponent,
        ResetPasswordViewComponent,
        ResetPasswordFormComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        LangSwitcherModule,
        LogoModule,
        FormModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { token: 123 } } }
        },
        {
          provide: AuthService,
          useValue: { confirmResetting: jest.fn(), resetPassword: jest.fn() }
        }
      ]
    });

    fixture = TestBed.createComponent(ResetPasswordViewComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    activatedRoute = TestBed.get(ActivatedRoute);
  });

  it('should be created with form', async(() => {
    authService.confirmResetting = jest.fn(() => of(Object));
    fixture.detectChanges();

    expect(component.token).toBe(activatedRoute.snapshot.params.token);
    component.status$.subscribe(status =>
      expect(status).toBe('successConfirmReset')
    );
    expect(fixture).toMatchSnapshot();
  }));

  it('should display success message on reset submit form', async(() => {
    const plainPassword = {
      first: 'Pasword1234',
      second: 'Pasword1234'
    };
    const expectedResponse = 'successPaswordChanged';
    authService.confirmResetting = jest.fn(() => of(Object));
    authService.resetPassword = jest.fn(() => of(true));
    fixture.detectChanges();
    component.onResetPassword({ plainPassword });
    component.status$.subscribe(status =>
      expect(status).toBe(expectedResponse)
    );
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  }));

  it('should be created with error message', async(() => {
    authService.confirmResetting = jest.fn(() => throwError(Object));
    fixture.detectChanges();
    component.status$.subscribe(status =>
      expect(status).toBe('errorTokenNotFound')
    );
    expect(fixture).toMatchSnapshot();
  }));
});
