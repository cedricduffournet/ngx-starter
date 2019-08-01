import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import {
  CivilityListViewActions,
  CivilityAddModalActions,
  CivilityDeleteModalActions,
  CivilityUpdateModalActions
} from '@app/civility/state/actions';
import * as fromCivilities from '@app/civility/state/reducers';
import { Civility } from '@app/civility/models/civility';

@Injectable()
export class CivilityFacade {
  civilities$ = this.store.pipe(select(fromCivilities.getCivilities));
  added$ = this.store.pipe(select(fromCivilities.getCivilityCollectionAdded));
  adding$ = this.store.pipe(select(fromCivilities.getCivilityCollectionAdding));
  updated$ = this.store.pipe(select(fromCivilities.getCivilityEntitiesUpdated));
  updating$ = this.store.pipe(
    select(fromCivilities.getCivilityEntitiesUpdating)
  );
  deleted$ = this.store.pipe(
    select(fromCivilities.getCivilityCollectionDeleted)
  );
  deleting$ = this.store.pipe(
    select(fromCivilities.getCivilityCollectionDeleting)
  );
  selected$ = this.store.pipe(select(fromCivilities.getSelectedCivility));

  constructor(private store: Store<fromCivilities.State>) {}

  loadCivilities() {
    this.store.dispatch(CivilityListViewActions.loadCivilities());
  }

  showAddCivilityModal() {
    this.store.dispatch(CivilityListViewActions.showAddCivilityModal());
  }

  selectCivility(id: number) {
    this.store.dispatch(CivilityListViewActions.selectCivility({ id }));
  }

  showUpdateCivilityModal() {
    this.store.dispatch(CivilityListViewActions.showUpdateCivilityModal());
  }

  showDeleteCivilityModal() {
    this.store.dispatch(CivilityListViewActions.showDeleteCivilityModal());
  }

  addCivility(civility: Civility) {
    this.store.dispatch(CivilityAddModalActions.addCivility({ civility }));
  }

  deleteCivility(civility: Civility) {
    this.store.dispatch(
      CivilityDeleteModalActions.deleteCivility({ civility })
    );
  }

  updateCivility(data: { id: number; civility: Civility }) {
    this.store.dispatch(CivilityUpdateModalActions.updateCivility({ data }));
  }
}
