import { TestBed, ComponentFixture } from '@angular/core/testing';

import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';

import { ModalWrapperModule } from '@app/shared/modal';
import { ValidationActionModule } from '@app/shared/validation-action';
import { CivilityDeleteComponent } from '@app/civility/components';
import { CivilityDeleteModalComponent } from '@app/civility/containers';
import { Civility } from '@app/civility/models/civility';
import { CivilityFacade } from '@app/civility/state/civility.facade';

describe('DeleteCivilityModalComponent', () => {
  let fixture: ComponentFixture<CivilityDeleteModalComponent>;
  let component: CivilityDeleteModalComponent;
  let facade: CivilityFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CivilityDeleteComponent, CivilityDeleteModalComponent],
      imports: [
        TranslateModule.forRoot(),
        ModalWrapperModule,
        ValidationActionModule
      ],
      providers: [
        provideMockStore(),
        BsModalRef,
        {
          provide: CivilityFacade,
          useValue: {
            deleted$: of(false),
            deleteCivility: jest.fn()
          }
        }
      ]
    });

    facade = TestBed.get(CivilityFacade);
    fixture = TestBed.createComponent(CivilityDeleteModalComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should call deleteCivility event on submit', () => {
    spyOn(facade, 'deleteCivility');
    const civility = {
      code: 'code',
      name: 'name'
    } as Civility;
    fixture.detectChanges();
    component.onDelete(civility);
    expect(facade.deleteCivility).toHaveBeenCalledWith(civility);
  });

  it('should close if civility deleted', () => {
    spyOn(component.bsModalRef, 'hide');
    facade.deleted$ = of(true);
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
