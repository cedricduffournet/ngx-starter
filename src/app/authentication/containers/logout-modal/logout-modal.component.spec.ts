import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';
import { LogoutModalComponent } from '@app/authentication/containers';
import * as fromAuth from '@app/authentication/state/reducers';
import { AuthActions } from '@app/authentication/state/actions';

describe('LogoutConfirm', () => {
  let fixture: ComponentFixture<LogoutModalComponent>;
  let component: LogoutModalComponent;
  let store: MockStore<fromAuth.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutModalComponent],
      imports: [
        TranslateModule.forRoot(),
        ModalWrapperModule,
        ValidationActionModule
      ],
      providers: [provideMockStore(), BsModalRef]
    });

    fixture = TestBed.createComponent(LogoutModalComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call closeModal on cancel', () => {
    spyOn(component, 'closeModal');
    component.onCancel();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should dispatch AuthActions.logout on confirm', () => {
    const action = AuthActions.logout();
    component.onConfirm();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call closeModal on confirm', () => {
    spyOn(component, 'closeModal');
    component.onConfirm();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should hide modal when closeModal is called', () => {
    spyOn(component.bsModalRef, 'hide');
    component.closeModal();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });
});
