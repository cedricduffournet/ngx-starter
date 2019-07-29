import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Menu } from '@app/shell/shared/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  @Input() menu: Menu[];
  @Output() selectItem = new EventEmitter<Menu>();

  onSelect(menu: Menu) {
    this.selectItem.emit(menu);
  }
}
