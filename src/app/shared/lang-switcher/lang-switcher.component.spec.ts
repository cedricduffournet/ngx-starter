import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { LangSwitcherComponent } from '@app/shared/lang-switcher/lang-switcher.component';

describe('LangSwitcherComponent', () => {
  let fixture: ComponentFixture<LangSwitcherComponent>;
  let component: LangSwitcherComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [LangSwitcherComponent]
    });
    fixture = TestBed.createComponent(LangSwitcherComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be created with en selected', () => {
    component.translate.currentLang = 'en';

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should be created with en selected', () => {
    component.translate.currentLang = 'en';

    fixture.detectChanges();

    const buttonEn = fixture.nativeElement.querySelector('.en.btn-info');
    expect(buttonEn).toBeTruthy();
  });

  it('should change lang on onSwitch', async(() => {
    fixture.detectChanges();
    component.onSwitch('fr');
    component.current$.subscribe(value => {
      expect(value).toBe('fr');
    });

    fixture.detectChanges();
    const buttonFr = fixture.nativeElement.querySelector('.fr.btn-info');
    expect(buttonFr).toBeTruthy();
  }));
});
