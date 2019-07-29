import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Civility } from '@app/civility/models/civility';
import { Authorization } from '@app/core/models/authorization.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[appCivilityItem]',
  templateUrl: './civility-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CivilityItemComponent {
  @Input() civility: Civility;
  @Input() authorization: Authorization;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onUpdate(id: number) {
    this.update.emit(id);
  }
}
