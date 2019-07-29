import {
  ChangeDetectionStrategy,
  Component,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { validateEmail } from '@app/shared/validators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-send-reset-password-form',
  templateUrl: './send-reset-password-form.component.html'
})
export class SendResetPasswordFormComponent {
  @Input() processing = false;
  @Output() resetPassword = new EventEmitter<string>();

  submitted = false;
  resettingForm = this.formBuilder.group({
    username: ['', Validators.compose([Validators.required, validateEmail])]
  });

  constructor(private formBuilder: FormBuilder) {}

  onReset() {
    this.submitted = true;
    if (this.resettingForm.valid) {
      this.resetPassword.emit(this.resettingForm.value);
    }
  }
}
