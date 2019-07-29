import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { ActionsItemsModule } from '@app/shared/actions-item';
import { ButtonModule } from '@app/shared/button';
import {
  CivilityItemsComponent,
  CivilityItemComponent
} from '@app/civility/components';
import { Civility } from '@app/civility/models/civility';

describe('CivilityItems', () => {
  let fixture: ComponentFixture<CivilityItemsComponent>;
  let component: CivilityItemsComponent;
  const civilities: Civility[] = [
    {
      id: 1,
      code: 'testcode1',
      name: 'testname1'
    },
    {
      id: 2,
      code: 'testcode2',
      name: 'testname2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ActionsItemsModule, ButtonModule],
      declarations: [CivilityItemsComponent, CivilityItemComponent]
    });
    fixture = TestBed.createComponent(CivilityItemsComponent);
    component = fixture.componentInstance;
    component.civilities = civilities;
    component.authorization = {
      create: false,
      update: false,
      delete: false
    };
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(civilities[0].id);
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('should emit edit event', () => {
    spyOn(component.update, 'emit');
    component.onUpdate(civilities[1].id);
    expect(component.update.emit).toHaveBeenCalledWith(2);
  });

  it('should emit add event', () => {
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalledWith('add');
  });

  it('should display add button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not display add button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: false
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
