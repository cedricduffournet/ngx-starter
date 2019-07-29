import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import {
  CivilityUpdateComponent,
  CivilityFormComponent
} from '@app/civility/components';
import { Civility } from '@app/civility/models/civility';

describe('CivilityUpdate', () => {
  let fixture: ComponentFixture<CivilityUpdateComponent>;
  let component: CivilityUpdateComponent;
  const civility: Civility = {
    id: 1,
    code: 'testcode1',
    name: 'testname1'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [CivilityUpdateComponent, CivilityFormComponent]
    });

    fixture = TestBed.createComponent(CivilityUpdateComponent);
    component = fixture.componentInstance;
    component.civility = civility;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit save event', () => {
    spyOn(component.update, 'emit');
    component.onSave({ code: 'codeupdated', name: 'nameupdated' } as Civility);
    expect(component.update.emit).toHaveBeenCalledWith({
      id: civility.id,
      civility: { code: 'codeupdated', name: 'nameupdated' }
    });
  });

  it('should indicate civility is updating', () => {
    component.updating = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });
});
