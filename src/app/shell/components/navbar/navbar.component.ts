import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { User } from '@app/user/models/User';
import { Menu } from '@app/shell/shared/menu.model';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() loggedUser: User;
  @Input() opened = true;
  @Input() pageTitle = '';
  @Input() previousLink: string[] | null;
  @Input() menu: Menu[];
  @Output() logout = new EventEmitter<string>();
  @Output() toggleMenu = new EventEmitter();

  onLogout(event: string) {
    this.logout.emit(event);
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
