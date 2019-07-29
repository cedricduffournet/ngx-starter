import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Civility } from '@app/civility/models/civility';
import { Authorization } from '@app/core/models/authorization.model';

@Component({
  selector: 'app-civility-items',
  templateUrl: './civility-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CivilityItemsComponent {
  @Input() civilities: Civility[];
  @Input() authorization: Authorization;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();
  @Output() add = new EventEmitter<string>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onUpdate(id: number) {
    this.update.emit(id);
  }

  onAdd() {
    this.add.emit('add');
  }

  trackById(index: number, item: Civility) {
    return item.id;
  }
}
