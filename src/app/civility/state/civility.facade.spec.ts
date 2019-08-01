import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as fromCivilities from '@app/civility/state/reducers';
import {
  CivilityListViewActions,
  CivilityAddModalActions,
  CivilityDeleteModalActions,
  CivilityUpdateModalActions
} from '@app/civility/state/actions';
import { CivilityFacade } from '@app/civility/state/civility.facade';
import { Civility } from '@app/civility/models/civility';

describe('CivilityListViewComponent', () => {
  let store: MockStore<fromCivilities.State>;
  let facade: CivilityFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CivilityFacade, provideMockStore()]
    });

    store = TestBed.get(Store);
    facade = TestBed.get(CivilityFacade);
    spyOn(store, 'dispatch');
  });

  it('should dispatch loadCivilities', () => {
    const action = CivilityListViewActions.loadCivilities();
    facade.loadCivilities();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showAddCivilityModal', () => {
    const action = CivilityListViewActions.showAddCivilityModal();
    facade.showAddCivilityModal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showUpdateCivilityModal', () => {
    const action = CivilityListViewActions.showUpdateCivilityModal();
    facade.showUpdateCivilityModal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectCivility', () => {
    const action = CivilityListViewActions.selectCivility({ id: 1 });
    facade.selectCivility(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showDeleteCivilityModal', () => {
    const action = CivilityListViewActions.showDeleteCivilityModal();
    facade.showDeleteCivilityModal();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectCivility', () => {
    const action = CivilityListViewActions.selectCivility({ id: 1 });
    facade.selectCivility(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch addCivility', () => {
    const civility = {
      id: 1,
      name: 'test'
    } as Civility;

    const action = CivilityAddModalActions.addCivility({ civility });
    facade.addCivility(civility);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch deleteCivility', () => {
    const civility = {
      id: 1,
      name: 'test'
    } as Civility;

    const action = CivilityDeleteModalActions.deleteCivility({ civility });
    facade.deleteCivility(civility);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch updateCivility', () => {
    const data = {
      id: 1,
      civility: {
        name: 'test'
      } as Civility
    };

    const action = CivilityUpdateModalActions.updateCivility({ data });
    facade.updateCivility(data);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
