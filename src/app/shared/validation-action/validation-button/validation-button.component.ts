import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-validation-button',
  templateUrl: './validation-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationButtonComponent {
  @Input() labelConfirm = '';
  @Input() labelCancel = '';
  @Input() typeConfirm = 'submit';
  @Input() classConfirm = 'primary';
  @Input() classCancel = 'light';
  @Input() formGroupClass = '';
  @Input() confirmDisabled = false;
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  onConfirm() {
    this.confirm.emit({});
  }

  onCancel() {
    this.cancel.emit({});
  }
}
