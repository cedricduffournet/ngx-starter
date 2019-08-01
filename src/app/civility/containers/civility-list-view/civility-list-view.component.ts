import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Civility } from '@app/civility/models/civility';
import { CivilityFacade } from '@app/civility/state/civility.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';

@Component({
  selector: 'app-civility-list-view',
  templateUrl: './civility-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CivilityListViewComponent implements OnInit {
  civilities$: Observable<Civility[]>;
  canUpdate$: Observable<boolean>;
  canDelete$: Observable<boolean>;
  canCreate$: Observable<boolean>;

  public constructor(
    private facade: CivilityFacade,
    private authFacade: AuthFacade
  ) {}

  public ngOnInit() {
    this.civilities$ = this.facade.civilities$;
    this.canCreate$ = this.authFacade.isAuthorized(['ROLE_CIVILITY_CREATE']);
    this.canDelete$ = this.authFacade.isAuthorized(['ROLE_CIVILITY_DELETE']);
    this.canUpdate$ = this.authFacade.isAuthorized(['ROLE_CIVILITY_EDIT']);
    this.facade.loadCivilities();
  }

  onAdd() {
    this.facade.showAddCivilityModal();
  }

  onUpdate(id: number) {
    this.facade.selectCivility(id);
    this.facade.showUpdateCivilityModal();
  }

  onDelete(id: number): void {
    this.facade.selectCivility(id);
    this.facade.showDeleteCivilityModal();
  }
}
