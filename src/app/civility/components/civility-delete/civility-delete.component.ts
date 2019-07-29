import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

import { Civility } from '@app/civility/models/civility';

@Component({
  selector: 'app-civility-delete',
  templateUrl: './civility-delete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CivilityDeleteComponent {
  @Input() civility: Civility;
  @Input() deleting = false;
  @Output() delete = new EventEmitter<Civility>();
  @Output() cancel = new EventEmitter<string>();

  onDelete(civility: Civility) {
    this.delete.emit(civility);
  }

  onCancel() {
    this.cancel.emit('cancel');
  }
}
