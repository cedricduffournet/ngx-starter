import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { LoginFormComponent } from '@app/authentication/components';

describe('LoginForm', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let component: LoginFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule
      ],
      declarations: [LoginFormComponent]
    });
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should not emit event if email is invalid', () => {
    const credentials = {
      login: 'user',
      password: 'pass'
    };

    fixture.detectChanges();

    component.loginForm.setValue(credentials);

    spyOn(component.login, 'emit');
    component.onSubmit();

    expect(component.login.emit).not.toHaveBeenCalled();
  });

  it('should disable submit button form if processing', () => {
    component.processing = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit save event if the form is valid when submitted', () => {
    const credentials = {
      login: 'user@dasdas.fr',
      password: 'pass'
    };

    fixture.detectChanges();

    component.loginForm.setValue(credentials);

    spyOn(component.login, 'emit');
    component.onSubmit();

    expect(component.login.emit).toHaveBeenCalledWith(credentials);
  });

  it('should display an error message if provided', () => {
    component.error = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
