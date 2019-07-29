import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { SendResetPasswordFormComponent } from '@app/authentication/components';

describe('SendResetPasswordForm', () => {
  let fixture: ComponentFixture<SendResetPasswordFormComponent>;
  let component: SendResetPasswordFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), FormModule],
      declarations: [SendResetPasswordFormComponent]
    });
    fixture = TestBed.createComponent(SendResetPasswordFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should not emit event if username is invalid', () => {
    const username = {
      username: 'test.com'
    };

    component.resettingForm.setValue(username);

    spyOn(component.resetPassword, 'emit');

    component.onReset();

    expect(component.resetPassword.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if username is empty', () => {
    const username = {
      username: ''
    };

    component.resettingForm.setValue(username);

    spyOn(component.resetPassword, 'emit');

    component.onReset();

    expect(component.resetPassword.emit).not.toHaveBeenCalled();
  });

  it('should emit an event if the form is valid when submitted', () => {
    const username = {
      username: 'test@test.fr'
    };

    fixture.detectChanges();
    component.resettingForm.setValue(username);

    spyOn(component.resetPassword, 'emit');
    component.onReset();

    expect(component.resetPassword.emit).toHaveBeenCalledWith(username);
  });

  it('should disable submit button form if processing', () => {
    component.processing = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
