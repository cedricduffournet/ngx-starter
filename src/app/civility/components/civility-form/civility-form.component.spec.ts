import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '@app/shared/form';
import { ValidationActionModule } from '@app/shared/validation-action';
import { CivilityFormComponent } from '@app/civility/components';
import { Civility } from '@app/civility/models/civility';

describe('CivilityForm', () => {
  let fixture: ComponentFixture<CivilityFormComponent>;
  let component: CivilityFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormModule,
        ValidationActionModule
      ],
      declarations: [CivilityFormComponent]
    });

    fixture = TestBed.createComponent(CivilityFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not emit event if name not filled', () => {
    const civility = {
      code: 'code',
      name: ''
    } as Civility;

    fixture.detectChanges();
    component.civilityForm.setValue(civility);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if code not filled', () => {
    const civility = {
      code: '',
      name: 'name'
    } as Civility;

    fixture.detectChanges();
    component.civilityForm.setValue(civility);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should not emit event if code is too long', () => {
    const civility = {
      code: 'code is more than 10 characters',
      name: 'name'
    } as Civility;

    fixture.detectChanges();
    component.civilityForm.setValue(civility);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should disable the form if processing', () => {
    component.processing = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit save event with new civility, if the form is valid, when submitted', () => {
    const civility = { code: 'code', name: 'test' };
    fixture.detectChanges();

    component.civilityForm.setValue(civility);

    spyOn(component.save, 'emit');
    component.onSubmit();

    expect(component.save.emit).toHaveBeenCalledWith(civility);
  });

  it('should emit cancel event when click cancel button', () => {
    fixture.detectChanges();

    spyOn(component.cancel, 'emit');

    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalledWith('cancel');
  });

  it('should fill form with civility value', () => {
    const civility = {
      code: 'testcode',
      name: 'testName'
    } as Civility;
    component.civility = civility;
    fixture.detectChanges();

    expect(component.civilityForm.value).toEqual(civility);
  });
});
