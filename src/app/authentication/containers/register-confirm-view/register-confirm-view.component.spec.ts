import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { RegisterConfirmViewComponent } from '@app/authentication/containers';
import { AuthLayoutComponent } from '@app/authentication/components';
import { AuthService } from '@app/authentication/services';
import { LangSwitcherModule } from '@app/shared/lang-switcher';
import { LogoModule } from '@app/shared/logo';

describe('RegisterConfirmView', () => {
  let fixture: ComponentFixture<RegisterConfirmViewComponent>;
  let component: RegisterConfirmViewComponent;
  let authService: any;
  let activatedRoute: ActivationEnd;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthLayoutComponent, RegisterConfirmViewComponent],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        LangSwitcherModule,
        LogoModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { token: 123 } } }
        },
        {
          provide: AuthService,
          useValue: {
            confirmResetting: jest.fn(),
            confirmRegistration: jest.fn()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(RegisterConfirmViewComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    activatedRoute = TestBed.get(ActivatedRoute);
  });

  it('should be created with success message', async(() => {
    authService.confirmRegistration = jest.fn(() => of(Object));
    fixture.detectChanges();

    expect(component.token).toBe(activatedRoute.snapshot.params.token);
    component.status$.subscribe(status => expect(status).toBe('success'));
    expect(fixture).toMatchSnapshot();
  }));

  it('should be created with error message', async(() => {
    authService.confirmRegistration = jest.fn(() => throwError(Object));
    fixture.detectChanges();
    component.status$.subscribe(status => expect(status).toBe('error'));
    expect(fixture).toMatchSnapshot();
  }));
});
