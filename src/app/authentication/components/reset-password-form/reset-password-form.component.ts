import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors
} from '@angular/forms';

import { ResetPassword } from '@app/authentication/models/auth';
import { areEqual, validatePassword } from '@app/shared/validators';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordFormComponent {
  @Input() processing = false;
  @Output() resetPassword = new EventEmitter<ResetPassword>();

  submitted = false;

  resetPasswordForm = this.formBuilder.group({
    plainPassword: this.formBuilder.group(
      {
        first: [
          '',
          Validators.compose([Validators.required, validatePassword])
        ],
        second: [
          '',
          Validators.compose([Validators.required, validatePassword])
        ]
      },
      { validator: areEqual }
    )
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      this.resetPassword.emit(this.resetPasswordForm.value);
    }
  }

  get fgPassword() {
    return this.resetPasswordForm.get('plainPassword') as FormGroup;
  }

  get showErrorPasswordEqual() {
    return (
      this.fgPassword.invalid &&
      this.fgPassword.errors &&
      (this.fgPassword.errors as ValidationErrors).notEqual &&
      this.submitted
    );
  }
}
