import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { RegisterFormComponent } from '@app/authentication/components';

describe('RegisterForm', () => {
  let fixture: ComponentFixture<RegisterFormComponent>;
  let component: RegisterFormComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), FormModule],
      declarations: [RegisterFormComponent]
    });
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should not emit event if civility is empty', () => {
    const register = {
      civility: null,
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'test@test.com',
      plainPassword: {
        first: 'password1',
        second: 'password1'
      }
    };

    component.registerForm.setValue(register);

    spyOn(component.register, 'emit');
    component.onSubmit();

    expect(component.register.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if firstname is empty', () => {
    const register = {
      civility: 1,
      firstname: '',
      lastname: 'lastname',
      email: 'test@test.com',
      plainPassword: {
        first: 'password1',
        second: 'password1'
      }
    };

    component.registerForm.setValue(register);

    spyOn(component.register, 'emit');
    component.onSubmit();

    expect(component.register.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if lastname is empty', () => {
    const register = {
      civility: 1,
      firstname: 'firstname',
      lastname: '',
      email: 'test@test.com',
      plainPassword: {
        first: 'password1',
        second: 'password1'
      }
    };

    component.registerForm.setValue(register);

    spyOn(component.register, 'emit');
    component.onSubmit();

    expect(component.register.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if email is empty', () => {
    const register = {
      civility: 1,
      firstname: 'firstname',
      lastname: 'lastname',
      email: '',
      plainPassword: {
        first: 'password1',
        second: 'password1'
      }
    };

    component.registerForm.setValue(register);

    spyOn(component.register, 'emit');
    component.onSubmit();

    expect(component.register.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if email is invalid', () => {
    const register = {
      civility: 1,
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'test@test',
      plainPassword: {
        first: 'password1',
        second: 'password1'
      }
    };

    component.registerForm.setValue(register);

    spyOn(component.register, 'emit');
    component.onSubmit();

    expect(component.register.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if password is empty', () => {
    const register = {
      civility: 1,
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'test@test.fr',
      plainPassword: {
        first: '',
        second: ''
      }
    };

    component.registerForm.setValue(register);

    spyOn(component.register, 'emit');
    component.onSubmit();

    expect(component.register.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if password does not match requirement', () => {
    const register = {
      civility: 1,
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'test@test.fr',
      plainPassword: {
        first: 'aaa12',
        second: 'aaa12'
      }
    };

    component.registerForm.setValue(register);

    spyOn(component.register, 'emit');
    component.onSubmit();

    expect(component.register.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if password and password confirmation are different', () => {
    const register = {
      civility: 1,
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'test@test.fr',
      plainPassword: {
        first: 'aaaA12',
        second: 'aaaB12'
      }
    };

    component.registerForm.setValue(register);
    fixture.detectChanges();
    spyOn(component.register, 'emit');
    component.onSubmit();
  });

  it('should emit register event if the form is valid when submitted', () => {
    const register = {
      civility: 1,
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'test@test.fr',
      plainPassword: {
        first: 'password123',
        second: 'password123'
      }
    };

    component.registerForm.setValue(register);

    spyOn(component.register, 'emit');
    component.onSubmit();

    expect(component.register.emit).toHaveBeenCalled();
  });

  it('should disable submit button form if processing', () => {
    component.processing = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should display user exist message if provided', () => {
    component.errorUserExist = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
