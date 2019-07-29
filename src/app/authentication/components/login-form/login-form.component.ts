import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Credentials } from '@app/authentication/models/auth';
import { validateEmail } from '@app/shared/validators/email.validator';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  @Input() processing = false;
  @Input() error = false;
  @Output() login = new EventEmitter<Credentials>();

  submitted = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // not using native email validator as it use html5 validation
    // (check https://github.com/angular/angular/pull/24743)
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.required, validateEmail])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.login.emit(this.loginForm.value);
    }
  }
}
