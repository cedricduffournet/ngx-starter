import { TestBed, ComponentFixture } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { ValidationActionModule } from '@app/shared/validation-action';

import { CivilityDeleteComponent } from '@app/civility/components';
import { Civility } from '@app/civility/models/civility';

describe('CivilityDelete', () => {
  let fixture: ComponentFixture<CivilityDeleteComponent>;
  let component: CivilityDeleteComponent;
  const civility: Civility = {
    id: 1,
    code: 'testcode1',
    name: 'testname1'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ValidationActionModule],
      declarations: [CivilityDeleteComponent]
    });

    fixture = TestBed.createComponent(CivilityDeleteComponent);
    component = fixture.componentInstance;
    component.civility = civility;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(civility);
    expect(component.delete.emit).toHaveBeenCalledWith(civility);
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should pass deleting to component', () => {
    component.deleting = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
