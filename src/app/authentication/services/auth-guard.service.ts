import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, take, switchMap } from 'rxjs/operators';

import { User } from '@app/user/models/User';
import { AuthActions } from '@app/authentication/state/actions';
import * as fromAuth from '@app/authentication/state/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public constructor(private store: Store<fromAuth.State>) {}

  public isUserConnected(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getIsLogged),
      filter((loaded: boolean) => loaded),
      take(1)
    );
  }

  public canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(AuthActions.loadToken());
    return this.isUserConnected().pipe(
      switchMap(() => this.getLoggeddUser()),
      switchMap((user: User) => this.isAllowed(user, next.data))
    );
  }

  public getLoggeddUser(): Observable<any> {
    return this.store.pipe(
      select(fromAuth.getLoggedUser),
      take(1)
    );
  }

  public isAllowed(user: User, data: any): Observable<boolean> {
    const rolesKey = 'roles';
    const routeRole = data[rolesKey];
    const userRole: string[] = user.roles;
    let hasRole: boolean;
    hasRole = routeRole.some((element: string) => {
      const role = userRole.some((element2: string) => {
        return element2 === element;
      });
      return role;
    });
    return of(hasRole);
  }
}
