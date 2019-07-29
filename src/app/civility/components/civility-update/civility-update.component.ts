import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Output,
  OnDestroy,
  Input
} from '@angular/core';

import { Civility } from '@app/civility/models/civility';

@Component({
  selector: 'app-civility-update',
  templateUrl: './civility-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CivilityUpdateComponent {
  @Input() civility: Civility;
  @Input() updating = false;
  @Output() update = new EventEmitter<{
    id: number;
    civility: Civility;
  }>();
  @Output() cancel = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit('cancel');
  }

  onSave(civility: Civility) {
    const id = this.civility.id;
    this.update.emit({
      id,
      civility
    });
  }
}
