import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors
} from '@angular/forms';

import {
  validateEmail,
  areEqual,
  validatePassword
} from '@app/shared/validators';

@Injectable()
export class UserFormService {
  public form: FormGroup;

  public constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, validateEmail])],
      civility: [null, Validators.required],
      plainPassword: this.fb.group(
        {
          first: [
            null,
            Validators.compose([Validators.required, validatePassword])
          ],
          second: [null]
        },
        { validators: areEqual }
      )
    });
  }

  get fgPassword() {
    return this.form.get('plainPassword') as FormGroup;
  }

  get showErrorPasswordEqual() {
    return (
      this.fgPassword.invalid &&
      this.fgPassword.errors &&
      (this.fgPassword.errors as ValidationErrors).notEqual
    );
  }
}
