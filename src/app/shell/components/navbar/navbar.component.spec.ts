import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateModule } from '@ngx-translate/core';

import { ShellModule } from '@app/shell';
import { NavbarComponent } from '@app/shell/components';
import { User } from '@app/user/models/User';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  const user = {
    firstname: 'firsname',
    lastname: 'testlastname'
  } as User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ShellModule, RouterTestingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    component.loggedUser = user;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit logout event when click on logout link', () => {
    spyOn(component.logout, 'emit');
    component.loggedUser = user;
    fixture.detectChanges();
    const dropDown = fixture.debugElement.query(By.css('app-dropdown-navbar'));
    dropDown.triggerEventHandler('logout', 'logout');
    expect(component.logout.emit).toHaveBeenCalledWith('logout');
  });

  it('should emit toggleMenu event when click on toggle button', () => {
    spyOn(component.toggleMenu, 'emit');
    component.loggedUser = user;
    fixture.detectChanges();
    const toggleButton = fixture.nativeElement.querySelector(
      'button.toggle-button'
    );
    toggleButton.click();
    expect(component.toggleMenu.emit).toHaveBeenCalled();
  });

  it('aside should have opene class if input opened is true', () => {
    component.loggedUser = user;
    component.opened = true;
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('aside.opened');
    expect(elem).toBeTruthy();
  });

  it('it should display page title', () => {
    component.loggedUser = user;
    component.pageTitle = 'This is my page title';
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('span.page-title');
    expect(elem.textContent).toBe('This is my page title');
  });

  it('it should display previous link button', () => {
    component.loggedUser = user;
    component.previousLink = ['/previous'];
    fixture.detectChanges();
    const previous = fixture.nativeElement.querySelector(
      'button.previous-link'
    );
    expect(previous).toBeTruthy();
  });
});
