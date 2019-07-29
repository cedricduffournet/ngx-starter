import { TestBed, ComponentFixture } from '@angular/core/testing';

import { IconsModule } from '@app/shared/icons';
import { DropdownNavbarComponent } from '@app/shell/components';
import { User } from '@app/user/models/User';

describe('DropdownNavbarComponent', () => {
  let fixture: ComponentFixture<DropdownNavbarComponent>;
  let component: DropdownNavbarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IconsModule],
      declarations: [DropdownNavbarComponent]
    });
    fixture = TestBed.createComponent(DropdownNavbarComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    component.user = {
      firstname: 'firstname',
      lastname: 'lastname'
    } as User;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit logout event', () => {
    spyOn(component.logout, 'emit');
    component.user = {
      firstname: 'firstname',
      lastname: 'lastname'
    } as User;

    fixture.detectChanges();

    component.onLogout();

    expect(component.logout.emit).toHaveBeenCalledWith('logout');
  });
});
