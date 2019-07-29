import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { User } from '@app/user/models/User';

@Component({
  selector: 'app-dropdown-navbar',
  templateUrl: './dropdown-navbar.component.html',
  styleUrls: ['./dropdown-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownNavbarComponent {
  @Input() user: User;
  @Output() logout = new EventEmitter<string>();

  onLogout() {
    this.logout.emit('logout');
  }
}
