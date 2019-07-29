import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Civility } from '@app/civility/models/civility';

@Component({
  selector: 'app-civility-form',
  templateUrl: './civility-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CivilityFormComponent implements OnInit {
  @Input() civility = {} as Civility;
  @Input() processing = false;
  @Output() save = new EventEmitter<Civility>();
  @Output() cancel = new EventEmitter();

  civilityForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.civilityForm = this.formBuilder.group({
      code: [
        this.civility.code,
        [Validators.required, Validators.maxLength(10)]
      ],
      name: [this.civility.name, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.civilityForm.valid) {
      this.save.emit(this.civilityForm.value);
    }
  }

  onCancel() {
    this.cancel.emit('cancel');
  }
}
