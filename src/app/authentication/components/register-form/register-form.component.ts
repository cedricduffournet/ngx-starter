import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserFormService } from '@app/user/services/user-form.service';
import { Register } from '@app/authentication/models/auth';
import { Civility } from '@app/civility/models/civility';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserFormService]
})
export class RegisterFormComponent {
  @Input() civilities: Civility[];
  @Input() errorUserExist = false;
  @Input() processing = false;
  @Output() register = new EventEmitter<Register>();

  submitted = false;

  constructor(private userFormService: UserFormService) {}

  get registerForm(): FormGroup {
    return this.userFormService.form;
  }

  get showErrorPasswordEqual() {
    return this.userFormService.showErrorPasswordEqual && this.submitted;
  }

  get civility() {
    return this.registerForm.get('civility');
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.register.emit(this.registerForm.value);
    }
  }
}
