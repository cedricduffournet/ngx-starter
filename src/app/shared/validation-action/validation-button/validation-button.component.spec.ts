import { TestBed, ComponentFixture } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { ValidationButtonComponent } from '@app/shared/validation-action/validation-button';

describe('ValidationButtonComponent', () => {
  let fixture: ComponentFixture<ValidationButtonComponent>;
  let component: ValidationButtonComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ValidationButtonComponent]
    });
    fixture = TestBed.createComponent(ValidationButtonComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be created with cancel and confirm button', () => {
    component.labelCancel = 'cancel';
    component.labelConfirm = 'confirm';

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('root div shoud have class', () => {
    component.formGroupClass = 'testclass';

    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector(
      '.button-validation-action.testclass'
    );
    expect(div).toBeTruthy();
  });

  it('cancel button should have class', () => {
    component.labelCancel = 'cancel';
    component.classCancel = 'danger';

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button.btn-cancel.btn-danger'
    );
    expect(button).toBeTruthy();
  });

  it('confirm button should have class', () => {
    component.labelConfirm = 'confirm';
    component.classConfirm = 'success';

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      '.btn-confirm.btn-success'
    );
    expect(button).toBeTruthy();
  });

  it('confirm button should be type button', () => {
    component.labelConfirm = 'confirm';
    component.typeConfirm = 'button';

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.btn-confirm');
    expect(button.type).toBe('button');
  });

  it('confirm button should be disabled', () => {
    component.labelConfirm = 'confirm';
    component.confirmDisabled = true;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.btn-confirm');
    expect(button.disabled).toBeTruthy();
  });

  it('cancel button should not be displayed when confirm button is disabled', () => {
    component.labelConfirm = 'confirm';
    component.labelCancel = 'cancel';
    component.confirmDisabled = true;

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.btn-cancel');
    expect(button).toBeFalsy();
  });

  it('spinner should be displayed when confirm is disabled', () => {
    component.labelConfirm = 'confirm';
    component.confirmDisabled = true;

    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinner).toBeTruthy();
  });

  it('confirm event should be emitted when confirm button has been clicked', () => {
    spyOn(component.confirm, 'emit');
    component.labelConfirm = 'confirm';
    fixture.detectChanges();
    const confirm = fixture.nativeElement.querySelector('.btn-confirm');
    confirm.click();
    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('cancel event should be emitted when cancel button has been clicked', () => {
    spyOn(component.cancel, 'emit');
    component.labelCancel = 'confirm';
    fixture.detectChanges();
    const cancel = fixture.nativeElement.querySelector('.btn-cancel');
    cancel.click();
    expect(component.cancel.emit).toHaveBeenCalled();
  });
});
