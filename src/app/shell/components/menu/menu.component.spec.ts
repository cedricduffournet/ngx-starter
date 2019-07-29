import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { IconsModule } from '@app/shared/icons';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from '@app/shell/components';

@Component({
  template: ''
})
class StubComponent {}

describe('MenuComponent', () => {
  let fixture: ComponentFixture<MenuComponent>;
  let component: MenuComponent;
  let router: Router;
  const menu = [
    {
      name: 'HOME',
      faIcon: ['fa', 'home'],
      cssClass: 'pt-3',
      route: ['dashboard'],
      roles: ['ROLE_USER']
    },
    {
      name: 'PARAMETERS',
      faIcon: ['fa', 'sliders-h'],
      cssClass: 'pt-3 mt-3 border-top border-dark',
      route: ['parameters'],
      roles: [
        'ROLE_COMPANY_VIEW_ALL',
        'ROLE_USER_VIEW',
        'ROLE_GROUP_VIEW',
        'ROLE_CIVILITY_VIEW'
      ]
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard',
            component: StubComponent
          },
          {
            path: 'parameters',
            component: StubComponent
          }
        ]),
        IconsModule
      ],
      declarations: [MenuComponent, StubComponent]
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    component.menu = menu;

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should emit selectItem when click item in menu', async(() => {
    component.menu = menu;
    spyOn(component.selectItem, 'emit');

    if (fixture.ngZone) {
      // check link bellow for more info about this :
      // https://github.com/angular/angular/issues/25837
      fixture.ngZone.run(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const menus = fixture.nativeElement.querySelectorAll('a');
          const menuItem = menus[0];
          menuItem.click();
          expect(component.selectItem.emit).toHaveBeenCalledWith(menu[0]);
        });
      });
    }
  }));
});
