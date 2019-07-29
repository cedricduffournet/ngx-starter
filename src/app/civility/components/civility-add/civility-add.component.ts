import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  Output,
  Input
} from '@angular/core';

import { Civility } from '@app/civility/models/civility';

@Component({
  selector: 'app-civility-add',
  templateUrl: './civility-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CivilityAddComponent {
  @Input() adding = false;
  @Output() add = new EventEmitter<Civility>();
  @Output() cancel = new EventEmitter<string>();

  onCancel() {
    this.cancel.emit('cancel');
  }

  onSave(civility: Civility) {
    this.add.emit(civility);
  }
}
