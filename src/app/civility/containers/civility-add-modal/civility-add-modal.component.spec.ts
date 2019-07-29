import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import { CivilityAddModalComponent } from '@app/civility/containers';
import { CivilityAddModalActions } from '@app/civility/state/actions';
import {
  CivilityAddComponent,
  CivilityFormComponent
} from '@app/civility/components';
import { Civility } from '@app/civility/models/civility';
import * as fromCivilities from '@app/civility/state/reducers';

describe('CivilityAddModalComponent', () => {
  let fixture: ComponentFixture<CivilityAddModalComponent>;
  let component: CivilityAddModalComponent;
  let store: MockStore<fromCivilities.State>;
  let added: MemoizedSelector<fromCivilities.State, boolean>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CivilityAddComponent,
        CivilityAddModalComponent,
        CivilityFormComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule,
        ReactiveFormsModule,
        ModalWrapperModule
      ],
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(CivilityAddModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    added = store.overrideSelector(
      fromCivilities.getCivilityCollectionAdded,
      false
    );
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a addCivility event on submit', () => {
    const civility = {
      code: 'code',
      name: 'name'
    } as Civility;
    const action = CivilityAddModalActions.addCivility({ civility });
    fixture.detectChanges();
    component.onAdd(civility);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after civility added', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    added.setResult(true);
    // need this to trigger state change (see : https://github.com/ngrx/platform/issues/2000)
    store.setState({} as any);
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
