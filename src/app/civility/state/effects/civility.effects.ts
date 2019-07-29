import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  CivilityUpdateModalComponent,
  CivilityAddModalComponent,
  CivilityDeleteModalComponent
} from '@app/civility/containers';
import { Observable, of } from 'rxjs';

import { RegisterViewActions } from '@app/authentication/state/actions';
import {
  CivilityApiActions,
  CivilityListViewActions,
  CivilityUpdateModalActions,
  CivilityAddModalActions,
  CivilityDeleteModalActions
} from '@app/civility/state/actions';

import { ToasterActions } from '@app/core/state/actions';

import { CivilityService } from '@app/civility/services';
import { CRUD_MODAL_CONFIG } from '@app/shared/models/modal-config';

@Injectable()
export class CivilityEffects {
  public constructor(
    private actions$: Actions,
    private service: CivilityService,
    private ts: TranslateService,
    private modalService: BsModalService
  ) {}
  loadCivilities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CivilityListViewActions.loadCivilities,
        RegisterViewActions.loadCivilities
      ),
      switchMap(() => {
        return this.service.loadCivilities().pipe(
          map(civilities => {
            return CivilityApiActions.loadCivilitySuccess({ civilities });
          }),
          catchError(error =>
            of(
              CivilityApiActions.loadCivilityFailure({
                error: error.error
              })
            )
          )
        );
      })
    )
  );

  addCivilityModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CivilityListViewActions.showAddCivilityModal),
        tap(() => {
          this.modalService.show(CivilityAddModalComponent, CRUD_MODAL_CONFIG);
        })
      ),
    { dispatch: false }
  );

  addCivility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CivilityAddModalActions.addCivility),
      map(action => action.civility),
      mergeMap(civility =>
        this.service.addCivility(civility).pipe(
          map(result =>
            CivilityApiActions.addCivilitySuccess({ civility: result })
          ),
          catchError(error =>
            of(CivilityApiActions.addCivilityFailure({ error: error.error }))
          )
        )
      )
    )
  );

  updateCivilityModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CivilityListViewActions.showUpdateCivilityModal),
        tap(() => {
          this.modalService.show(
            CivilityUpdateModalComponent,
            CRUD_MODAL_CONFIG
          );
        })
      ),
    { dispatch: false }
  );

  updateCivility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CivilityUpdateModalActions.updateCivility),
      map(action => action.data),
      mergeMap(data =>
        this.service.updateCivility(data).pipe(
          map(result =>
            CivilityApiActions.updateCivilitySuccess({ civility: result })
          ),
          catchError(error =>
            of(
              CivilityApiActions.updateCivilityFailure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  deleteCivilityModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CivilityListViewActions.showDeleteCivilityModal),
        tap(() => {
          this.modalService.show(
            CivilityDeleteModalComponent,
            CRUD_MODAL_CONFIG
          );
        })
      ),
    { dispatch: false }
  );

  deleteCivility$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CivilityDeleteModalActions.deleteCivility),
      map(action => action.civility),
      mergeMap(civility =>
        this.service.deleteCivility(civility).pipe(
          map(() =>
            CivilityApiActions.deleteCivilitySuccess({
              id: civility.id
            })
          ),
          catchError(error =>
            of(
              CivilityApiActions.deleteCivilityFailure({
                error: error.error
              })
            )
          )
        )
      )
    )
  );

  /************
   * Toater
   ************/

  addSuccessCivility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CivilityApiActions.addCivilitySuccess),
      map(() => {
        return ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('CIVILITY_ADD_SUCCESS'),
            body: ''
          }
        });
      })
    )
  );

  updateSuccessCivility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CivilityApiActions.updateCivilitySuccess),
      map(() =>
        ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('CIVILITY_UPDATE_SUCCESS'),
            body: ''
          }
        })
      )
    )
  );

  deleteSuccessCivility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CivilityApiActions.deleteCivilitySuccess),
      map(() =>
        ToasterActions.pop({
          params: {
            type: 'success',
            title: this.ts.instant('CIVILITY_DELETE_SUCCESS'),
            body: ''
          }
        })
      )
    )
  );

  failCivility$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CivilityApiActions.loadCivilityFailure,
        CivilityApiActions.updateCivilityFailure,
        CivilityApiActions.addCivilityFailure,
        CivilityApiActions.deleteCivilityFailure
      ),
      map(action => action.error),
      map(error =>
        ToasterActions.pop({
          params: {
            type: 'error',
            title: error.message,
            body: ''
          }
        })
      )
    )
  );
}
