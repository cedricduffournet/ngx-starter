import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  CivilityItemComponent,
  CivilityItemsComponent
} from '@app/civility/components';
import { CivilityListViewComponent } from '@app/civility/containers';
import * as fromCivilities from '@app/civility/state/reducers';
import { CivilityListViewActions } from '@app/civility/state/actions';
import { SharedModule } from '@app/shared/shared.module';

describe('CivilityListViewComponent', () => {
  let fixture: ComponentFixture<CivilityListViewComponent>;
  let component: CivilityListViewComponent;
  let store: MockStore<fromCivilities.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CivilityListViewComponent,
        CivilityItemsComponent,
        CivilityItemComponent
      ],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: fromCivilities.getCivilities,
              value: []
            },
            {
              selector: fromCivilities.getCivilityAuthorization,
              value: {
                create: true,
                delete: true,
                update: true
              }
            }
          ]
        })
      ]
    });

    fixture = TestBed.createComponent(CivilityListViewComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch loadCivilities on init', () => {
    const action = CivilityListViewActions.loadCivilities();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showAddCivilityModal on add event', () => {
    const action = CivilityListViewActions.showAddCivilityModal();
    component.onAdd();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showUpdateCivilityModal on update event', () => {
    const action = CivilityListViewActions.showUpdateCivilityModal();
    component.onUpdate(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectCivility on update event', () => {
    const action = CivilityListViewActions.selectCivility({ id: 1 });
    component.onUpdate(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch showDeleteCivilityModal on update event', () => {
    const action = CivilityListViewActions.showDeleteCivilityModal();
    component.onDelete(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch selectCivility on deletee event', () => {
    const action = CivilityListViewActions.selectCivility({ id: 1 });
    component.onDelete(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
