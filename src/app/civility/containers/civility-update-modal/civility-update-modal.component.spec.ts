import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import {
  CivilityUpdateComponent,
  CivilityFormComponent
} from '@app/civility/components';
import { CivilityUpdateModalComponent } from '@app/civility/containers';
import * as fromCivilities from '@app/civility/state/reducers';

import { CivilityUpdateModalActions } from '@app/civility/state/actions';
import { Civility } from '@app/civility/models/civility';

describe('UpdateCivilityModalComponent', () => {
  let fixture: ComponentFixture<CivilityUpdateModalComponent>;
  let component: CivilityUpdateModalComponent;
  let store: MockStore<fromCivilities.State>;
  let updated: MemoizedSelector<fromCivilities.State, boolean>;
  let civility: MemoizedSelector<fromCivilities.State, Civility>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CivilityUpdateComponent,
        CivilityUpdateModalComponent,
        CivilityFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ModalWrapperModule,
        ReactiveFormsModule
      ],
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(CivilityUpdateModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    updated = store.overrideSelector(
      fromCivilities.getCivilityEntitiesUpdated,
      false
    );
    civility = store.overrideSelector(fromCivilities.getSelectedCivility, {
      id: 1,
      name: 'name',
      code: 'code'
    });
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a deleteCivility event on submit', () => {
    const data = {
      id: 1,
      civility: {
        code: 'code',
        name: 'name'
      } as Civility
    };
    const action = CivilityUpdateModalActions.updateCivility({ data });
    fixture.detectChanges();
    component.onUpdate(data);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after civility added', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    updated.setResult(true);
    store.setState({} as any);
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
