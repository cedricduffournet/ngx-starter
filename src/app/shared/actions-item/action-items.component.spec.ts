import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActionsItemComponent } from '@app/shared/actions-item/actions-item.component';

import { IconsModule } from '@app/shared/icons';

describe('ActionsItemComponent', () => {
  let fixture: ComponentFixture<ActionsItemComponent>;
  let component: ActionsItemComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconsModule],
      declarations: [ActionsItemComponent]
    });

    fixture = TestBed.createComponent(ActionsItemComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should diplay delete button', () => {
    component.withDelete = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit delete event on click delete button', () => {
    spyOn(component.delete, 'emit');
    component.withDelete = true;

    fixture.detectChanges();

    component.onDelete();
    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('should diplay edit button', () => {
    component.withEdit = true;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit delete event on click emit button', () => {
    spyOn(component.edit, 'emit');
    component.withEdit = true;

    fixture.detectChanges();

    component.onEdit();
    expect(component.edit.emit).toHaveBeenCalled();
  });
});
