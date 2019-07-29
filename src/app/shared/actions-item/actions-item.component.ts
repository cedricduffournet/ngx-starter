import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-actions-item',
  templateUrl: './actions-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsItemComponent {
  @Input() withEdit = false;
  @Input() withDelete = false;

  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  onDelete() {
    this.delete.emit();
  }

  onEdit() {
    this.edit.emit();
  }
}
