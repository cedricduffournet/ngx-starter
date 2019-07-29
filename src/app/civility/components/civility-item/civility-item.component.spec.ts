import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { ActionsItemsModule } from '@app/shared/actions-item';
import { CivilityItemComponent } from '@app/civility/components';
import { Civility } from '@app/civility/models/civility';

describe('CivilityItem', () => {
  let fixture: ComponentFixture<CivilityItemComponent>;
  let component: CivilityItemComponent;
  const civility: Civility = {
    id: 1,
    code: 'testcode',
    name: 'testname'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ActionsItemsModule],
      declarations: [CivilityItemComponent]
    });

    fixture = TestBed.createComponent(CivilityItemComponent);
    component = fixture.componentInstance;
    component.authorization = {
      create: false,
      update: false,
      delete: false
    };
    component.civility = civility;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit remove event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(civility.id);
    expect(component.delete.emit).toHaveBeenCalledWith(civility.id);
  });

  it('should emit edit event', () => {
    spyOn(component.update, 'emit');
    component.onUpdate(civility.id);
    expect(component.update.emit).toHaveBeenCalledWith(civility.id);
  });

  it('should display edit button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display remove button', () => {
    component.authorization = {
      update: true,
      delete: true,
      create: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
