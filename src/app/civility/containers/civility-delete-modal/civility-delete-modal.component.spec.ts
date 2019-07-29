import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ModalWrapperModule } from '@app/shared/modal';
import { ValidationActionModule } from '@app/shared/validation-action';
import { CivilityDeleteComponent } from '@app/civility/components';
import { CivilityDeleteModalComponent } from '@app/civility/containers';
import * as fromCivilities from '@app/civility/state/reducers';
import { CivilityDeleteModalActions } from '@app/civility/state/actions';
import { Civility } from '@app/civility/models/civility';

describe('DeleteCivilityModalComponent', () => {
  let fixture: ComponentFixture<CivilityDeleteModalComponent>;
  let component: CivilityDeleteModalComponent;
  let store: MockStore<fromCivilities.State>;
  let deleted: MemoizedSelector<fromCivilities.State, boolean>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CivilityDeleteComponent, CivilityDeleteModalComponent],
      imports: [
        TranslateModule.forRoot(),
        ModalWrapperModule,
        ValidationActionModule
      ],
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(CivilityDeleteModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    deleted = store.overrideSelector(
      fromCivilities.getCivilityCollectionDeleted,
      false
    );
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a deleteCivility event on submit', () => {
    const civility = {
      id: 1,
      code: 'code',
      name: 'name'
    } as Civility;
    const action = CivilityDeleteModalActions.deleteCivility({ civility });
    fixture.detectChanges();
    component.onDelete(civility);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should close modal after civility added', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    deleted.setResult(true);
    store.setState({} as any);
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
