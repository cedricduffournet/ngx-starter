import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ResetPasswordFormComponent } from '@app/authentication/components';

describe('ResetPasswordForm', () => {
  let fixture: ComponentFixture<ResetPasswordFormComponent>;
  let component: ResetPasswordFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), FormModule],
      declarations: [ResetPasswordFormComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should not emit event if missing password', () => {
    const plainPassword = {
      first: '',
      second: 'test'
    };

    component.resetPasswordForm.setValue({ plainPassword });

    spyOn(component.resetPassword, 'emit');
    component.onSubmit();

    expect(component.resetPassword.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if passwords are different', () => {
    const plainPassword = {
      first: '12345678',
      second: '87654321'
    };

    component.resetPasswordForm.setValue({ plainPassword });
    fixture.detectChanges();
    spyOn(component.resetPassword, 'emit');
    component.onSubmit();
    expect(component.resetPassword.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if passwords not conformed', () => {
    const plainPassword = {
      first: '1234',
      second: '1234'
    };

    component.resetPasswordForm.setValue({ plainPassword });

    spyOn(component.resetPassword, 'emit');
    component.onSubmit();
    expect(component.resetPassword.emit).not.toHaveBeenCalled();
  });

  it('should emit an event if the form is valid when submitted', () => {
    const plainPassword = {
      first: 'Test1234',
      second: 'Test1234'
    };

    component.resetPasswordForm.setValue({ plainPassword });

    spyOn(component.resetPassword, 'emit');
    component.onSubmit();

    expect(component.resetPassword.emit).toHaveBeenCalledWith({
      plainPassword
    });
  });
});
