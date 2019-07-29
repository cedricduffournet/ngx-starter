import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';

import {
  CivilityAddComponent,
  CivilityFormComponent
} from '@app/civility/components';
import { Civility } from '@app/civility/models/civility';

describe('CivilityAdd', () => {
  let component: CivilityAddComponent;
  let fixture: ComponentFixture<CivilityAddComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [CivilityFormComponent, CivilityAddComponent]
    });

    fixture = TestBed.createComponent(CivilityAddComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit a save event when form is submitted', () => {
    const civility = {
      name: 'CivilityTest',
      code: 'CivilityCode'
    } as Civility;
    spyOn(component.add, 'emit');
    component.onSave(civility);

    expect(component.add.emit).toHaveBeenCalledWith(civility);
  });

  it('should emit a cancel event when form canceled', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });

  it('should indicate to form civility is processing', () => {
    component.adding = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should indicate to form civility is not processing', () => {
    component.adding = false;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
