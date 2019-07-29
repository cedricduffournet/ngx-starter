import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import * as fromAuth from '@app/authentication/state/reducers';
import * as fromRoot from '@app/core/state/reducers';
import { AuthActions } from '@app/authentication/state/actions';
import { User } from './user/models/User';
import { Menu } from '@app/shell/shared/menu.model';
import { LayoutCoreActions } from '@app/core/state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  loggedUser$: Observable<User | null>;
  opened$: Observable<boolean>;
  previousLink$: Observable<string[] | null>;
  pageTitle$: Observable<string>;
  userMenu$: Observable<Menu[]>;

  public constructor(
    private translate: TranslateService,
    private store: Store<fromRoot.State & fromAuth.State>
  ) {
    const userLang = 'en';

    this.userMenu$ = this.store.pipe(select(fromRoot.getUserMenu));

    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');

    this.translate.use(userLang);
    this.loggedUser$ = this.store.pipe(select(fromAuth.getLoggedUser));
    this.opened$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.pageTitle$ = this.store.pipe(select(fromRoot.getPageTitle));

    this.previousLink$ = this.store.pipe(select(fromRoot.getPreviousLink));
  }

  displayLogout() {
    this.store.dispatch(AuthActions.showLogoutModal());
  }

  onToggleMenu() {
    this.store.dispatch(LayoutCoreActions.toggleMenu());
  }
}
