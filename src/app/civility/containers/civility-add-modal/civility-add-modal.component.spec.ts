import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { ModalWrapperModule } from '@app/shared/modal';

import { CivilityAddModalComponent } from '@app/civility/containers';
import {
  CivilityAddComponent,
  CivilityFormComponent
} from '@app/civility/components';
import { Civility } from '@app/civility/models/civility';
import { CivilityFacade } from '@app/civility/state/civility.facade';

describe('CivilityAddModalComponent', () => {
  let fixture: ComponentFixture<CivilityAddModalComponent>;
  let component: CivilityAddModalComponent;
  let facade: CivilityFacade;
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
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: CivilityFacade,
          useValue: {
            added$: of(false),
            addCivility: jest.fn()
          }
        }
      ]
    });

    facade = TestBed.get(CivilityFacade);

    fixture = TestBed.createComponent(CivilityAddModalComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call addCivility event on submit', () => {
    spyOn(facade, 'addCivility');
    const civility = {
      code: 'code',
      name: 'name'
    } as Civility;
    fixture.detectChanges();
    component.onAdd(civility);
    expect(facade.addCivility).toHaveBeenCalledWith(civility);
  });

  it('should close if civility added', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.added$ = of(true);
    fixture.detectChanges();
    expect(component.bsModalRef.hide).toHaveBeenCalled();
  });

  it('should close modal on cancel', () => {
    fixture.detectChanges();
    spyOn(component.bsModalRef, 'hide');
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
