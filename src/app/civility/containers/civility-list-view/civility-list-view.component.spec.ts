import { TestBed, ComponentFixture } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import {
  CivilityItemComponent,
  CivilityItemsComponent
} from '@app/civility/components';
import { CivilityListViewComponent } from '@app/civility/containers';
import { SharedModule } from '@app/shared/shared.module';
import { CivilityFacade } from '@app/civility/state/civility.facade';
import { AuthFacade } from '@app/authentication/state/auth.facade';

describe('CivilityListViewComponent', () => {
  let fixture: ComponentFixture<CivilityListViewComponent>;
  let component: CivilityListViewComponent;
  let facade: CivilityFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CivilityListViewComponent,
        CivilityItemsComponent,
        CivilityItemComponent
      ],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        provideMockStore(),
        CivilityFacade,
        AuthFacade
      ]
    });

    fixture = TestBed.createComponent(CivilityListViewComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(CivilityFacade);
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should loadCivility on init', () => {
    spyOn(facade, 'loadCivilities');
    fixture.detectChanges();
    expect(facade.loadCivilities).toHaveBeenCalledWith();
  });

  it('should call showAddCivilityModal on add event', () => {
    spyOn(facade, 'showAddCivilityModal');
    component.onAdd();
    expect(facade.showAddCivilityModal).toHaveBeenCalledWith();
  });

  it('should call showUpdateCivilityModal on update event', () => {
    spyOn(facade, 'showUpdateCivilityModal');
    component.onUpdate(1);
    expect(facade.showUpdateCivilityModal).toHaveBeenCalledWith();
  });

  it('should call selectCivility on update event', () => {
    spyOn(facade, 'selectCivility');
    component.onUpdate(1);
    expect(facade.selectCivility).toHaveBeenCalledWith(1);
  });

  it('should call showDeleteCivilityModal on update event', () => {
    spyOn(facade, 'showDeleteCivilityModal');
    component.onDelete(1);
    expect(facade.showDeleteCivilityModal).toHaveBeenCalledWith();

  });

  it('should call selectCivility on delete event', () => {
    spyOn(facade, 'selectCivility');
    component.onDelete(1);
    expect(facade.selectCivility).toHaveBeenCalledWith(1);
  });
});
