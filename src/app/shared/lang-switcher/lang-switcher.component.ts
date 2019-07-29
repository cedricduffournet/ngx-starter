import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from '@env/environment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {
  current$: BehaviorSubject<string>;
  langs = environment.lang;

  constructor(public translate: TranslateService) {}

  onSwitch(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {
    this.current$ = new BehaviorSubject<string>(this.translate.currentLang);
    this.translate.onLangChange.subscribe((evt: LangChangeEvent) =>
      this.current$.next(evt.lang)
    );
  }
}
