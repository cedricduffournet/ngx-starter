import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';
import { CivilityFacade } from '@app/civility/state/civility.facade';

import {
  CivilityUpdateComponent,
  CivilityFormComponent
} from '@app/civility/components';
import { CivilityUpdateModalComponent } from '@app/civility/containers';
import { Civility } from '@app/civility/models/civility';

describe('UpdateCivilityModalComponent', () => {
  let fixture: ComponentFixture<CivilityUpdateModalComponent>;
  let component: CivilityUpdateModalComponent;
  let facade: CivilityFacade;
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
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: CivilityFacade,
          useValue: {
            selected$: of({
              code: 'TestCode',
              name: 'TestName'
            }),
            updated$: of(false),
            updateCivility: jest.fn()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(CivilityUpdateModalComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(CivilityFacade);
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call updateCivility event on submit', () => {
    spyOn(facade, 'updateCivility');
    const data = {
      id: 1,
      civility: {
        code: 'code',
        name: 'name'
      } as Civility
    };
    fixture.detectChanges();
    component.onUpdate(data);
    expect(facade.updateCivility).toHaveBeenCalledWith(data);
  });

  it('should close if civility updated', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.updated$ = of(true);
    fixture.detectChanges();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    spyOn(component.bsModalRef, 'hide');
    fixture.detectChanges();
    component.onCancel();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should unsubscribe subscription when destroyed', () => {
    fixture.detectChanges();
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
