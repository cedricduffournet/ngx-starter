import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthFacade } from '@app/authentication/state/auth.facade';

@Component({
  selector: 'app-list-parameters',
  templateUrl: 'list-parameters.component.html'
})
export class ListParametersComponent implements OnInit {
  canViewCivility$: Observable<boolean>;

  public constructor(private facade: AuthFacade) {}

  ngOnInit() {
    this.canViewCivility$ = this.facade.isAuthorized([
      'ROLE_CIVILITY_CREATE',
      'ROLE_CIVILITY_EDIT',
      'ROLE_CIVILITY_DELETE'
    ]);
  }
}
